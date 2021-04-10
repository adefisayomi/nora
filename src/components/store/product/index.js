import { Divider } from 'semantic-ui-react'
import Slider from '../../slider/slider'
import { GlobalState } from '../../../context/globalState'
import styles from './style/product.module.css'
import { Profile, Action } from './templates'

export default function Product () {

    const {UI} = GlobalState()

    return(
        <div className= {styles.product} style= {{ border: UI.border, backgroundColor: UI.bgColor }}>
            <Profile />
            <Divider />
            <div className= {styles.product_images}>
                <Slider />
            </div>
            <Divider />
            <Action />
        </div>
    )
}