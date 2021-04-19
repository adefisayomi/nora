import styles from './style/header.module.css'
import { Button} from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import {useRouter} from 'next/router'
import { ProfileTab } from './profileTab'
import { useEffect, useState } from 'react'


export default function Header ({data}) {

    const router = useRouter()
    const {UI, user} = GlobalState()
    const [restrict, setRestrict] = useState(false)
    // 
    useEffect(() => {
        if(user && user._id == data?._id) {
            setRestrict(true)
        } 
        else setRestrict(false)
    }, [data])

    return(
        <div className= {styles.header} style= {{ backgroundColor: UI.bgColor, color: UI.color }} >
            {data && 
                <>
                    <span>
                    <ProfileTab width= '100px' user= {data} />
                    </span>
                    <span className= {styles.header_profile}>
                        <div className= {styles.header_details}>
                            <h1>@{data?.username || '' }</h1>
                            <h2>{(data?.first_name || '') + ' ' + (data?.other_name[0] || '')}</h2>
                        </div>
                        <div className= {styles.header_button}>
                            { data.authorized &&
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
}