import { useRouter } from 'next/router'
import { GlobalState } from '../../context/globalState'
import styles from './style/profile_tab.module.css'


export default function ProfileTab ({width= '33px', url, id, username}) {

    const {UI} = GlobalState()
    const router = useRouter()

    return(
        <div className= {styles.profile_tab}
            style= {{ width: width, height: width, backgroundColor: UI.bgColor, color: UI.color }}
            onClick= {() => router.push(`/${username || id}`)}
            >
            { url && url ?
                <span className= {styles.profile_tab_image}>
                    <img src= {url} alt="profile-picture"/>
                </span> :
                <span>
                    <h1> { username && username[0] || '' } </h1>
                </span>
            }
        </div>
    )
}