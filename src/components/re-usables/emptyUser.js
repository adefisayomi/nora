import { useRouter } from 'next/router'
import { Divider, Icon } from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import styles from '../re-usables/style/userNotFound.module.css'


export default function UserNotFound ({content= 'User not found.'}) {

    const {UI} = GlobalState()
    const router = useRouter()

    return (
        <div className= {styles.user_not_found} style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
            <Icon
                name= 'arrow alternate circle left'
                size= 'large'
                onClick= {() => router.back()}
                link
            />
            <Divider />
            <div>
                <span>
                    <img src="https://www.clipartkey.com/mpngs/m/209-2095552_profile-picture-placeholder-png.png" alt=""/>
                </span>
            <h1>{content}</h1>
            </div>
            <Divider />
        </div>
    )
}