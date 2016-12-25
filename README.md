# Aphrodite-freestyle
A tool for writing style and media query more efficiently with Aphrodite

## Feature
- Inclue all Aphrodite's feature.

- Support nested style: 
```javascript
menu: {
    color: 'blue',
    item: {
        selected: {
           color: 'red'
       }
    }
}
```

- Standalone breakpoint definition: it can be used to convert into the styles Aphrodite need.

- Build-in global selector extension for supporting global style.

## Install
`npm install aphrodite-freestyle`

## Notice
- The name you defined for substate should not start with `:`, because it was used in pseudo-selector

- The `base` style name in your style is required.

- The media name in your styles and breakpoints definition should be the same.

## Usage 

#### 1. Defined your breakpoint

```javascript
//breakpoints.js
export default {
    mobile : '@media (max-width: 600px)',
    desktop : '@media (min-width: 601px) and (max-width: 1200px)'
}
```

#### 2. Design your styles

```javascript
//styles.js
import {creatStyle} from 'aphrodite-freestyle'
import breakpoints from './breakpoints'

let style = {
  base: {
      menu: {
        color: 'green',
        '*a': {
            color: 'orange'
        },
        item: {
            selected: {
                color: 'yellow'
            }
        }
      }
  },
  mobile: {
      menu: {
          width: '400px',
      }
  },
  desktop : {
      menu: {
          width: '800px'
      }
  }
}

export default creatStyle(styles, breakpoints)
```

#### 3. Import in
```javascript
//App.js
import React, { Component } from 'react'
import {css} from 'aphrodite-freestyle'
import styles from './styles'

class App extends Component{
   
  render() {
    return (
      <div className={css(style.menu)}>
        <div className={css(style.item, this.props.activeItem == 'home' && style.item.selected)}>
            <a href="#">Home</a>
        </div>
      </div>
    )
  }
}

App.defaultProps = {
   activeItem: 'home'
}
```
The examples folder include a navigator boilerplate.

## API
```javascript
/**
 * @description 
 * The convert function.
 * @param @required {object} styles: the style definition
 * @param @required {object} breakpoints: the breakpoint definition
 * @return {object} the converted styles, the param is alias in breakpoints if you use it.
 */
 creatStyle(styles, breakpoints)
 
 /**
 * @description 
 * Aphrodite origin function, but with some extensions.
 * @param @required {object} the same as aphrodite 
 * @return {object} the converted styles by aphrodite
 */
 css(...)
```

## Changelog
### 0.0.4
- Pithily writting: Remove the alia, support nested style, add key `_style` in it.

### 0.0.3
- Created a global selector extension to support global style

### 0.0.2
- Support the substate nested in style
- change name `aphrodite-breakpoint` to `aphrodite-freestyle`

### 0.0.1
First version, support add media query prefix.
