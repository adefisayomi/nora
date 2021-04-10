import styles from './style/nav.module.css'
import { GlobalState } from '../../context/globalState'
import LogoTab from './logoTab'
import MenuTab from './menuTab'
import SearchTab from './searchTab'

export default function Nav () {

    const {UI} = GlobalState()

    return(
        <div className= {styles.nav} style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
            <span className= {styles.nav_logo}>
                <LogoTab />
            </span>
            <span className= {styles.nav_search}>
                <SearchTab />
            </span>
            <span className= {styles.nav_menu}>
                <MenuTab />
            </span>
        </div>
    )
}

