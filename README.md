# Aphrodite-style-creator
A tool for writing style and media query more efficiently with Aphrodite

## Feature
Standalone breakpoint definition can be used to convert into the styles Aphrodite need.

## install
`npm install Aphrodite-style-creator`

## Notice
- The media name in your styles and breakpoints definition should be the same.

- The alias param's value is a abbreviation for writing the media name convinent, it use as param name in `creatStyle` function's return. So that I can write this way :  `css(mob.box)`  not  `css(mobile.box)`.

- Ensure writing param 'media' and 'alias' both in your breakpoints if you are using alias.

## Usage 


#### 1.Defined your breakpoint

```javascript
//breakpoints.js
export default {

    mobile : {media:'@media (max-width: 600px)', alias:'mob'},
    
    desktop : '@media (min-width: 601px) and (max-width: 1200px)'
    
}
```

#### 2.Design your styles

```javascript
//styles.js
export default {
  mobile: {
      box: {
          color: 'red',
      }
  },
  desktop : {
      box: {
          color: 'blue',
      }
  }
}
```

#### 3.Import in
```javascript
//App.js
import React, { Component } from 'react'
import {creatStyle, css} from 'aphrodite-style-creator'
import breakpoints from './breakpoints'
import styles from './styles'

class App extends Component{

  render() {
 
    let {mob,desktop} = creatStyle(styles, breakpoints)

    return (
      <div className={css(mob.box,desktop.box)}>
          I am a box
      </div>
    )
  }
}
```

## API
```javascript
/**
 * @description 
 * The convert function.
 * @param @required {object} the style definition
 * @param @required {object} the breakpoint definition
 * @return {object} the converted styles, the param is alias in breakpoints if you use it.
 */
 creatStyle(styles, breakpoints)
 
 /**
 * @description 
 * The css function, it's aphrodite origin function actually.
 * @param @required {object} the same as aphrodite 
 * @return {object} the converted styles by aphrodite
 */
 css(...)
```
