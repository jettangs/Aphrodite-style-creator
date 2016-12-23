
import _ from 'lodash'
import { StyleSheet } from 'aphrodite/no-important'

const globalSelectorHandler = (selector, baseSelector, generateSubtreeStyles) => {
    if (selector[0] !== "*") {
        return null;
    }
    return generateSubtreeStyles(`${baseSelector} ${selector.slice(1)} `);
};

const globalExtension = {selectorHandler: globalSelectorHandler};

const {StyleSheet: newStyle, css: newCss} = StyleSheet.extend([globalExtension])

export let css = newCss

const processStyle = styleSheet => {
    let styles = _.cloneDeep(styleSheet)
    let style = newStyle.create(styles)
    for(let s in style) {
        let _defs = style[s]['_definition']
        for(let i in _defs) {
            if(typeof _defs[i] == 'object' && i.indexOf('@') == 0) {
                let _def = _defs[i]
                for(var k in _def) {
                    if(typeof _def[k] == 'object' && k.indexOf(':') < 0 && i.indexOf('*') < 0) {
                        let obj = {} 
                        obj[s+k] = {}
                        obj[s+k][i] = _def[k]
                        obj = newStyle.create(obj)
                        style[s][k] = obj[s+k]
                    }
                }
            }else if(typeof _defs[i] == 'object' && i.indexOf(':') < 0 && i.indexOf('*') < 0) {
                let obj = {}
                obj[s+i] = _defs[i]
                obj = newStyle.create(obj)
                style[s][i] = obj[s+i]
            }
        }
    }
    return style
}

const setMediaPrefix = (style, media) => {
    for(let s in style) {
        let obj = {}
        obj[media] = style[s]
        style[s] = obj
    }
    return style
}

export const creatStyle = (stylesheets, breakpoints) => {
    let styles = _.cloneDeep(stylesheets)
    let obj = {}
    for(let i in styles) {
        if(i == 'def') {
            obj[i] = processStyle(styles[i])
        }
        let style = styles[i]
        for(let p in breakpoints) {
            if(p == 'def') {
               console.error("The def param could not be use in breakpoints.--Aphrodite-style-creator")
            }
            let breakpoint = breakpoints[p]
            if(i == p) {
                if(breakpoint.media && breakpoint.alias) {
                    obj[breakpoint.alias] =  processStyle(setMediaPrefix(style,breakpoint.media))
                }else if(typeof breakpoint == "string"){
                    obj[i] =  processStyle(setMediaPrefix(style,breakpoint))
                }else {
                    console.error("please using param 'media' and 'alias' both in media [" + p + "]. --Aphrodite-style-creator")
                }
            }
        }
    }
    if(!obj['def']) {
        console.error("the default style not found. --Aphrodite-style-creator")
        return null
    }
    return obj
}