import { useRouter } from 'next/router'
import { Button, Divider, Dropdown, Input, Label } from 'semantic-ui-react'
import useSWR from 'swr'
import { GlobalState } from '../../context/globalState'
import Modal from '../re-usables/modal'
import styles from './style/view.module.css'
import Loader from '../re-usables/loader'
import Redirect from '../re-usables/redirect'
import DetailsForm from './details_form'
import Slider from '../slider/slider'


const View = () => {

    const router = useRouter()
    const {UI} = GlobalState()
    // 
    const {data: product} = useSWR(`/products/product/${router.query.id}`)

    return(
        <Modal width= '650px'>
            <div className= {styles.view} style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
                {product && product._id ?
                    <>
                    <span className= {styles.view_gallery}> <Slider images= {product.details.images} /> </span>
                    <span className= {styles.view_details}> <DetailsForm product= {product} /> </span>
                    </>:
                product === undefined ? 
                <Loader title= 'Loading Product' /> :
                <Redirect back />
                }
            </div>
        </Modal>
    )
}

export default View