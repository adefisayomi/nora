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


export default function EditProfile () {
    
    const {user, UI, setGlobalAlert} = GlobalState()
    const router = useRouter()
    const [form, setForm] = useState({
        social_media: [],
        username: '',
        name: '',
        image: {},
        email: '',
        phone: '',
        address: '',
        gender: '',
    })
    const resetForm = () => setForm({
        social_media: [],
        username: '',
        name: '',
        image: {},
        email: '',
        phone: '',
        address: '',
        gender: '',
    })
    const getForm = useCallback((e) => {
       return setForm({...form, [e.target.name]: e.target.value})
    } )
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(true)
    const togglePass = () => setShowPass(!showPass)
    const toggleTwoStepVerfication = () => {
        setForm({...form, two_step_verification: !form.two_step_verification})
    } 
    const getGender = (e, {value}) => setForm({...form, gender: value})
    // 
    const [imageUpload, setImageUpload] = useState(true)
    const [image, setImage] = useState({file: '', preview: ''})
    const getImage = (e) => {
        const img = get_image(e)
        setImageUpload(false)
        setImage({file: img.file, preview: img.preview})
    }

    // 
    useEffect(() => {
        const getUserData = () => {
           if(user) {
            setForm({...form,
                username: user.username,
                name: `${user.first_name} ${user.other_name.join(' ')}`,
                email: user.email,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
                image: user.image,
                social_media: user.social_media,
                date_of_birth: user.date_of_birth
            })
          } 
        }
        getUserData()
    }, [user])

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
            await axios.put('/user', form)
            trigger('/user')
            resetForm()
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
                    <div className= {styles.profile} style= {{ backgroundColor: UI.bgColor }}>
                        <header>
                        <div className= {styles.profile_picture}>
                            {image.preview || form.image?.url ? 
                                <span className= {styles.profile_picture_image}> <img src= {image.preview || form.image?.url} alt= 'profile-picture' /> </span> :
                                <span> <h1>{(form.username || form.name)[0]}</h1> </span>
                            }
                        </div>
                        <label htmlFor="profile_picture" className= {styles.profile_label}>
                        <input type="file" name="profile_picture" id="profile_picture" onChange= {getImage}/>
                            <Icon
                                name= 'camera'
                                circular
                                inverted
                                link
                                onChange= {getImage}
                            />
                        </label>
                        </header>
                        <Form style= {{ color: UI.color, backgroundColor: UI.bgColor }} onSubmit= {handleSubmit}>
                        <Form.Field>
                        <label style= {{ color: UI.color }}>Name</label>
                        <Input
                            placeholder= 'Name'
                            name= 'name'
                            type= 'text'
                            value= {form?.name || ''}
                            onChange= {getForm}
                        />
                    </Form.Field>

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
                        {/* <Form.Field>
                            <label style= {{ color: UI.color }}>Two step verification</label>
                            <Label style= {{ display: 'flex' }} basic>
                                <Icon name= {form.two_step_verification ? 'lock' : 'lock open'} color= 'blue' circular />
                                <span style= {{ padding: '0 5px ' }}></span>
                                <Checkbox toggle onChange= {toggleTwoStepVerfication}/>
                            </Label>
                        </Form.Field>  */}
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
                    {/* <Form.Group widths= 'equal'>
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
                        </Form.Field> */}
                        {/* <Form.Field>
                            <label style= {{ color: UI.color }}>Date of Birth</label>
                            <input
                                className= {styles.date_of_birth}
                                name= 'date_of_birth'
                                type= 'date'
                                value= {new Date(form?.date_of_birth)}
                                onChange= {getForm}
                            />
                        </Form.Field>  */}
                    {/* </Form.Group> */}
                    {/* <Form.Field>
                    <label style= {{ color: UI.color }}>Password</label>
                    <Input
                        placeholder= 'Password'
                        name= 'password'
                        type= {showPass ? 'password' : 'text'}
                        icon= {{name: showPass ? 'eye slash' : 'eye', link: true, onClick: togglePass}}
                        value= {form.password}
                        onChange= {getForm}
                    /> */}
                    {/* </Form.Field> */}
                    <div style= {{marginBottom: '10px'}}></div>
                            <Button
                                type= 'submit'
                                content= 'Update'
                                style= {{ width: '200px', borderRadius: '0' }}
                                color= 'teal'
                                loading= {loading}
                            />
                        </Form>
                    </div>
                </Modal>
            </User>
    )
}
