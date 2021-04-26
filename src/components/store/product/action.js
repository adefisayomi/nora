import styles from './style/action.module.css'
import {Label, Icon} from 'semantic-ui-react'
import {useRouter} from 'next/router'
import { GlobalState } from '../../../context/globalState'
import useSWR from 'swr'
import { memo } from 'react'
import { LikePost } from '../../comments/commentAction'


const Action = memo(({onClick, product_id}) => {

    const {UI, user} = GlobalState()
    const {data: likes} = useSWR(() => product_id ? `/like/${product_id}` : null)
    const {data: comments} = useSWR(() => product_id ? `/comment/${product_id}` : null)

    const handleLike = () => {
        if(user) LikePost(likes, {user_id: user._id, product_id: product_id})
    }

    return(
        <div className= {styles.action}>
            <span>
                <Label style= {{backgroundColor: UI.bgColor, color: UI.color, marginRight: '5px'}}>
                    <Icon
                        name= 'send'
                        style= {{ fontSize:'16px' }}
                        fitted
                        // circular
                        link
                        onClick= {onClick?.comment}
                    />
                    {comments && comments.length > 0 && <span className= {styles.action_button}>{`${comments.length}`}</span>}
                </Label>
                <Label style= {{backgroundColor: UI.bgColor, color: UI.color}}>
                    <Icon
                        name= 'thumbs up outline'
                        style= {{ fontSize:'16px' }}
                        fitted
                        color= 'teal'
                        // circular
                        link
                        onClick= {handleLike}
                    />
                    {likes && likes.length > 0 && <span className= {styles.action_button}>{`${likes.length}`}</span>}
                </Label>
            </span>
            <span>
                <Icon 
                    name= 'cart'
                    // circular
                    color=  {UI.dark ? 'teal' : 'black'}
                    link
                    onClick= {onClick?.cart}
                    style= {{ fontSize:'16px' }}
                />
            </span>
        </div>
    )
})

export default Action