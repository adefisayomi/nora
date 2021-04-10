import styles from './style/templates.module.css'
import {Label, Header, Icon, Form, Input, Checkbox, Button} from 'semantic-ui-react'
import {useRouter} from 'next/router'
import { GlobalState } from '../../../context/globalState'
import {useState} from 'react'
import useSWR from 'swr'



export const Profile = ({author= {username: 'dolapo', business_name: 'doodles'}, details= { title: 'cooper shiort' }}) => {


const {UI} = GlobalState()
    return(
        <div className= {styles.author}>
            <Header image style= {{ margin: '0', cursor: 'pointer', color: UI.color }} >
                <Icon size= 'mini' circular= {!author.image} >
                    {author.image ?
                        <span className= {styles.author_image}>
                            <img src= {author.image} />
                        </span> :  author.username.split('')[0].toLocaleUpperCase()
                    }
                </Icon>
                <Header.Content>
                        <h4>{ author.business_name || ''}</h4>
                    <Header.Subheader style= {{ color: UI.color }}><h5>{details.title}</h5></Header.Subheader>
                </Header.Content>
            </Header>
            <Icon name= 'ellipsis horizontal' link />
            </div>
    )
}

//
export const Action = ({path}) => {

    const router = useRouter()
    const {UI} = GlobalState()

    return(
        <div className= {styles.action}>
            <span>
                <Label circular basic style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
                    <Icon
                        name= 'send'
                        style= {{ fontSize:'15px' }}
                        fitted
                        link
                    />
                    <span style= {{ paddingLeft: '10px', fontSize: '10px', fontFamily: 'Roboto' }}>23</span>
                </Label>
                <span style= {{ padding: '0 10px' }}></span>
                <Label circular basic style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
                    <Icon
                        name= 'like'
                        style= {{ fontSize:'15px' }}
                        fitted
                        link
                        color= 'red'
                    />
                    <span style= {{ paddingLeft: '8px', fontSize: '10px', fontFamily: 'Roboto' }}>23</span>
                </Label>
            </span>
            <Icon 
                name= 'cart'
                circular
                color=  {UI.dark ? 'black' : 'teal'}
                inverted= {UI.dark? true : false}
                link
                onClick= {path}
                style= {{ fontSize:'16px' }}
            />
        </div>
    )
}

//

export const OrderForm = () => {

  const {UI} = GlobalState()
  const [form, setForm] = useState({})
  const getForm = () => setForm({...form, [e.target.name]: e.target.value})
  const [loading, setLoading] = useState(false)
  const [note, setNote] = useState(true)
  const toggleNote = () => setNote(!note)

  const handleSubmit = () => {
    e.preventDefault()
    // 
  }

  return(
    <div className= {styles.order_form}>
     <Form>
          <Label tag color= 'grey' style= {{ margin: '10px 0',  width: 'fit-content' }}>
              $12, 000
          </Label>
          <Form.Field>
              <label style= {{ color: 'teal' }}>Description</label>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, tenetur! Modi obcaecati consequuntur nobis harum veritatis corrupti temporibus accusamus magnam, enim delectus ad 
              </p>
          </Form.Field>
          <Form.Group inline widths= 'equal'>
              <label style= {{ color: 'teal' }} >Quantity</label>
              <Input
                  placeholder= '1'
                  type= 'number'
                  min= '1'
              />
          </Form.Group>
          <span style= {{ padding: '5px 0' }}></span>
          <Button
              icon= {{ name: 'cart' }}
              content= 'Add to cart'
              color= 'teal'
              basic= {UI.dark ? true : false}
              style= {{ borderRadius: '0', width: 'fit-content'}}
          />
      </Form>
    </div>
  )
}


export const CommentForm = () => {

  const {UI} = GlobalState()

  return(
    <div className= {styles.comment} style= {{ backgroundColor: UI.bgColor }}>
        <img src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
        <textarea
          style= {{ color: UI.color}}
          placeholder= 'Post a Comment...'
          />
        <Icon 
            name= 'send'
            link
            inverted= {UI.dark ? true : false}
            circular
        />
    </div> 
  )
}