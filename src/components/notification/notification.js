import styles from './style/notification.module.css'
import {v4 as uuid} from 'uuid'
import { memo } from 'react'
import { GlobalState } from '../../context/globalState'
 
export default function Notification () {

    const {UI} = GlobalState()

    return (
        <div className= {styles.notification} style= {{ backgroundColor: UI.bgColor, border: UI.border }}>
            <h1 style= {{ borderBottom: UI.border }}>Notification</h1>
            <div className= {styles.notification_body} >
            <List key= {uuid()} />
            <List key= {uuid()} />
            <List key= {uuid()} />
            <List key= {uuid()} />
            <List key= {uuid()} />
            <List key= {uuid()} />
            <List key= {uuid()} />
            <List key= {uuid()} />
            </div>
        </div>
    )
}

// ------------------------
export const List = memo(() => {

    const {UI} = GlobalState()

    return(
        <div className= {styles.list} style= {{ borderBottom: UI.border}}>
            <span className= {styles.list_image}>
                <img src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
            </span>
            <span className= {styles.list_message}>
                <h1>You have a message...</h1>
                <p>'This is a message with you</p>
            </span>
            <span className= {styles.list_time}>
                23:89
            </span>
        </div>
    )
})