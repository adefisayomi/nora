import { Divider } from 'semantic-ui-react'
import Slider from '../../slider/slider'
import { GlobalState } from '../../../context/globalState'
import styles from './style/product.module.css'
import { Profile, Action } from './templates'
import {useState} from 'react'
import Order from './order_product'

export default function Product ({props}) {

    const {UI} = GlobalState()
    const [showProd, setShowProd] = useState(false)
    const openShowProd = () => setShowProd(true)
    const closeShowProd = () => setShowProd(false)

    return(
        <>
        <div className= {styles.product} style= {{ border: UI.border, backgroundColor: UI.bgColor }}>
            <Profile id= {props.author._id} title= {props.details.title} />
            <Divider />
            <div className= {styles.product_images}>
                <Slider images= {props.details.images} />
            </div>
            <Divider />
            <Action onClick= {{cart: openShowProd }} />
        </div>
        { showProd && <Order close= {closeShowProd} product= {props} />}
        </>
    )
}