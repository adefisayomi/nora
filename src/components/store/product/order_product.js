// import Store from "./index";
import Modal from '../../re-usables/modal'
import styles from './style/view.module.css'
import {Divider} from 'semantic-ui-react'
import Slider from '../../slider/slider'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { GlobalState } from "../../../context/globalState";
import { Profile, CommentForm, OrderForm } from './templates';

export default function View () {

    const router = useRouter()
    const {UI} = GlobalState()
    const [form, setForm] = useState({})
    
    // useEffect(() => {
    //     const getImagesById = async () => {
    //         const res = await axios.get(`/products/${router.query.id}`)
    //         console.log(res.data.data)
    //         return setForm({
    //             description: res.data.data.details?.description,
    //             title: res.data.data.details?.title,
    //             images: res.data.data.details?.images
    //         })
    //     }
    //     getImagesById()
    // }, [router.query.id])

    const img = [
        {url:'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',  id:1 },
        {url:'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',  id:1 },
        {url:'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',  id:1 },
    ]

    return(
    //    <Store>
           <Modal>
                <div className= {styles.order}>
                    <div className= {styles.order_images}>
                        <Slider slides= {img} maxHeight= '300px' />
                    </div>
                    <div className= {styles.order_form}>
                        <Profile />
                        <OrderForm />
                    </div>
                </div>
                <Divider />
                <CommentForm />
           </Modal>
    //    </Store> 
    )
}