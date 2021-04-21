import styles from './style/cart_drop.module.css'
import Slider from '../slider/slider'
import { GlobalState } from '../../context/globalState'
import useSWR, { trigger, mutate } from 'swr'
import { Divider, Input, Icon, Placeholder } from 'semantic-ui-react'
import axios from 'axios'
import Loader from '../re-usables/loader'
import { Fragment } from 'react'

export default function CartDropDown () {

    const {UI,cart} = GlobalState()
    // 
    const handleDelete = async (id) => {
        mutate('/cart', cart.filter(cart => JSON.stringify(cart._id) !== JSON.stringify(id)), false)
        await axios.delete(`/cart/${id}`)
        mutate('/cart')
        mutate('/products')
    }

    return (
        <div className= {styles.cart_drop}>
            {cart && cart.length > 0 ? 
            cart.map((cart, index) => (
                <CartList props= {cart} key= {index} onDelete= {() => handleDelete(cart._id)} />
            )):
                <EmptyCart />
            }
        </div>
    )
}

const CartList = ({props, onDelete}) => {

    const {UI, cart} = GlobalState()
    const {data: product} = useSWR(() => props && props._id ? `/products/${props.author._id}/${props.details.product_id}` : null, {revalidateOnMount: true})

    return (
        <div className= {styles.cart_list} style= {{ borderBottom: UI.border}}>
            {
                product && product._id ?
                <Fragment>
                    <div className= {styles.cart_list_image}>
                        <Slider images= {product?.details?.images} />
                    </div>
                    <div className= {styles.cart_list_details} >
                        <span className= {styles.cart_list_message}>
                            <h4> @{product.author?.username || ''}</h4>
                            <p>{product.details.title}</p>
                        </span>
                        <span className= {styles.cart_list_quantity}>
                            <Input 
                                value= {props.details.quantity}
                                min= '1'
                                type= 'number'
                            />
                        </span>
                    </div>
                    <span className= {styles.cart_list_delete}>
                        <Icon
                            name= 'cancel'
                            color= 'red'
                            link
                            circular
                            onClick= {onDelete}
                        />
                    </span>
                </Fragment> :
                <Placeholder inverted>
                    <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                </Placeholder>
            }
        </div>
    )
}

// 
// 
export const EmptyCart = () => {

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