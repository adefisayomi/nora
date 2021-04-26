import { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { GlobalState } from "../../context/globalState";
import {GoogleButton} from './buttons'
import Link from 'next/link'
import styles from './style/signup.module.css'
import axios from 'axios'
import LogoTab from '../wrapper/logoTab'



const Signup = () => {

    const {signInWithToken,  UI} = GlobalState()

    const [form, setForm] = useState({})
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
            const token = await axios.post('/user/signup', form)
            const res = await signInWithToken(token.data.data)
            if(res && res.data?.success) {
                resetForm()
                return setLoading(false)
            } return setLoading(false)
        }
        catch(err) {
            return setLoading(false)
        }
    }

    return(
        <div className= {styles.signup} style= {{ color: UI.color }}>
            <div style= {{ backgroundColor: UI.bgColor, border: !UI.dark && UI.border }} className= {styles.signup_container}>
                <span className= {styles.signup_logo}>
                    <LogoTab show />
                </span>
                <div className= {styles.signup_options}>
                    <Form className= {styles.signup_google} style= {{ transform: useGoogle && `translateX(0%)`, position: !useGoogle && 'absolute' }}>
                        <GoogleButton path= {'/user/google/signup'} content= {'Signup with Google'} />
                    </Form>

                    <Form className= {styles.signup_username} style= {{ transform: !useGoogle && `translateX(0%)`, position: useGoogle && 'absolute' }} onSubmit= {handleSubmit}>
                        <Form.Input
                            placeholder= 'Username'
                            name= 'username'
                            type= 'text'
                            transparent= {UI.dark ? true : false}
                            inverted= {UI.dark ? true : false}
                            style= {{outline: 'none', backgroundColor: UI.dark && UI.body, color: UI.color, padding: UI.dark && '10px', borderRadius: UI.dark && '3px' }}
                            value= {form.username || ''}
                            onChange= {getForm}
                        />
                        <Form.Input
                            placeholder= 'Email'
                            name= 'email'
                            type= 'text'
                            transparent= {UI.dark ? true : false}
                            inverted= {UI.dark ? true : false}
                            style= {{outline: 'none', backgroundColor: UI.dark && UI.body, color: UI.color, padding: UI.dark && '10px', borderRadius: UI.dark && '3px' }}
                            value= {form.email || ''}
                            onChange= {getForm}
                        />
                        <Form.Input
                            placeholder= 'Password'
                            name= 'password'
                            transparent= {UI.dark ? true : false}
                            inverted= {UI.dark ? true : false}
                            style= {{outline: 'none', backgroundColor: UI.dark && UI.body, color: UI.color, padding: UI.dark && '10px', borderRadius: UI.dark && '3px' }}
                            type= {showPass ? 'text' : 'password'}
                            icon= {{name: showPass ? 'eye' : 'eye slash', link: true, onClick: togglePass,  circular: UI.dark && true}}
                            value= {form.password || ''}
                            onChange= {getForm}
                        />
                        <div style= {{marginBottom: '20px'}}></div>
                        <Button
                            content= 'Create account'
                            color= 'teal'
                            onClick= {handleSubmit}
                            loading= {loading}
                            fluid
                            basic= {UI.dark ? true : false }
                        />
                        <span>
                            <Link href= '/account/password/reset'><p>Reset password</p></Link>
                            <span></span>
                            <Link href= '/account/signup'><p>Log in</p></Link>
                        </span>
                    </Form>
                </div>
                <span className= {styles.signup_toggle}>
                <Checkbox id= 'checkBox' onChange= {toggleGoogle}/>
                <label htmlFor= 'checkBox' style= {{ color: UI.color }}>{`Create account with ${useGoogle ? 'Username or Email' : 'Google'}`}</label>
                <Link href= '/account/login'><p className= {styles.signup_create_link}>Login</p></Link>
                </span>
            </div>
            <div>
                <p className= {styles.signup_copyright}>© 2021 Nora. All rights reserved. Powerd by Rango</p>
            </div>
        </div>
    )
}

export default Signup