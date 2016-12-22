export { css } from 'aphrodite/no-important'

import { StyleSheet } from 'aphrodite/no-important'

const setMediaPrefix = (style,media) => {
    let obj = {}
    for(let s in style) {
        let oj = {}
        oj[media] = style[s]
        style[s] = oj
    }
    return style
}

export const creatStyle = (styles, breakpoints) => {
    let obj = {}
    for(let i in styles) {
        if(i == 'def') {
            obj[i] = StyleSheet.create(styles[i])
        }
        let style = styles[i]
        for(let p in breakpoints) {
            if(p == 'def') {
               console.error("The def param could not be use in breakpoints. --Aphrodite-breakpoint")
            }
            let breakpoint = breakpoints[p]
            if(i == p) {
                if(breakpoint.media && breakpoint.alias) {
                    obj[breakpoint.alias] =  StyleSheet.create(setMediaPrefix(style,breakpoint.media))
                }else if(typeof breakpoint == "string"){
                    obj[i] =  StyleSheet.create(setMediaPrefix(style,breakpoint))
                }else {
                    console.error("please using param 'media' and 'alias' both in media [" + p + "]. --Aphrodite-breakpoint")
                }
            }
        }
    }

    if(!obj['def']) {
        console.error("the default style not found. --Aphrodite-breakpoint")
        return null
    }

    return obj
}