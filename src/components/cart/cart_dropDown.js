import styles from './style/cart_drop.module.css'
import { GlobalState } from '../../context/globalState'
import EmptyCart from './emptyCart'
import CartList from './cartList'
import { Button } from 'semantic-ui-react'

export default function CartDropDown () {

    const {UI, cart} = GlobalState()

    return (
        <div className= {styles.cart_drop} style= {{ backgroundColor: UI.bgColor }}>
            {cart && cart.length > 0 ? 
            <>
                {cart.map((cart, index) => (
                    <CartList props= {cart} key= {index} />
                ))}
                <Button
                    style= {{ marginTop: '20px' }}
                    fluid
                    content= 'Proceed to checkout'
                    color= 'teal'
                />
            </> :
                <EmptyCart />
            }
        </div>
    )
}