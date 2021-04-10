import { useRouter } from "next/router";
import { GlobalState } from "../../context/globalState";
import styles from './style/profile_tab.module.css'



export const ProfileTab = ({width= '33px'}) => {

    const {user, UI} = GlobalState()
    const router = useRouter()

    return(
        <>
        {user && 
        <div className= {styles.profile_tab}
            style= {{ width: width, height: width, backgroundColor: UI.bgColor, color: UI.color }}
            onClick= {() => router.replace(`${user.username || user._id}`)}
         >
            { user?.image && user.image?.url ?
                <span className= {styles.profile_tab_image}>
                    <img src= {user.image.url} alt="profile-picture"/>
                </span> :
                <span>
                    <h1>{(user.username || user.first_name)[0]}</h1>
                </span>
            }
        </div>}
        </>
    )
}
