import Header from './header'
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react'
import { GlobalState } from '../../context/globalState'
import {GlobalAlert} from './alert'
import Nav from '../nav/nav'
import styles from './style/wrapper.module.css'
import Footer from '../nav/footer'
import axios from 'axios'


export default function Wrapper ({children}) {

    const router = useRouter()
    const {UI, setGlobalAlert, user, setRestriction} = GlobalState()
    const path = router.asPath.split('/').pop().replace('/', '|')
    const forbidenRoute = ['login', 'signup', 'reset']
    const [showNav, setShowNav] = useState(true)
    const toggleShowNav = () => {
        if(forbidenRoute.includes(path)) {
            setShowNav(false)
        }
        else setShowNav(true)
    }
    // All redirects
    const redirect = () => {
        if(!user && router.asPath.includes('dashboard')) router.push('/')
    }
    // 
    // Axios defaults
    axios.defaults.baseURL = 'https://rango-server.herokuapp.com/api'
    axios.defaults.headers['Content-Type'] = 'application/json'
    axios.defaults.withCredentials = true
    // 
    axios.interceptors.response.use(res => {
        if(res && res.data.message !== null) {
            setGlobalAlert({message: res.data.message, type: res.data.success ? 'success' : 'error'})
        }
        return res
        
    }, err => {
        return Promise.reject(err)
    })
    //
    // 
    useEffect(() => {
        toggleShowNav()
        redirect()
    }, [path])

    return(
        <div style= {{ backgroundColor: UI.body, color: UI.color }} className= {styles.wrapper}>
            <Header title= {path} />
            <GlobalAlert />
            { showNav &&
                <header style= {{ backgroundColor: UI.bgColor, color: UI.color, borderBottom: UI.border }}>
                    <Nav />
                </header> 
            }
            <main style= {{ backgroundColor: UI.body, color: UI.color, minHeight: !showNav && '100vh' }} >
                {children}
            </main>
            { showNav && <footer style= {{ backgroundColor: UI.body, color: UI.color }}>
                <Footer />
            </footer> }
        </div>
    )
}