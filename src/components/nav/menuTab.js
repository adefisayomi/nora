import {useState, memo} from 'react'
import {useRouter} from 'next/router'
import styles from './style/menu_tab.module.css'
import {Icon} from 'semantic-ui-react'
import {MainMenu} from '../../utils/static_files/menu'
import { GlobalState } from '../../context/globalState'
import ProfileTab from '../re-usables/profileTab'
import Cart from '../cart/cart'
import DropDown from '../re-usables/dropdown'
import CartDropDown from '../cart/cart_dropDown'


const MenuTab = memo(() => {

    const {UI, user} = GlobalState()
    const router = useRouter()
    const [menu, setMenu] = useState(false)
    const toggleMenu = () => setMenu(!menu)


    return (
        <div className= {styles.menu_tab}>
            {user && <span className= {styles.menu_tab_hide} style= {{ marginRight: '20px' }}>
                <ProfileTab width= '30px' url= {user?.image?.url} username= {user?.username} id= {user?._id} />
            </span>}
            <span className= {styles.menu_tab_hide}>
                <Icon
                    style= {{ fontSize: '15px', zIndex: '1'}}
                    name= 'home'
                    color= {UI.dark ? 'teal' : 'black'}
                    link
                    onClick= {() => router.push('/')}
                />
            </span >
            {user && <span className= {styles.menu_tab_hide}>
                <DropDown list= {<CartDropDown />} width= '250px'>
                    <Cart />
                </DropDown>
            </span>}
            {user && <span className= {styles.menu_tab_hide}>
                <Icon
                    style= {{ fontSize: '15px', zIndex: '1'}}
                    name= 'dashboard'
                    color= {UI.dark ? 'teal' : 'black'}
                    link
                    onClick= {() => router.push('/dashboard/store')}
                />
            </span>}
            <span>
                <DropDown list= {<MainMenu />}>
                    <Icon
                        style= {{ fontSize: '15px', zIndex: '1'}}
                        name= 'sidebar'
                        circular
                        link
                        onClick= {toggleMenu}
                    />
                </DropDown>
            </span>
        </div>
    )
})

export default MenuTab