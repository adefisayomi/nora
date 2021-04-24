import { Divider } from 'semantic-ui-react'
import CommentList from './commentList'
import styles from './style/comments.module.css'
import useSWR from 'swr'
import { Fragment, memo } from 'react'


const Comment = memo(({product_id}) => {

    const {data: comments} = useSWR(() => product_id ? `/comment/${product_id}` : null)
    
    return (
        <div className= {styles.comments}>
            {comments && comments.length > 0 &&
            comments.map((comment, index) => (
                <Fragment key= {index}>
                <CommentList comment= {comment} product_id= {product_id} />
                <Divider/>
                </Fragment>
            ))
            }
        </div>
    )
})

export default Comment