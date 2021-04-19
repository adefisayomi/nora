import { useRouter } from 'next/router'
import { Button, Divider, Form, Label } from 'semantic-ui-react'
import useSWR from 'swr'
import { GlobalState } from '../../context/globalState'
import { ImageGallery } from '../re-usables/gallery'
import Modal from '../re-usables/modal'
import styles from './style/view.module.css'
import Loader from '../re-usables/loader'
import Redirect from '../re-usables/redirect'


export default function View () {

    const router = useRouter()
    const {UI} = GlobalState()
    // 
    const {data: product, error} = useSWR(`/products/${router.query.user}/${router.query.id}`)
   
    return(
        <Modal>
            <div className= {styles.view} style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
                {product && product._id ? 
                <div className= {styles.view}>
                    <Label tag style= {{ width: 'fit-content', padding: '5px 20px', marginBottom: '10px' }}>
                         <p style= {{color: 'black', fontSize: '12px', fontFamily: 'Roboto'}}>${product.details.price}</p>
                    </Label>
                    <ImageGallery images= {product.details.images} />
                    <Divider />
                    <Form>
                        <Form.Field>
                            <label htmlFor="" style= {{color: 'teal'}}>Product name</label>
                            <p>{product.details.title}</p>
                        </Form.Field>
                        <Form.Field>
                            <label style= {{color: 'teal'}}>Description</label>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quaerat similique possimus libero quibusdam impedit alias commodi perferendis omnis error.</p>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="" style= {{color: 'teal'}}>Commission</label>
                            <p>{product.details.commission}%</p>
                        </Form.Field>
                    </Form>
                    <Divider />
                    <span className= {styles.view_action_button}>
                      <Button 
                        content= 'Add to Cart'
                        inverted= {UI.dark ? true : false}
                        color= 'teal'
                      />
                       <Button 
                        content= 'Sell this Product'
                        inverted= {UI.dark ? true : false}
                        color= 'black'
                      />
                    </span>
                </div> :
                   error ?
                     <Redirect back /> :
                   <Loader title= 'Loading Product' />
                }
            </div>
        </Modal>
    )
}