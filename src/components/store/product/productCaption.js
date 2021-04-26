import { Fragment, memo } from "react";
import { GlobalState } from "../../../context/globalState";
import styles from './style/product_caption.module.css'


const ProductCaption = memo(({product}) => {

    const {user, UI} = GlobalState()

    return (
        <Fragment>
        {product &&
            <div className= {styles.caption}>
                <span className= {styles.caption_user}>
                    <h1>{product.author.username}</h1>
                    <p>{product.details?.description && product.details?.description.length > 80 ? product.details?.description.slice(0, 80) + '...Read more' : product.details?.description || '' }</p>
                </span>
            </div>}
        </Fragment>
    )
})

export default ProductCaption