import styles from './style/password.module.css'
import {Form, Button} from 'semantic-ui-react'
import {useState} from 'react'
import { useRouter } from 'next/router'
import {GlobalState} from '../../context/globalState'
import LogoTab from '../wrapper/logoTab'



const Login = () => {

    const {UI} = GlobalState()
    const router = useRouter()
    const [form, setForm] = useState({})
    const [showPass, setShowPass] = useState(false)
    const togglePass = () => setShowPass(!showPass)
    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    // 
    const handleSubmit = () => {
        e.preventDefault()
        setLoading(true)
    }

    return(
        <div className= {styles.password}>
                <Form onSubmit= {handleSubmit} style= {{border: UI.border, backgroundColor: UI.bgColor}}>
                    <LogoTab />
                    {confirm ? <p>Enter the TOKEN sent to your email address .</p> :
                     <p>Enter your email and we'll send you a TOKEN to reset your password.</p> 
                    }
                    <Form.Input
                        placeholder= 'Email'
                        name= 'email'
                        type= 'email'
                        readOnly= {confirm ? true : false}
                        value= {form.email || ''}
                        onChange= {getForm}
                    />
                    {confirm && <>
                        <Form.Input
                            placeholder= 'New Password'
                            name= 'password'
                            type= {showPass ? 'password' : 'text'}
                            icon= {{name: showPass ? 'eye slash' : 'eye', link: true, onClick: togglePass}}
                            value= {form.password || ''}
                            onChange= {getForm}
                        />
                        <Form.Input
                            placeholder= 'Enter Token'
                            name= 'token'
                            type= 'text'
                            value= {form.token || ''}
                            onChange= {getForm}
                        />
                    </>}
                    <div style= {{marginBottom: '10px'}}></div>
                    <Button
                        content= 'Reset Password'
                        color= 'teal'
                        fluid
                        type= 'submit'
                        basic= {UI.dark ? true : false}
                    />
                </Form>
                <p className= {styles.password_copyright}>© 2021 Nura. All rights reserved.</p>
        </div>
    )
}

export default Login