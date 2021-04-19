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
import { useEffect } from "react";
import useSWR from 'swr'
import RenderPage from '../../re-usables/renderPage'

export default function Create () {

    const {UI, user, setGlobalAlert, business} = GlobalState()
    const router = useRouter()
    const {data: product, error} = useSWR( () => user ? `/products/${user._id}/${router.query.id}` : null)
    const [form, setForm] = useState({images: []})
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const getBusinessID = (e, {value}) => setForm({...form, business_id: value})
    const [loading, setLoading] = useState(false)
    const goBack = () => router.back()
    const businessList = business ? business.map(bis => {
        return ({ key: bis._id , text: bis.business_name, value: bis._id })
    }) : []
    useEffect(() => {
        if(product) {
           const pageData = RenderPage(product.details)
           setImages(pageData.images)
           setForm(pageData)
        }
    }, [product])
   
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
    const deleteImage = (e) => {
        setImages(images.filter(img => {
            return (
                img.id ? img.id !== e.target.id : img.preview ? img.preview !== e.target.id : ''
            )
        }))
        setForm({...form, images: form.images.filter(img => {
            return (
                img.id ? img.id !== e.target.id : img.preview ? img.preview !== e.target.id : ''
            )
        })})
    } 
    //
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
       
        try{
            if(!user) throw new Error('No user.')
            // upload image and await response
            if(!imageUpload) {
               const filesRef = images.filter(img => img.file)
               const files = filesRef.map(img => img.file)
               if(files.length > 0) {
                   const data = await uploadImage(files, user)
                   if(data.success && data.data.length == files.length) {
                    setForm({...form, images: form.images.push(...data.data)})
                    setImageUpload(true)
                } 
                else throw new Error(data.message)
               }
            }
            const res = await axios.put(`/products/${user._id}/${product._id}`, form)
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
           <Modal loading= {product ? false : true} content= 'Loading Product...' >
            { product && <div className= {styles.create}>
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
                                    readOnly
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
                        <span>
                           <Button
                            loading= {loading}
                            onClick= {handleSubmit}
                            content= 'Update product'
                            inverted= {UI.dark ? true : false}
                            style= {{width: 'fit-content', borderRadius: '0'}}
                            color= {loading ? 'black' : 'teal'} 
                            />
                            <Button
                                onClick= {handleSubmit}
                                content= 'Delete product'
                                inverted= {UI.dark ? true : false}
                                style= {{width: 'fit-content', borderRadius: '0'}}
                                color= 'red'
                                floated= 'right'
                            /> 
                        </span>
                        
                </Form>
            </div> }
        </Modal>
       </Store> 
    )
}