export { css } from 'aphrodite/no-important'

import _ from 'lodash'
import { StyleSheet } from 'aphrodite/no-important'
let t = 0
const processStyle = styleSheet => {
    t++
    
    let styles = _.cloneDeep(styleSheet)
    
    // style = {body: 'object', box: 'object'}
    let style = StyleSheet.create(styles)
    for(let s in style) {
        //style[s] = {float:"left" height:"60px" lineHeight:"60px" textAlign:"center" width:"120px"}
        let _def = style[s]['_definition']
        for(let i in _def) {
            
            if(typeof _def[i] == 'object' && i.indexOf('@') == 0) {
                
                _def = _def[i]
                
                for(var k in _def) {
                    if(typeof _def[k] == 'object' && k.indexOf(':') < 0) {
                        let obj = {} //[_def[i]]
                        obj[s+k] = {}
                        t==2 && console.log(i)
                        obj[s+k][i] = _def[k]
                        delete _def[k]
                        obj = StyleSheet.create(obj)
                        style[s][k] = obj[s+k]
                    }
                }
            }else if(typeof _def[i] == 'object' && i.indexOf(':') < 0) {
                k==2 && console.log(_def)
                let obj = {}
                obj[s+i] = _def[i]
                delete _def[i]
                obj = StyleSheet.create(obj)
                style[s][i] = obj[s+i]
            }
        }
    }
    //console.log(style)
    return style
}

const setMediaPrefix = (style, media) => {
    //style: {body: Object}
    for(let s in style) {
        let obj = {}
        obj[media] = style[s]
        style[s] = obj
    }
    return style
}

export const creatStyle = (styles, breakpoints) => {
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