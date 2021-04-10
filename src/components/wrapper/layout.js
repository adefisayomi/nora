import { memo } from 'react'
import { GlobalState } from '../../context/globalState'
import Notification from '../notification/notification'
import styles from './style/layout.module.css'


const Layout = memo(({children}) => {

    const {UI} = GlobalState()

    return(
        <div className= {styles.layout}>
            <div className= {styles.layout_main}>
                {children}
            </div>
            <div className= {styles.layout_notification}>
                <Notification />
            </div>
        </div>
    )
})

export default Layout