import { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { GlobalState } from "../../context/globalState";
import {GoogleButton} from './buttons'
import Link from 'next/link'
import styles from './style/login.module.css'
import LogoTab from '../wrapper/logoTab'
import axios from 'axios'



const Login = () => {

    const {signInWithToken,  UI} = GlobalState()

    const [form, setForm] = useState({username: '', password: ''})
    const resetForm = () => setForm({username: '', password: ''})
    const [showPass, setShowPass] = useState(false)
    const togglePass = () => setShowPass(!showPass)
    const [loading, setLoading] = useState(false)
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const [useGoogle, setUseGoogle] = useState(true)
    const toggleGoogle = () => setUseGoogle(!useGoogle)

    // 
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        //
        try{
            const res = await axios.post('/user/login', form)
            await signInWithToken(res.data.data)
            resetForm()
            return setLoading(false)
        }
        catch(err) {
            return setLoading(false)
        }
    }

    return(

        <div className= {styles.login} style= {{ color: UI.color }}>
            <div style= {{ backgroundColor: UI.bgColor, border: UI.border }} className= {styles.login_container}>
                <span className= {styles.login_logo}>
                    <LogoTab show />
                </span>
                <div className= {styles.login_options}>
                    <Form className= {styles.login_google} style= {{ transform: useGoogle && `translateX(0%)`, position: !useGoogle && 'absolute' }}>
                        <GoogleButton path= {'/user/usegoogle/login'} content= {'Continue with Google'} />
                    </Form>

                    <Form className= {styles.login_username} style= {{ transform: !useGoogle && `translateX(0%)`, position: useGoogle && 'absolute' }} onSubmit= {handleSubmit}>
                        <Form.Input
                            placeholder= 'Username, email or Phone'
                            name= 'username'
                            type= 'text'
                            value= {form.username}
                            onChange= {getForm}
                            />
                        <Form.Input
                            placeholder= 'Password'
                            name= 'password'
                            type= {showPass ? 'text' : 'password'}
                            icon= {{name: showPass ? 'eye' : 'eye slash', link: true, onClick: togglePass}}
                            value= {form.password}
                            onChange= {getForm}
                        />
                        <Button
                            content= 'Log in'
                            color= 'teal'
                            type= 'submit'
                            loading= {loading}
                            floated= 'left'
                            basic= {UI.dark ? true : false }
                        />
                        <span>
                            <Link href= '/account/password/reset'><p>Reset password</p></Link>
                            <span></span>
                            <Link href= '/account/signup'><p>Create an account</p></Link>
                        </span>
                    </Form>
                </div>
                <span className= {styles.login_toggle}>
                    <Checkbox id= 'checkBox' onChange= {toggleGoogle}/>
                    <label htmlFor= 'checkBox' style= {{ color: UI.color }}>{`signin with ${useGoogle ? 'Username or Email' : 'Google'}`}</label>
                    <Link href= '/account/signup'><p className= {styles.login_create_link}>Create account</p></Link>
                </span>
                </div>
            <div>
                <p className= {styles.login_copyright}>© 2021 Nora. All rights reserved. Powerd by Rango</p>
            </div> 
        </div>
    )
}

export default Login