# Aphrodite-style-creator
A tool for writing style and media query more efficiently with Aphrodite

## Feature
Standalone breakpoint definition can be used to convert into the styles Aphrodite need.

## install
npm install Aphrodite-style-creator

## Usage 
1. Defined your breakpoint
```
//breakpoints.js
export default {

    mobile : '@media (max-width: 600px)',
    
    desktop : {media:'@media (min-width: 601px) and (max-width: 1200px)', alias:'des'},
    
}
```

2. Design your styles
```
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
  },
}
```

3. Import in
```
//App.js
import React, { Component } from 'react'
import {creatStyle, css} from 'aphrodite-style-creator'
import breakpoints from './breakpoints'
import styles from './styles'

class App extends Component{

  render() {
 
    let {mobile,desktop} = creatStyle(styles, breakpoints)

    return (
      <div className={css(mobile.box,desktop.box)}>
          I am a box
      </div>
    )
  }
}
```
