import { Divider } from 'semantic-ui-react'
import Slider from '../../slider/slider'
import { GlobalState } from '../../../context/globalState'
import styles from './style/product.module.css'
import { Profile, Action, CommentForm } from './templates'
import {useState} from 'react'
import Order from './order_product'
import {Label} from 'semantic-ui-react'
import axios from 'axios'
import { mutate, trigger } from 'swr'

export default function Product ({props}) {

    const {UI, user, products} = GlobalState()
    const [showProd, setShowProd] = useState(false)
    const [showCommentForm, setShowCommentForm] = useState(false)
    const openShowProd = () => setShowProd(true)
    const closeShowProd = () => setShowProd(false)
    const handleLike = async () => {
        if(user) {
            await axios.post(`/like/${props._id}`)
            mutate('/products')
        }
    }
    
    return(
        <>
        <div className= {styles.product} style= {{ border: !UI.dark && UI.border, backgroundColor: UI.bgColor }}>
            <Profile id= {props.author._id} title= {props.details.title} />
            <Divider />
            <div className= {styles.product_images}>
            {props.hidden && <Label as='a' color='grey' ribbon>
                Out of stock
            </Label>}
                <Slider images= {props.details.images} />
            </div>
            <Divider />
            <Action meta= {props.meta} onClick= {{cart: openShowProd, like: handleLike, comment: () => setShowCommentForm(!showCommentForm) }} />
            {user && showCommentForm && <>
                <Divider />
                <CommentForm id= {props._id} randomClick= {() => setShowProd(true)} />
                <Divider />
            </>}
        </div>
        { showProd && <Order close= {closeShowProd} product= {props} />}
        </>
    )
}