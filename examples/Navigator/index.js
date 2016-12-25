import React, { Component } from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {css} from '../../global/aphrodite-freestyle'

import {switchLanguage} from '../../actions/common'
import language from '../../assets/jsons/language.json'
import breakpoint from '../../global/breakpoints'
import style from './style'

class Navigator extends Component{

  state = {isShowmobileMenu: false}

  handlelanBtnClick() {
    this.props.switchLanguage(this.props.language == 'en' ? 'cn' : 'en')
  }

  handleMenuBtnClick() {
    this.setState({isShowmobileMenu: this.state.isShowmobileMenu? false : true})
  }

  componentDidMount() {
    var result = window.matchMedia("(max-width: 600px)");    
    result.addListener(e=>e.matches && this.setState({isShowmobileMenu:false}));
  }

  render() {
    let props = this.props
  //  let {base,mobile,desktop} = creatStyle(style, breakpoint)
    let menuLabel = language[props.language].navigator.menu
    let baseaultMenu = language.en.navigator.menu.map(
      (item,index) => (
        <div
          key={item}
          className={css(style.item)}>
          <Link
            className={css(style.link,props.menuSelected == item.toLowerCase()? style.link.selected : style.link.noselect)}
            to={'/'+item.toLowerCase()}>
            {menuLabel[index]}
          </Link>
        </div>
      )
    )

    let mobileMenu = language.en.navigator.menu.map(
      (item,index) => (
        <Link
          key={item}
          className={css(style.mobileMenu.item)}
          to={'/'+item.toLowerCase()}>
          {menuLabel[index]}
        </Link>
      )
    )

    return (
      <div className={css(style.body)}>
          <span className={css(style.logo)}></span>
          <div className={css(style.title)}>
            LFS
          </div>
          {
            this.state.isShowmobileMenu && 
            <div className={css(style.mobileMenu)}>
              {mobileMenu}
              <span
                className={css(style.mobileMenu.item)}
                onClick={this.handlelanBtnClick.bind(this)}>
                <span className={css(style.mobileMenu.item.lanText)}>English</span>
                <span className={css(style.mobileMenu.item.lanIcon)}></span>
                <span className={css(style.mobileMenu.item.lanText)}>Chinese</span>
              </span>
            </div>
          }
          <div className={css(style.sideBox)}>
            <span
              className={css(style.lanBtn, props.language == 'en'? style.lanBtn.cn : style.lanBtn.en)}
              onClick={this.handlelanBtnClick.bind(this)}>
            </span>
            <span
              className={css(style.mobileMenuBtn, this.state.isShowmobileMenu? style.mobileMenuBtn.clicked : style.mobileMenuBtn.noclick)}
              onClick={this.handleMenuBtnClick.bind(this)}>
            </span>
          </div>
          <div className={css(style.menu)}>
            {baseaultMenu}
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
    return {
      menuSelected: state.reducer.navigatorMenuSelected,
      language: state.reducer.language,
    }
}

const mapDispatchToProps = {
  switchLanguage: language => switchLanguage(language)
}

Navigator.propTypes = {
   language: React.PropTypes.string,
   menuSelected: React.PropTypes.string,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigator)
