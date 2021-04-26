import { Button, Label, TextArea, Icon, Input, Dropdown, Divider } from 'semantic-ui-react'
import { GlobalState } from '../../../context/globalState'
import styles from './style/order_form.module.css'
import {useState, memo} from 'react'
import {AddToCart} from '../../cart/cartAction'


const OrderForm = memo(({props}) => {

  const {UI, user, cart} = GlobalState()
  const [form, setForm] = useState({quantity: '', options: {}})
  const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
  const [showDescription, setShowDescription]= useState(false)
  const toggleDescription = () => setShowDescription(!showDescription)
  const getOptions = (e, {value}) => setForm({...form, options: { ...form.options, [e.target.name]: value} })
  const [loading, setLoading] = useState(false)

  const handleAddToCart = () => {
      setLoading(true)
      AddToCart( cart, {data: form, id: props._id})
      setLoading(false)
  }


    return (
        <div className= {styles.order_form}>
            <h1>{props.title}</h1>
            <Label tag color= 'grey' style= {{ marginBottom: '10px',  width: 'fit-content' }} >
              ${props?.details?.price}
           </Label>
           <div className= {styles.order_form_description}>
                <h4> {`${showDescription ? 'Hide' : 'Show'} Description`}</h4>
                   <Icon
                        name= {showDescription ? 'angle up' : 'angle down'}
                        link
                        circular
                        onClick= {toggleDescription}
                        color= 'teal'
                    /> 
           </div>
           { showDescription && <p> {props?.details?.description}</p>}
                <Divider />
                <div className= {styles.order_form_options}>
                    <span>
                        <label htmlFor="quantity">quantity</label>
                        <Input
                            name= 'quantity'
                            transparent= {UI.dark ? true : false}
                            style= {{outline: 'none',  backgroundColor: UI.dark && UI.body, color: UI.color, padding: UI.dark && '10px', borderRadius: UI.dark && '3px' }}
                            inverted= {UI.dark ? true : false}
                            min= '1'
                            type= 'number'
                            id= 'quantity'
                            placeholder= '1'
                            value= {form.quantity || ''}
                            onChange= {getForm}
                        />
                    </span>
                    <span>
                        <label htmlFor="color">color</label>
                        <Dropdown
                            fluid
                            onChange= {getOptions}
                            value= {form.options.color || ''}
                            style= {{ backgroundColor: UI.dark && UI.body, color: UI.color }}
                            name= 'color'
                            options= {[]}
                            id= 'color'
                            placeholder= 'color'
                            selection
                        />
                    </span>
                    <span>
                        <label htmlFor="size">size</label>
                        <Dropdown
                            fluid
                            options= {[]}
                            onChange= {getOptions}
                            style= {{ backgroundColor: UI.dark && UI.body, color: UI.color }}
                            value= {form.options.size || ''}
                            name= 'size'
                            id= 'size'
                            placeholder= 'size'
                            selection
                        />
                    </span>
                </div>
                    <TextArea 
                        placeholder= 'Add note...'
                        name= 'note'
                        style= {{ backgroundColor: UI.dark && UI.body, color: UI.color, border: !UI.dark && UI.border }}
                        value= {form?.options?.note}
                        onChange= {getForm}
                />
            <Button
              icon= {{ name: 'cart' }}
              content= {`Add to cart`}
              color= 'teal'
              size= 'small'
              disabled= {props?.hidden}
              loading= {loading}
              onClick= {handleAddToCart}
              basic= {UI.dark ? true : false}
              style= {{ borderRadius: '0', width: 'fit-content'}}
          />
        </div>
    )
})

export default OrderForm