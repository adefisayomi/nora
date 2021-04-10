import { useEffect } from 'react'
import {Icon} from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import styles from './style/alert.module.css'


export const GlobalAlert = () => {

    const {setGlobalAlert, alert} = GlobalState()
    
    useEffect(() => {
        const clearAlert = () => {
            if(alert.message) {
                setTimeout(() => {
                    setGlobalAlert({message: ''})
                }, 5000);
            }
        }
        clearAlert()
    }, [alert.message])

    return (
        <>
        {alert?.message && alert?.message !== null && <div className= {styles.globalalert}>
            <ul style= {{backgroundColor: alert?.type == 'success' ? 'rgb(209, 226, 245)' : 'rgb(255, 158, 158)'}}>
                {typeof(alert?.message) == 'object' ? alert?.message.map(msg => (
                    <li><span><Icon name= {alert?.type === 'success' ? 'check circle outline' : 'ban'} color= {alert?.type === 'success' ? 'blue' : 'red'} /></span>{msg}</li>
                )) : <li><span><Icon name= {alert?.type === 'success' ? 'check circle outline' : 'ban'} color= {alert?.type === 'success' ? 'blue' : 'red'} /></span>{alert?.message}</li>}
            </ul>
            <Icon name= 'cancel' size= 'large' link onClick= {() => setGlobalAlert({message: ''})}/>
        </div>}
        </>
    )
}