import styles from './style/notification.module.css'
import {v4 as uuid} from 'uuid'
import { memo, useEffect, useState } from 'react'
import { GlobalState } from '../../context/globalState'
import moment from 'moment'


export default function Notification () {

    const {UI,alert} = GlobalState()
    const [notification, setNotification] = useState(['Welcome to Nora'])
    
    // 
    useEffect(() => {
        const getNotification = () => {
            if(alert?.message) {
               setNotification([...notification, alert?.message]) 
            }
        }

        getNotification()
    }, [alert?.message])

    return (
        <div className= {styles.notification} style= {{ backgroundColor: UI.bgColor, border: UI.border }}>
            <h1 style= {{ borderBottom: UI.border }}>Notification</h1>
            <div className= {styles.notification_body} >
                {notification && notification.length > 0 && notification.map((not, index) => (
                  <List key= {index} message= {not} time= {moment().startOf('hour').fromNow()} />  
                ))}
            
            </div>
        </div>
    )
}

// ------------------------
export const List = memo(({message, time}) => {

    const {UI} = GlobalState()

    return(
        <div className= {styles.list} style= {{ borderBottom: UI.border}}>
            <span className= {styles.list_image}>
                <img src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
            </span>
            <span className= {styles.list_message}>
                {/* <h1>You have a message...</h1> */}
                <p>{message}</p>
            </span>
            <span className= {styles.list_time}>
                {time}
            </span>
        </div>
    )
})