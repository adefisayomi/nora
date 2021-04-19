import styles from './style/edit.module.css'
import {Form, Button, Input, Icon, Checkbox, Label} from 'semantic-ui-react'
import { useState, useEffect, useCallback } from 'react'
import {GlobalState} from '../../context/globalState'
import axios from 'axios'
import { trigger } from 'swr'
import {v4 as uuid} from 'uuid'
import {socialMediaOptions, genderOptions} from '../../utils/static_files/menu'
import { get_image, uploadSingleImage } from '../../utils/getImage'
import {useRouter} from 'next/router'
import User from './'
import Modal from '../re-usables/modal'
import Redirect from '../re-usables/redirect'
import RenderPage from '../re-usables/renderPage'
import UploadProfilePicture from '../re-usables/UploadProfilePicture'


export default function EditProfile () {
    
    const {user, UI, setGlobalAlert} = GlobalState()
    const router = useRouter()
    const [form, setForm] = useState({})
    const getForm = useCallback( e => setForm({...form, [e.target.name]: e.target.value}) )
    const [loading, setLoading] = useState(false)
    const getGender = (e, {value}) => setForm({...form, gender: value})
    // 
    useEffect(() => {
        const getUser = async () => {
            if(user) {
                await setForm(RenderPage(user))
            }
        }
        getUser()
    }, [router.query.user])
    // 
    // 
    const [imageUpload, setImageUpload] = useState(true)
    const [image, setImage] = useState({file: '', preview: ''})
    const deleteImage = () => {
        setImage({file: '', preview: ''})
        setForm({...form, image: {url: '', id: ''}})
    }
    const getImage = (e) => {
        const img = get_image(e)
        setImageUpload(false)
        setImage({file: img.file, preview: img.preview})
    }

    // SOCIAL MEDIA SECTION
    const [listTitle, setListTitle] = useState({name: '', value: ''})
    const getSocialMedia = (e, {value}) => setListTitle({...listTitle, name: value})
    const checkList = form.social_media ? form.social_media.map(opt => opt.name) : []
    //
    const getList = () => {
        if(listTitle.name && listTitle.value && !checkList.includes(listTitle.name)) {
            setForm({...form, social_media: [...form.social_media, {name: listTitle.name, url: listTitle.value}]})
            setListTitle({name: '', value: ''})
        }
    }
    //
    const deleteList = (e) => setForm({...form, social_media: form.social_media.filter(opt => opt.name !== e.target.id)})
    //
    
    // 
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        //
        try{
            if(!imageUpload) {
                const data = await uploadSingleImage(image.file, user)
                if(data.success) {
                    setForm({...form, image: form.image = data.data})
                    setImage({file: '', preview: ''})
                    setImageUpload(true)
                }
                else throw new Error(data.message)
             }
            await axios.put(`/user/${user._id}`, form)
            trigger('/user')
            router.back()
            return setLoading(false)
        }
        catch(err) {
            setGlobalAlert({message: err.message})
            return setLoading(false)
        }
    }


    return (
            <User>
                <Modal>
                    {user ?
                    <div className= {styles.profile} style= {{ backgroundColor: UI.bgColor }}>
                        <header>
                            <UploadProfilePicture text= {form.username || form.first_name}
                                                  image= {{ url: form.image?.url, preview: image?.preview  }}
                                                  onDelete= {deleteImage}
                                                  onChange= {getImage} />
                        </header>
                        <Form style= {{ color: UI.color, backgroundColor: UI.bgColor }} onSubmit= {handleSubmit}>
                            <Form.Group widths= '16'>
                                <Form.Field width= '6'>
                                   <label style= {{ color: UI.color }}>First name</label>
                                    <Input
                                        placeholder= 'First name'
                                        name= 'first_name'
                                        type= 'text'
                                        value= { form.first_name ? form?.first_name : '' }
                                        onChange= {getForm}
                                    /> 
                                </Form.Field>
                                <Form.Field width= '14'>
                                    <label style= {{ color: UI.color }}>Other names</label>
                                    <Input
                                        placeholder= 'Other names'
                                        name= 'other_name'
                                        type= 'text'
                                        value= { form.other_name ? form.other_name : '' }
                                        onChange= {getForm}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <label style= {{ color: UI.color }}>Username</label>
                                <Input
                                    placeholder= 'Username'
                                    name= 'username'
                                    type= 'text'
                                    value= {form?.username || ''}
                                    onChange= {getForm}
                                />
                            </Form.Field>
                            <Form.Group widths= 'equal'>
                                <Form.Field>
                                    <label style= {{ color: UI.color }}>Phone</label>
                                    <Form.Input
                                        placeholder= 'Phone number'
                                        name= 'phone'
                                        type= 'text'
                                        value= {form.phone || ''}
                                        onChange= {getForm}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label style= {{ color: UI.color }}>Gender</label>
                                    <Form.Dropdown
                                    selection
                                    name= 'gender'
                                    placeholder= 'Male'
                                    options= {genderOptions}
                                    value= {form.gender || ''}
                                    onChange= {getGender}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                            <label style= {{ color: UI.color }}>Email</label>
                            <Input
                                placeholder= 'Email'
                                name= 'email'
                                type= 'text'
                                value= {form.email || ''}
                                onChange= {getForm}
                            />
                            </Form.Field>
                            <span className= {styles.profile_social_media}>
                                <Form.Field>
                                    <label style= {{ color: UI.color }}>Social media accounts</label>
                                    <Form.Group widths= 'equal'>
                                        <Form.Dropdown
                                            fluid
                                            selection
                                            placeholder= 'Facebook'
                                            options= {socialMediaOptions}
                                            value= {listTitle.name || ''}
                                            onChange= {getSocialMedia}
                                        />
                                        <Form.Input
                                            placeholder= 'URL'
                                            value= {listTitle.value || ''}
                                            onChange= {(e) => setListTitle({...listTitle, value: e.target.value})}
                                            icon= {{ inverted: true, name: 'plus', link: true, circular: true, onClick: getList }}
                                        />
                                    </Form.Group>
                                </Form.Field>
                                { form?.social_media && <ul>
                                        {form.social_media.map(social => (
                                            <li key= {uuid()}>
                                                <Icon name= {social.name}  size= 'large' />
                                                <a href= {social.url} target= '_blank'>{social.url}</a>
                                                <Icon
                                                    inverted
                                                    name= 'cancel'
                                                    color= 'red'
                                                    link
                                                    id= {social.name}
                                                    onClick= {deleteList}
                                                    circular size= 'small'
                                                />
                                            </li>
                                        ))}
                                    </ul> }
                            </span>
                            <Form.Field>
                            <label style= {{ color: UI.color }}>Address</label>
                            <Input
                                placeholder= 'Office Adress...'
                                name= 'address'
                                type= 'text'
                                value= {form.address || ''}
                                onChange= {getForm}
                            />
                            </Form.Field>
                            <div style= {{marginBottom: '10px'}}></div>
                                    <Button
                                        type= 'submit'
                                        content= 'Update'
                                        style= {{ width: '200px', borderRadius: '0' }}
                                        color= 'teal'
                                        inverted= {UI.dark ? true : false}
                                        loading= {loading}
                                    />
                        </Form>
                    </div>
                    : <Redirect back /> }
                </Modal>
            </User>
    )
}
