import {lanCn, lanEn, exchange, menu as mobileMenuIcon, menu_white as mobileMenuIconWhite} from '../../global/icon'
import {creatStyle} from '../../global/aphrodite-freestyle'
import breakpoint from '../../global/breakpoints'

let style = {
    base: {
        body: { width: '100%', height: '60px', 
                background: 'white', borderBottom: '1px solid #eee'},

        logo: { float: 'left', 
                width: '60px', height: '60px',
                background: 'url(./assets/images/lfs-logo.png) center/50px  no-repeat'},
        
        title: { float: 'left', 
                 height: '60px', 
                 color: '#7F6553', fontSize: '1.4rem',fontWeight: '700', lineHeight: '60px'},

        menu: { float: 'right', 
                height: '60px'},

        item: { float: 'left', 
                width: '110px', height: '60px',
                textAlign: 'center', lineHeight: '60px',
                ':first-child': { width: '80px'}
        },

        link: { color: '#996F53', fontWeight: '700', textDecoration: 'none',
                noselect: { opacity: '.85',
                    xbox: { width: '12px' },
                    psp: { color: 'red',
                        gba: { price: '12'}
                    }
                }, 
                selected: { opacity: '1'}
        },

        sideBox: { float: 'right', position: 'relative',
                   height: '60px', width: '60px'},

        lanBtn: { top: '50%', left: '50%', position: 'absolute', cursor: 'pointer', 
                  width: '30px', height: '30px', marginLeft: '-15px', marginTop: '-15px',
                  background: ' center/30px no-repeat',
                  cn: { backgroundImage: lanCn },
                  en: { backgroundImage: lanEn }
        },

        mobileMenu: { display: 'none' },

        mobileMenuBtn: { display: 'none' }
    },

    mobile: {
        menu: { display: 'none' },

        lanBtn: { display: 'none' },

        mobileMenu: { position: 'absolute',
                      width: '100%', display: 'block',
                      background: 'white',

                item: { position: 'relative', cursor: 'pointer',
                        height: '70px', display: 'block',
                        color: 'white', fontWeight: '700', lineHeight: '70px', textAlign: 'center',  textDecoration: 'none',
                        background: '#7F6553', borderBottom: '1px solid #988375',
                        ':hover': { opacity: '.9' },

                        lanIcon: { top: '50%', left: '50%', position: 'absolute',
                                    width: '20px', height: '20px', marginTop: '-10px', marginLeft: '-10px',
                                    background: exchange + ' center/20px no-repeat'
                        },

                        lanText: { margin: '0 20px' }
            }
        },

        mobileMenuBtn: { top: '50%', left: '50%', position: 'absolute', display: 'block', cursor: 'pointer',
                         width: '26px', height: '26px', marginTop: '-13px', marginLeft: '-13px',
                         background: ' center/26px no-repeat',
                         clicked: { backgroundImage: mobileMenuIconWhite },
                         noclick: { backgroundImage: mobileMenuIcon }
        },

    }
}
console.log(creatStyle(style, breakpoint).mobileMenuBtn.clicked)
export default creatStyle(style, breakpoint)