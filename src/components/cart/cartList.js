import { GlobalState } from '../../context/globalState'
import styles from './style/cart_list.module.css'
import useSWR from 'swr'
import Slider from '../slider/slider'
import {RemoveFromCart} from './cartAction'
import { Input, Icon, Placeholder } from 'semantic-ui-react'
import { Fragment } from 'react'


export default function CartList ({props}) {

    const {UI, cart} = GlobalState()
    const {data: product} = useSWR(() => props && props._id ? `/products/product/${props.details.product_id}` : null, {revalidateOnMount: true})
    const handleDelete = () => {
        RemoveFromCart(cart, {id: props._id})
    }

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
                            onClick= {handleDelete}
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