import Business from './business'
import {GlobalState} from '../../../context/globalState'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'
import {businessCategory} from '../../../utils/static_files/menu'
import {uploadSingleImage, get_image} from '../../../utils/getImage'
import { Button, Form, Input, TextArea, Dropdown } from 'semantic-ui-react'
import styles from './style/create_business.module.css'
import axios from 'axios'
import {trigger} from 'swr'
import UploadProfilePicture from '../../re-usables/UploadProfilePicture'
import Modal from '../../re-usables/modal'


export default function Create () {

  const {UI, user, setGlobalAlert} = GlobalState()
  const router = useRouter()
  const [form, setForm] = useState({logo: {url: '', id: ''}, business_name: '', account_bank: '', account_number: '', category: '' })
  const resetForm = () => setForm({logo: {url: '', id: ''}, business_name: '', account_bank: '', account_number: '', category: '' })
  const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
  const getCategory = (e, {value}) => setForm({...form, category: value})
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)

  // 
  const [banks, setBanks] = useState([])
  const getBank = (e, {value}) => setForm({...form, account_bank: value})
  useEffect(() => {
    const getBank = async () => {
      const res = await axios.get('/business/banks')
      return  setBanks(res.data.data)
    }
    getBank()
  }, [])
  // 
  const [imageUpload, setImageUpload] = useState(true)
  const [image, setImage] = useState({file: '', preview: ''})
  const deleteImage = () => {
    setForm({...form, logo: {url: '', id: ''}})
    setImage({file: '', preview: ''})
  }
    const getImage = (e) => {
        const img = get_image(e)
        setImageUpload(false)
        setImage({file: img.file, preview: img.preview})
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      //
      try{
          if(!imageUpload) {
              const data = await uploadSingleImage(image.file, user)
              if(data.success) {
                  setForm({...form, logo: form.logo = data.data})
                  setImage({file: '', preview: ''})
                  setImageUpload(true)
              }
              else throw new Error(data.message)
           }
          const res = await axios.post(`/business`, form)
          if(!res.data.success) throw new Error(res.data.message)
          setRedirect(true)
          trigger(`/business/${user._id}`)
          router.back()
          resetForm()
      }
      catch(err) {
          setGlobalAlert({message: err.message})
          return setLoading(false)
      }
  }


    return (
        <Business>
      <Modal maxWidth= '550px' loading= {redirect} content= 'Redirecting...'>
        <div className= {styles.create_business} style= {{ backgroundColor: UI.bgColor, color: UI.color}}>
          <Form>
          <header style= {{color: UI.color}}>
              <UploadProfilePicture
                image= {{ preview: image.preview }}
                onChange= {getImage}
                onDelete= {deleteImage}
              />
            </header>
            <Form.Field>
              <label style= {{color: UI.color}} htmlFor="business_name">Business Name</label>
              <Input
                placeholder= 'Business name'
                name= 'business_name'
                value= {form.business_name || ''}
                onChange= {getForm}
              />
            </Form.Field>
            <Form.Field>
              <label style= {{color: UI.color}} htmlFor="account_bank">Bank</label>
              <Dropdown
                options= {banks}
                selection
                search
                placeholder= 'Bank'
                name= 'account_bank'
                value= {form.account_bank || ''}
                onChange= {getBank}
              />
            </Form.Field>
            <Form.Field>
              <label style= {{color: UI.color}} htmlFor="account_number">Account number</label>
              <Input
                type= 'number'
                placeholder= 'Account number'
                name= 'account_number'
                value= {form.account_number || ''}
                onChange= {getForm}
              />
            </Form.Field>
            <Form.Field>
              <label style= {{color: UI.color}} htmlFor="account_number">Category</label>
              <Dropdown
                type= 'text'
                placeholder= 'Business category'
                name= 'category'
                options= {businessCategory}
                onChange= {getCategory}
                value= {form.category || ''}
                selection
                search
              />
            </Form.Field>
            <Form.Field>
              <label style= {{color: UI.color}} htmlFor="description">Description</label>
              <TextArea
                placeholder= 'Business Description'
                name= 'description'
                value= {form.description || ''}
                onChange= {getForm}
              />
            </Form.Field>
            <Button
              content= 'Create Business'
              color= 'teal'
              style= {{ borderRadius: '0' }}
              inverted= {UI.dark ? true : false}
              onClick= {handleSubmit}
              loading= {loading}
            />
          </Form>
        </div>
      </Modal>
    </Business>
    )
} 