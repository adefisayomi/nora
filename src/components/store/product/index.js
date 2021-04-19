import { Divider } from 'semantic-ui-react'
import Slider from '../../slider/slider'
import { GlobalState } from '../../../context/globalState'
import styles from './style/product.module.css'
import { Profile, Action } from './templates'
import {useState} from 'react'
import Order from './order_product'
import axios from 'axios'
import { trigger } from 'swr'

export default function Product ({props}) {

    const {UI, user} = GlobalState()
    const [showProd, setShowProd] = useState(false)
    const openShowProd = () => setShowProd(true)
    const closeShowProd = () => setShowProd(false)
    const handleLike = async () => {
        if(user) {
            await axios.post(`/like/${props._id}`)
            trigger('/products')
        }
    }
    
    return(
        <>
        <div className= {styles.product} style= {{ border: UI.border, backgroundColor: UI.bgColor }}>
            <Profile id= {props.author._id} title= {props.details.title} />
            <Divider />
            <div className= {styles.product_images}>
                <Slider images= {props.details.images} />
            </div>
            <Divider />
            <Action meta= {props.meta} onClick= {{cart: openShowProd, like: handleLike }} />
        </div>
        { showProd && <Order close= {closeShowProd} product= {props} />}
        </>
    )
}