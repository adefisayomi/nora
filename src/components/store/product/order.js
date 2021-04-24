import Modal from '../../re-usables/modal'
import styles from './style/order.module.css'
import {Divider} from 'semantic-ui-react'
import Slider from '../../slider/slider'
import { memo, useState } from "react";
import { useRouter } from "next/router";
import { GlobalState } from "../../../context/globalState";
import OrderForm from './order_form'
import CommentForm from '../../comments/commentForm';
import Comments from '../../comments/comments';
import useSWR from 'swr'


const Order =  memo(({close, product}) => {

    const router = useRouter()
    const {data: comments} = useSWR(() => product && product._id ? `/comment/${product._id}` : null)
    const {UI, user} = GlobalState()
    const [form, setForm] = useState({})
    const [showComments, setShowComments] = useState(false)
    


    return(
           <Modal onClose= {close}>
               <Divider />
               <div className= {styles.order}>
                    <div className= {styles.order_images} style= {{ borderColor: UI.body }}>
                        <Slider images= {product.details.images} />
                    </div>
                    <span className= {styles.order_divider}></span>
                    <div className= {styles.order_form}>
                        <OrderForm props= {product} />
                    </div>
               </div>
               <Divider />
               {comments && 
                    <a className= {styles.order_comment_count} onClick= {() => setShowComments(true)}>
                    {`${comments.length || 0} comments`}
                    </a>}
                <Divider />
               { comments && showComments && 
                    <div className= {styles.order_comments}>
                        <Comments product_id= {product._id} />
                    </div>}
               {user && <CommentForm onRedirect= {() => setShowComments(true)} product_id= {product._id} />}
           </Modal>
    )
})

export default Order