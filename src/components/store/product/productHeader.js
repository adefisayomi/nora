import styles from './style/product_header.module.css'
import {Icon,Placeholder} from 'semantic-ui-react'
import { GlobalState } from '../../../context/globalState'
import ProfileTab from '../../re-usables/profileTab'
import useSWR from 'swr'
import PopUp from '../../re-usables/pop_up'
import FollowButton from '../../re-usables/followButton'


export default function ProductHeader ({id, title}) {

    const {UI, user} = GlobalState()
    const {data: author} = useSWR(() => id ? `/user/${id}` : null)

    
    return(
        <div className= {styles.author}>
            { author && author._id ? 
            <div className= {styles.author_details}>
                <ProfileTab url= {author.image.url} id= {author._id} username= {author.username} />
                <span className= {styles.author_details_span}>
                    <h1>{`@${author.username || author.first_name}`}</h1>
                    <h4>{title}</h4>
                </span>
            </div>
            :
            <div>
                <Placeholder inverted= {UI.dark ? true : false} >
                 <Placeholder.Header image >
                 <Placeholder.Line />
                 <Placeholder.Line />
                 </Placeholder.Header>
               </Placeholder>
            </div>
            }
            <PopUp position= 'bottom right' trigger= {<Icon name= 'ellipsis horizontal' link />}>
                {user && id && user._id == id ? '' : <FollowButton id= {id} />}
            </PopUp>
            </div>
    )
}