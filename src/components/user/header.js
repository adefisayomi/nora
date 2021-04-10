import styles from './style/header.module.css'
import { Button } from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import {useRouter} from 'next/router'
import { ProfileTab } from './profileTab'


export default function Header () {

    const router = useRouter()
    const {UI} = GlobalState()

    return(
        <div className= {styles.header} style= {{ backgroundColor: UI.bgColor, color: UI.color }} >
            <ProfileTab width= '100px' />
            <span className= {styles.header_profile}>
                 <div className= {styles.header_details}>
                    <h1>@claceey_store</h1>
                    <h2>Dolapo oluwole</h2>
                </div>
                <Button
                    content= 'Edit Profile'
                    color= 'teal'
                    inverted= {UI.dark ? true : false}
                    onClick= {() => router.push(`${router.asPath}/edit`)}
                />
            </span>
           
        </div>
    )
}