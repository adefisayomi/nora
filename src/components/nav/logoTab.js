import { Loader } from 'semantic-ui-react'
import styles from './style/logoTab.module.css'
import Link from 'next/link'
import { GlobalState } from '../../context/globalState'

export default function LogoTab () {

    const {UI} = GlobalState()

    return(
        <div className= {styles.logo} style= {{ color: UI.color }}>
            <Link href= '/'><a>n</a></Link>
        </div>
    )
}