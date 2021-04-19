import Modal from '../../re-usables/modal'
import styles from './style/order.module.css'
import {Divider} from 'semantic-ui-react'
import Slider from '../../slider/slider'
import { useState } from "react";
import { useRouter } from "next/router";
import { GlobalState } from "../../../context/globalState";
import { Profile, CommentForm, OrderForm, Comments } from './templates';

export default function View ({close, product}) {

    const router = useRouter()
    const {UI} = GlobalState()
    const [form, setForm] = useState({})


    return(
           <Modal onClose= {close}>
                <div className= {styles.order}>
                    <div className= {styles.order_images} style= {{ borderColor: UI.body }}>
                        <Slider images= {product.details.images} />
                    </div>
                    <div className= {styles.order_form}>
                        <Profile id= {product.author._id} title= {product.details.title} />
                        <Divider />
                        <OrderForm props= {{ description: product.details.description, price: product.details.price }} />
                    </div>
                </div>
                <Divider />
                
                    {product && product.meta.comments.length > 0 && 
                      <div className= {styles.order_comments}>
                         {product.meta.comments.map((com, index) => <Comments comment= {com} key= {index} product_id= {product._id}/> )}
                      </div>
                    }
                <Divider />
                <CommentForm id= {product._id} />
           </Modal>
    )
}