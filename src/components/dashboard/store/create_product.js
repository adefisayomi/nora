import Store from "./index";
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Form, Input, Button, Dropdown, Divider, Icon } from 'semantic-ui-react'
import { GlobalState } from '../../../context/globalState'
import UploadImage from '../../re-usables/upload_image'
import {getMultipleImages, uploadImage} from '../../../utils/getImage'
import axios from 'axios'
import Modal from '../../re-usables/modal'
import styles from './style/create_product.module.css'
import { trigger } from "swr";

export default function Create () {

    const {UI, user, setGlobalAlert, business} = GlobalState()
    const router = useRouter()
    const [form, setForm] = useState({images: []})
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const getBusinessID = (e, {value}) => setForm({...form, business_id: value})
    const [loading, setLoading] = useState(false)
    const goBack = () => router.back()
    const businessList = business ? business.map(bis => {
        return ({ key: bis._id , text: bis.business_name, value: bis._id })
    }) : []
    // 
    const [images, setImages] = useState([])
    const [imageUpload, setImageUpload] = useState(false)
    const getImage = (e) => {
        const img = getMultipleImages(e)
        if(img.message.length > 5){
            return setGlobalAlert({message: 'You cannot upload more than five (5) images at once.'})
        } 
        setImages([...images, ...img.message])
    }
    const deleteImage = (e) => setImages(images.filter(img => img.preview !== e.target.id))
    //
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try{
            if(!user) throw new Error('No user.')
            // upload image and await response
            if(!imageUpload) {
               const files = images.map(img => img.file)
               const data = await uploadImage(files, user)
               if(data.success && data.data.length == files.length) {
                   setForm({...form, images: form.images.push(...data.data)})
                   setImageUpload(true)
               } 
               else throw new Error(data.message)
            }
            const res = await axios.post(`/products/${user._id}`, form)
            trigger(`/products/${user._id}`)
            if(res.data.success) {
                setForm({})
                return goBack()
            }
            else {
                setLoading(false)
                return setImageUpload(true)
            }
        }
        catch(err) {
            setGlobalAlert({message: err.message})
            return setLoading(false)
        }
    }

    return(
       <Store>
           <Modal >
            <div className= {styles.create}>
                <UploadImage onChange= {getImage} onDelete= {deleteImage} images= {images} />
                <Form>
                    <h1>Product details</h1>
                    <Divider />
                        <Form.Group widths= 'equal'>
                            <Form.Field>
                                <label style= {{ color: UI.color }}>Business</label>
                                <Dropdown
                                    placeholder= 'Business'
                                    name= 'business_id'
                                    type= 'text'
                                    selection
                                    search
                                    options= {businessList}
                                    value= {form.business_id || ''}
                                    onChange= {getBusinessID}
                                />
                                </Form.Field>
                                <Form.Field>
                                <label style= {{ color: UI.color }}>Product Name</label>
                                <Input
                                    placeholder= 'Product title'
                                    name= 'title'
                                    type= 'text'
                                    value= {form.title || ''}
                                    onChange= {getForm}
                                />
                            </Form.Field> 
                        </Form.Group>
                        <Form.Group widths= 'equal'>
                            <Form.Field>
                                <label style= {{ color: UI.color }}>Price</label>
                                <Input
                                    placeholder= 'Price'
                                    name= 'price'
                                    type= 'number'
                                    value= {form.price || ''}
                                    onChange= {getForm}
                                />
                                </Form.Field>
                                <Form.Field>
                                <label style= {{ color: UI.color }}>Commission</label>
                                <Input
                                    placeholder= '5%'
                                    name= 'commission'
                                    min= '5'
                                    max= '100'
                                    type= 'number'
                                    value= {form.commission || ''}
                                    onChange= {getForm}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style= {{ color: UI.color }}>Quantity</label>
                                <Input
                                    placeholder= '10'
                                    name= 'quantity'
                                    min= '1'
                                    max= '100000'
                                    type= 'number'
                                    value= {form.quantity || ''}
                                    onChange= {getForm}
                                />
                            </Form.Field> 
                        </Form.Group>
                        <Form.Field>
                            <label style= {{ color: UI.color }} htmlFor="description">Product Description</label>
                            <Form.TextArea 
                            placeholder= 'Product Description...'
                            name= 'description'
                            value= {form.description || ''}
                            onChange= {getForm}
                        />
                        </Form.Field>
                        <Button
                            type= 'submit'
                            loading= {loading}
                            onClick= {handleSubmit}
                            content= 'create product'
                            inverted= {UI.dark ? true : false}
                            style= {{width: 'fit-content'}}
                            color= {loading ? 'black' : 'teal'} 
                        />
                </Form>
            </div>
        </Modal>
       </Store> 
    )
}