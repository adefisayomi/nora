import { Divider } from 'semantic-ui-react'
import Slider from '../../slider/slider'
import { GlobalState } from '../../../context/globalState'
import styles from './style/product.module.css'
import Action from './action'
import {useState, memo} from 'react'
import Order from './order'
import {Label} from 'semantic-ui-react'
import CommentForm from '../../comments/commentForm'
import ProductHeader from './productHeader'

const Product = memo(({product}) => {

    const {UI, user} = GlobalState()
    const [order, setOrder] = useState(false)
    const [comment, setComment] = useState(false)
    const toggleComment = () => setComment(!comment)
    const redirect = () => setOrder(true)
    const placeOrder = () => setOrder(true)
    const closeOrder = () => setOrder(false)
   
    
    return(
        <>
        <div className= {styles.product} style= {{ border: !UI.dark && UI.border, backgroundColor: UI.bgColor }}>
            <ProductHeader id= {product.author._id} title= {product.details.title} />
            <Divider />
            <div className= {styles.product_images}>
            {product.hidden && <Label as='a' color='grey' ribbon>
                Out of stock
            </Label>}
                <Slider images= {product.details.images} />
            </div>
            <Divider fitted />
            <Action product_id= {product._id} onClick= {{cart: placeOrder, comment: toggleComment}} />
            {user && comment && <>
                <Divider fitted />
                <CommentForm product_id= {product._id} onRedirect= {redirect} />
            </>}
        </div>
        { order && <Order close= {closeOrder} product= {product} />}
        </>
    )
})

export default Product