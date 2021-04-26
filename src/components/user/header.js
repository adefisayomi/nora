import styles from './style/header.module.css'
import { Button} from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import {useRouter} from 'next/router'
import { ProfileTab } from './profileTab'


const Header = (({user}) => {

    const router = useRouter()
    const {UI} = GlobalState()

    return(
        <div className= {styles.header} style= {{ backgroundColor: UI.bgColor, color: UI.color }} >
            {user && 
                <>
                    <span>
                    <ProfileTab width= '100px' user= {user} />
                    </span>
                    <span className= {styles.header_profile}>
                        <div className= {styles.header_details}>
                            <h1>@{user?.username || '' }</h1>
                            <h2>{(user?.first_name || '')}</h2>
                        </div>
                        <div className= {styles.header_button}>
                            { user.authorized &&
                                <Button
                                    content= 'Edit Profile'
                                    color= 'teal'
                                    inverted= {UI.dark ? true : false}
                                    onClick= {() => router.push(`${router.asPath}/edit`)}
                                />}
                            <Button
                                content= 'Go to store'
                                color= 'black'
                                inverted= {UI.dark ? true : false}
                                onClick= {() => router.push(`${router.asPath}/store`)}
                            />
                        </div>
                    </span>
                </>
            }
        </div>
    )
})

export default Header