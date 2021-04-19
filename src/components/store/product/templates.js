import styles from './style/templates.module.css'
import {Label, Header, Icon, Form, Input, Placeholder, Button, Comment} from 'semantic-ui-react'
import {useRouter} from 'next/router'
import { GlobalState } from '../../../context/globalState'
import {useEffect, useState} from 'react'
import ProfileTab from '../../re-usables/profileTab'
import axios from 'axios'
import useSWR, { trigger } from 'swr'
import moment from 'moment'



export const Profile = ({id, title}) => {

    const {UI} = GlobalState()
    const [loading, setLoading] = useState(true)
    const [author, setAuthor] = useState('')
    const getAuthor = async () => {
       const res = await axios.get(`/user/${id}`)
       if(res && res.data) {
           setLoading(false)
           setAuthor(res.data.data)
       }
       else setLoading(true)
    }
     
    useEffect(() => {
        getAuthor()
    }, [id])

    
    return(
        <div className= {styles.author}>
            { !loading && author && author._id ? 
            <span>
                <Header image style= {{ margin: '0', cursor: 'pointer', color: UI.color }} >
                <Icon size= 'mini' circular= {!author.image?.url} >
                    {author.image?.url ?
                        <span className= {styles.author_image}>
                            <img src= {author.image.url} />
                        </span> :  (author?.username || author?.first_name).split('')[0].toLocaleUpperCase()
                    }
                </Icon>
                <Header.Content>
                        <h4>@{ author.username || author?.first_name}</h4>
                    <Header.Subheader style= {{ color: UI.color }}><h5>{title || '' }</h5></Header.Subheader>
                </Header.Content> 
            </Header>
            </span>
            :
            <span>
                <Placeholder inverted= {UI.dark ? true : false} >
                 <Placeholder.Header image >
                 <Placeholder.Line />
                 <Placeholder.Line />
                 </Placeholder.Header>
               </Placeholder>
            </span>
            }
            <Icon name= 'ellipsis horizontal' link />
            </div>
    )
}

//
export const Action = ({onClick, meta}) => {

    const router = useRouter()
    const {UI} = GlobalState()

    return(
        <div className= {styles.action}>
            <span>
                <Label circular basic style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
                    <Icon
                        name= 'send'
                        style= {{ fontSize:'16px' }}
                        fitted
                        link
                        onClick= {onClick?.message}
                    />
                    <span style= {{ paddingLeft: '10px', fontSize: '10px', fontFamily: 'Roboto' }}>23</span>
                </Label>
                <span style= {{ padding: '0 10px' }}></span>
                <Label circular basic style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
                    <Icon
                        name= 'like'
                        style= {{ fontSize:'16px' }}
                        fitted
                        link
                        onClick= {onClick?.like}
                        color= 'red'
                    />
                    <span style= {{ paddingLeft: '8px', fontSize: '10px', fontFamily: 'Roboto' }}>{meta.likes.length}</span>
                </Label>
            </span>
            <Icon 
                name= 'cart'
                circular
                color=  {UI.dark ? 'black' : 'teal'}
                inverted= {UI.dark? true : false}
                link
                onClick= {onClick?.cart}
                style= {{ fontSize:'16px' }}
            />
        </div>
    )
}

//

export const OrderForm = ({props}) => {

  const {UI} = GlobalState()
  const [form, setForm] = useState({description: props.description, price: props.price})
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
              ${form.price}
          </Label>
          <Form.Field>
              <label style= {{ color: 'teal' }}>Description</label>
              <p>{form.description}</p>
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


export const CommentForm = ({id}) => {

    const {UI,user} = GlobalState()
    const [form, setForm] = useState({comment: ''})
    const resetForm = () => setForm({comment: ''})
    const [loading, setLoading] = useState(false)
    const getForm = (e) => setForm({comment: e.target.value})
    // 
    const handleComment = async () => {
        if(user) {
            setLoading(true)
            await axios.post(`/comment/${id}`, form)
            resetForm()
            trigger('/products')
            setLoading(false)
        }
    }

  return(
    <div className= {styles.comment} style= {{ backgroundColor: UI.bgColor }}>
        <ProfileTab width= '30px' />
        <textarea
          name= 'comment'
          onChange= {getForm}
          value= {form.comment}
          placeholder= 'Post a Comment...'
          />
        <Icon 
            name= 'send'
            link
            loading= {loading}
            color= 'teal'
            inverted= {UI.dark ? true : false}
            onClick= {handleComment}
            circular
        />
    </div> 
  )
}

export const Comments = ({comment, product_id}) => {

    const {UI, user} = GlobalState()
    const {data} = useSWR(`/user/${comment.body._id}`)
    // 
    const handleDelete = async () => {
        if (user) {
            await axios.delete(`/comment/${user._id}/${product_id}/${comment._id}`)
            trigger('/products')
        }
    }

    return (
        <div className= {styles.comments} style= {{ color: UI.color }}>
            {data && <Comment.Group threaded >
            <Comment>
                <Comment.Avatar as='a' src= {data.image.url || 'https://st3.depositphotos.com/6672868/14376/v/600/depositphotos_143767633-stock-illustration-user-profile-group.jpg'}   />
                <Comment.Content>
                    <Comment.Author as='a' style= {{ color: UI.color }}>{data.username || data.first_name}</Comment.Author>
                    <Comment.Metadata>
                    <span style= {{ color: 'teal', fontFamily: 'Roboto', fontSize: '10px'  }}>{moment().startOf('hour').fromNow(comment.date)}</span>
                    </Comment.Metadata>
                    <Comment.Text style= {{ color: UI.color }}>{comment.body?.comment}</Comment.Text>
                    <Comment.Actions>
                    <a style= {{ color: 'teal' }}>Reply</a>
                    { user && user._id == comment.body._id && <>
                        <a style= {{ color: 'grey' }}>Edit</a> 
                        <a onClick= {handleDelete} style= {{ color: 'grey' }}>Delete</a>
                        </>
                    }
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
            </Comment.Group>}
        </div>
    )
}