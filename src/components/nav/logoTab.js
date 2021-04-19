import { Loader } from 'semantic-ui-react'
import styles from './style/logoTab.module.css'
import Link from 'next/link'
import { GlobalState } from '../../context/globalState'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function LogoTab () {

    const {UI} = GlobalState()

    return(
        <div className= {styles.logo} style= {{ color: UI.color }}>
            <Link href= '/'><a style= {{ color: UI.dark ? 'teal' : UI.color }}>n</a></Link>
        </div>
    )
}