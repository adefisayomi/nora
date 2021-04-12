import Modal from '../../re-usables/modal'
import styles from './style/order.module.css'
import {Divider} from 'semantic-ui-react'
import Slider from '../../slider/slider'
import { useState } from "react";
import { useRouter } from "next/router";
import { GlobalState } from "../../../context/globalState";
import { Profile, CommentForm, OrderForm } from './templates';

export default function View ({close, product}) {

    const router = useRouter()
    const {UI} = GlobalState()
    const [form, setForm] = useState({})


console.log(product)
    return(
           <Modal onClose= {close}>
                <div className= {styles.order}>
                    <div className= {styles.order_images}>
                        <Slider images= {product.details.images} maxHeight= '300px' />
                    </div>
                    <div className= {styles.order_form}>
                        <Profile id= {product.author._id} title= {product.details.title} />
                        <OrderForm props= {{ description: product.details.description, price: product.details.price }} />
                    </div>
                </div>
                <Divider />
                <CommentForm />
           </Modal>
    )
}