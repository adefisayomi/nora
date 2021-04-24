import { GlobalState } from '../../context/globalState'
import styles from './style/comment_form.module.css'
import ProfileTab from '../re-usables/profileTab'
import {Icon} from 'semantic-ui-react'
import { useState } from 'react'
import {AddComment} from './commentAction'
import useSWR from 'swr'


export default function CommentForm ({product_id, onRedirect}) {

    const {UI, user} = GlobalState()
    const [comment, setComment] = useState('')
    const getComment = (e) => setComment(e.target.value)
    const [loading, setLoading] = useState(false)
    const {data: comments} = useSWR(() => product_id ? `/comment/${product_id}` : null)


    const handleComment = () => {
        setLoading(true)
        AddComment(comments, { data: comment, id: product_id })
        onRedirect && onRedirect()
        setComment('')
        setLoading(false)

    }

    return (
        <div className= {styles.comment_form} style= {{ backgroundColor: UI.bgColor }}>
        <ProfileTab width= '30px' url= {user?.image?.url} username= {user?.username} id= {user?._id}/>
        <textarea
          onChange= {getComment}
          style= {{ backgroundColor: UI.dark && UI.body, color: UI.color, border: UI.dark && UI.body }}
          value= {comment || ''}
          placeholder= 'Post a Comment...'
          />
        <Icon 
            name= 'send'
            link
            loading= {loading}
            color= 'teal'
            inverted= {UI.dark ? true : false}
            onClick= {handleComment}
            circular
        />
    </div> 
    )
}