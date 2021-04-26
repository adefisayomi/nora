import { Button, Icon } from 'semantic-ui-react'
import styles from './style/button.module.css'
import axios from 'axios'
import firebase from '../../utils/firebase/config'
import { GlobalState } from '../../context/globalState'
import { useState, memo } from 'react'

export const GoogleButton = memo(({path, content}) => {

    const {UI, signInWithToken, setGlobalAlert} = GlobalState()
    const [loading, setLoading] = useState(false)

    const Provider = new firebase.auth.GoogleAuthProvider();
    const signInWithGoogle = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const data = await firebase.auth().signInWithPopup(Provider)
            if(data.user) {
            //
            console.log(data.user)
            const res = await axios.post(path, {token: data.user.za})
            await signInWithToken(res.data.data)
            return setLoading(false)  
            }
            else throw new Error
        }
        catch(err) {
            setGlobalAlert({message: err.message})
            return setLoading(false)
        }
    }

    return(
        <div className= {styles.google_button} onClick= {signInWithGoogle}>
            <Button
                className= {styles.button}
                color= 'teal'
                style= {{ display: 'flex' }}
                inverted= {UI.dark ? true : false}
                loading= {loading}
                size= 'mini'
            >
                <span className= {styles.google_button_icon}>
                  <Icon
                    name= 'google'
                    circular
                    fitted
                    link
                />  
                </span>
               
                <h1>{content}</h1>
            </Button>
        </div>
    )
})