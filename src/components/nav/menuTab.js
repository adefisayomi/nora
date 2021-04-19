import {useState, useCallback, memo} from 'react'
import {useRouter} from 'next/router'
import styles from './style/menu_tab.module.css'
import {Icon, Transition, Checkbox} from 'semantic-ui-react'
import {asideMenu} from '../../utils/static_files/menu'
import {v4 as uuid} from 'uuid'
import { GlobalState } from '../../context/globalState'
import { ProfileTab } from '../user/profileTab'


const MenuTab = memo(() => {

    const {UI, toggleUI, user, logOut} = GlobalState()
    const router = useRouter()
    const [menu, setMenu] = useState(false)
    const toggleMenu = () => setMenu(!menu)
    const closeMenu = () => setMenu(false)

    const navigate = useCallback(() => {
        router.push()
        closeMenu()
    })

    const doLogout = () => {
        logOut()
        closeMenu()
    }

    return (
        <>
        <div className= {styles.menu_tab}>
            <div className= {styles.menu}>
                {user && <span className= {styles.menu_tab_mobile}><UserTab width= '30px' /></span>}
                {asideMenu && asideMenu.map(menu => (
                    <span key= {uuid()} className= {styles.menu_tab_mobile}>
                       <Icon
                            style= {{ fontSize: '15px'}}
                            name= {menu.icon}
                            link
                            color= {UI.dark ? 'teal' : 'black'}
                            onClick= {() => router.replace(`${menu.path}`)}
                        /> 
                    </span>
                ))}
                    <Icon
                    style= {{ fontSize: '15px', zIndex: '1'}}
                    name= {menu ? 'cancel' :'sidebar' }
                    circular
                    link
                    onClick= {toggleMenu}
                    />
            </div>
            <Transition visible={menu} animation='scale' duration={400}>
                <ul style= {{ backgroundColor: UI.bgColor, border: UI.border}}>
                    {asideMenu.map(nav => <li className= {styles.menu_tab_mobile_dropDown} style= {{ borderBottom: UI.border}} key= {uuid()} onClick= { () => navigate(nav.path)}>
                        {nav.text}
                    </li>)}
                    {user ? 
                    <li style= {{ borderBottom: UI.border}} onClick= {doLogout}>Logout</li> : 
                    <li style= {{ borderBottom: UI.border}} onClick= {() => router.push('/account/login')}>Login</li>
                    }
                    <li className= {styles.menu_tab_toggle_theme} style= {{ borderBottom: UI.border}}>
                        <Checkbox toggle onChange= {toggleUI}/>
                        <h4>{UI?.dark ? 'Light Mode' : 'Dark Mode'}</h4>
                    </li>
                </ul>
            </Transition>
        </div>
        <Transition visible={menu} animation='fade' duration={400}>
            <div className= {styles.menu_tab_overlay} onClick= {closeMenu}></div>
        </Transition>
        </>
    )
})

export default MenuTab

export const UserTab = ({width}) => {

    const {UI, user} = GlobalState()
    const router = useRouter()

    return (
        <div className= {styles.profile_tab}
            style= {{ width: width, height: width, backgroundColor: UI.bgColor, color: UI.color }}
            onClick= {() => router.push(`/${user.username || user._id}`)}
         >
            { user?.image && user.image?.url ?
                <span className= {styles.profile_tab_image}>
                    <img src= {user.image.url} alt="profile-picture"/>
                </span> :
                <span>
                    <h1> { user && user.username && user.username[0] || user.first_name && user.first_name[0] || '' } </h1>
                </span>
            }
        </div>
    )
}