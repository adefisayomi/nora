import { useEffect } from 'react'
import {useRouter} from 'next/router'
import styles from '../styles/404.module.css'
import { Button } from 'semantic-ui-react'

export default function custom404 ({content= 'Something must have Gone wrong'}) {

    const router = useRouter()
    useEffect(() => {
        const goHome = () => {
            setTimeout(() => router.push('/'), 5000)
        }
        goHome()
    }, [])

    return (
        <div className= {styles.custom_404}>
            <h4>Yeah! i know, it does'nt look like it</h4>
            <h5>But! its a </h5>
            <h1>404 <span>page</span> </h1>
            <p> {content}</p>
            <Button
                color= 'black'
                inverted
                basic
                content= 'Go Back'
                onClick= {() => router.back()}
            />
        </div>
    )
}