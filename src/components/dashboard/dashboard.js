import styles from './style/dashboard.module.css'
import {GlobalState} from '../../context/globalState'
import {dashboardMenu} from '../../utils/static_files/menu'
import Link from 'next/link'
import {Label} from 'semantic-ui-react'
import {useState} from 'react'


export default function Dashboard ({children}) {

    const {UI} = GlobalState()
    const [nav, setNav] = useState(false)
    const closeNav = () => setNav(false)
    const toggleNav = () => setNav(!nav)

    return(
        <div className= {styles.dashboard}>
            <span className= {styles.dashboard_mobile}>
                <Label tag as='a' onClick= {toggleNav}>
                    Dashboard
                </Label>
            </span>
            <div className= {styles.dashboard_navigation} style= {{backgroundColor: UI.bgColor, border: !UI.dark && UI.border, transform: nav && 'translateX(0%)' }}>
                <ul>
                    {dashboardMenu.map((nav, index) => (
                        <Link key= {index} href= {nav.path}><li>{nav.text}</li></Link>
                    ))}
                </ul>
            </div>
            <div className= {styles.dashboard_main} style= {{backgroundColor: UI.bgColor, border: !UI.dark && UI.border }}>
                {children}
            </div>
        </div>
    )
}