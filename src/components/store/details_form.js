import { memo, useState } from "react";
import { GlobalState } from "../../context/globalState";
import styles from './style/details_form.module.css'
import {Dropdown, Input, Button} from 'semantic-ui-react'
import ProductHeader from "./product/productHeader";
import {AddToCart} from '../cart/cartAction'


const DetailsForm = memo(({product}) => {

    const {UI, user, cart} = GlobalState()
    const [form, setForm] = useState({quantity: '', options: {}})
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const getOptions = (e, {value}) => setForm({...form, options: { ...form.options, [e.target.name]: value} })
    const [loading, setLoading] = useState(false)

    const handleAddToCart = () => {
        setLoading(true)
        AddToCart( cart, {data: form, id: product._id})
        setLoading(false)
    }

    const requestAffilaition = () => {}

    return (
        <div className= {styles.details_form}>
            <ul>
                <li style= {{ borderTop: !UI.dark && UI.border }}>
                    <ProductHeader title= {product.details.title} id= {product.author._id} />
                </li>
                <li className= {styles.details_form_details} style= {{ alignItems: 'flex-start', borderTop: !UI.dark && UI.border }}>
                     <h2>Price : <span style= {{ color: UI.color, fontSize: '14px' }}>${product.details.price}</span></h2>
                </li>
                <li className= {styles.details_form_details} style= {{ alignItems: 'flex-start', borderTop: !UI.dark && UI.border }}>
                    <h2>Commission : <span style= {{ color: UI.color, fontSize: '14px' }}>{product.details.commission}%</span></h2>
                    <h2>Available quantity : <span style= {{ color: UI.color, fontSize: '14px' }}>{product.details.quantity}</span></h2>
                </li>
                <li className= {styles.details_form_details} style= {{ flexDirection: 'column', alignItems: 'flex-start', borderTop: !UI.dark && UI.border }}>
                    <h2>Description</h2>
                    <p>{product.details.description}</p>
                </li>
                <li className= {styles.details_form_options} style= {{ borderTop: !UI.dark && UI.border }}>
                    <span>
                        <label htmlFor="quantity">quantity</label>
                        <Input
                            name= 'quantity'
                            min= '1'
                            transparent= {UI.dark ? true : false}
                            style= {{ backgroundColor: UI.dark && UI.body, color: UI.color, padding: UI.dark && '10px', borderRadius: UI.dark && '3px' }}
                            type= 'number'
                            inverted= {UI.dark ? true : false}
                            onChange= {getForm}
                            value= {form.quantity || ''}
                            id= 'quantity'
                            placeholder= '1'
                        />
                    </span>
                    <span>
                        <label htmlFor="color">color</label>
                        <Dropdown
                            fluid
                            name= 'color'
                            style= {{ backgroundColor: UI.dark && UI.body, color: UI.color }}
                            options= {[]}
                            onChange= {getOptions}
                            value= {form.options.color || ''}
                            id= 'color'
                            selection
                            placeholder= 'color'
                        />
                    </span>
                    <span>
                        <label htmlFor="size">size</label>
                        <Dropdown
                            fluid
                            style= {{ backgroundColor: UI.dark && UI.body, color: UI.color }}
                            options= {[]}
                            onChange= {getOptions}
                            value= {form.options.size || ''}
                            id= 'size'
                            placeholder= 'size'
                            selection
                        />
                    </span>
                </li>
                <li style= {{ justifyContent: 'space-between', borderTop: !UI.dark && UI.border }}>
                    <Button 
                        content= 'Add to cart'
                        size= 'small'
                        inverted= {UI.dark ? true : false}
                        style= {{ borderRadius: '0' }}
                        color= 'teal'
                    />
                    <Button 
                        floated= 'right'
                        content= 'Sell product'
                        size= 'small'
                        style= {{ borderRadius: '0' }}
                        inverted= {UI.dark ? true : false}
                        color= 'black'
                    />
                </li>
            </ul>
        </div> 
    )
})

export default DetailsForm