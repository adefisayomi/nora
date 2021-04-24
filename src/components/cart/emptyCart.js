import styles from './style/empty_cart.module.css'
import {Icon} from 'semantic-ui-react'


export default function EmptyCart () {

    
    return (
        <div className= {styles.empty_cart}>
            <Icon
                name= 'opencart'
                color= 'teal'
                circular
                size= 'large'
            />
            <p>Your cart is completely Empty.</p>
        </div>
    )
}