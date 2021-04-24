import ProfileTab from '../re-usables/profileTab'
import styles from './style/comment_list.module.css'
import {Placeholder} from 'semantic-ui-react'
import useSWR from 'swr'
import { DeleteComment } from './commentAction'
import { memo } from 'react'
import { GlobalState } from '../../context/globalState'


const CommentList = memo(({comment, product_id}) => {

    const {user} = GlobalState()
    const {data: commentUser} = useSWR( () => comment && comment._id? `/user/${comment.body._id}` : null)
    const {data: comments} = useSWR(() => product_id ? `/comment/${product_id}` : null)

    const handleDelete = () => {
        DeleteComment(comments, {id: comment._id, product_id: product_id})
    }

    return (
        <div className= {styles.comment_list}>
            { commentUser && commentUser._id && comment ?
            <>
            <div className= {styles.comment_list_image}>
               <ProfileTab width= '25px' url= {commentUser?.image?.url} id= {commentUser._id} username= {commentUser?.username} /> 
            </div>
            <div>
                <div className= {styles.comment_list_header}>
                    <h4>@{commentUser.username}</h4>
                    <em>{comment.date}</em>
                </div>
                <div className= {styles.comment_list_message}>
                    <p>{comment?.body?.comment}</p>
                </div>
                <div className= {styles.comment_list_action}>
                    <a>reply</a>
                    {user && user._id === commentUser._id && <a style= {{ color: 'grey' }} onClick= {handleDelete}>delete</a>}
                    {/* <a style= {{ color: 'grey' }}>edit</a> */}
                </div>
            </div>
            </> : 
            <Placeholder inverted>
                <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Header>
            </Placeholder>
            }
        </div>
    )
})

export default CommentList