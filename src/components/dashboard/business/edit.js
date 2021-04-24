import Business from './business'
import {GlobalState} from '../../../context/globalState'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'
import {businessCategory} from '../../../utils/static_files/menu'
import {uploadSingleImage, get_image} from '../../../utils/getImage'
import { Button, Form, Input, Icon, TextArea, Dropdown, Confirm } from 'semantic-ui-react'
import {trigger} from 'swr'
import styles from './style/create_business.module.css'
import axios from 'axios'
import Modal from '../../re-usables/modal'
import useSWR from 'swr'
import UploadProfilePicture from '../../re-usables/UploadProfilePicture'
import RenderPage from '../../re-usables/renderPage'
import Loader from '../../re-usables/loader'

export default function EditBusiness () {

    const router = useRouter()
    const {UI, setGlobalAlert, user, business} = GlobalState()
    // const {data: business, error} = useSWR( () => user ? `/business/${user._id}/${router.query.id}` : null)
    const {data: bankRef} = useSWR('/business/banks')
    const [form, setForm] = useState({logo: {url: '', id: ''}, business_name: '', account_bank: '', account_number: '', category: '' })
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const getCategory = (e, {value}) => setForm({...form, category: value})
    const [loading, setLoading] = useState(false)
    const [banks, setBanks] = useState([])
    const getBank = (e, {value}) => setForm({...form, account_bank: value})
    // 
    useEffect(() => {
      const getBusiness = async () => {
        const bis = business.filter(bis => bis._id == router.query.id)[0]
        setForm(RenderPage(bis))
        setBanks(bankRef)
      }
      getBusiness()
    }, [])
    // 
    const [imageUpload, setImageUpload] = useState(true)
    const [image, setImage] = useState({file: '', preview: ''})
    // 
    const deleteImage = () => {
      setForm({...form, logo: {url: '', id: ''}})
      setImage({file: '', preview: ''})
    }
    // 
      const getImage = (e) => {
          const img = get_image(e)
          setImageUpload(false)
          setImage({file: img.file, preview: img.preview})
      }
  
      // 
      const [deleting, setDeleting] = useState(false)
      const [confirmDelete, setConfirmDelete] = useState(false)
      // 
      const handleStoreDelete = async (e) => {
        e.preventDefault()
        setDeleting(true)
        setConfirmDelete(false)
        // 
        try{
          const res = await axios.delete(`/business/${user._id}/${business._id}`)
          trigger('/business')
          if(res.data.success) {
              router.back()
            }
          else throw new Error(res.data.message)
        }
        catch(err) {
          setGlobalAlert({message: err.message})
          return setDeleting(false)
        }
      }
      // 
  
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
            const res = await axios.put(`/business/${user._id}/${business._id}`, form)
            if(!res.data.success) throw new Error(res.data.message)
            trigger('/business')
            router.back()
            return setLoading(false)
        }
        catch(err) {
            setGlobalAlert({message: err.message})
            return setLoading(false)
        }
    }
   
  
  
    return(
      <Business>
        <Modal width= '550px'>
          {bankRef && !deleting ?
          <div className= {styles.create_business}>
            <Form>
              <header>
                <UploadProfilePicture
                  image= {{ preview: image.preview, url: form.logo?.url }}
                  onChange= {getImage}
                  text= {form.business_name}
                  onDelete= {deleteImage}
                />
              </header>
              <Form.Field>
                <label htmlFor="business_name" style= {{ color: UI.color }}>Business Name</label>
                <Input
                  placeholder= 'Business name'
                  name= 'business_name'
                  value= {form.business_name || ''}
                  onChange= {getForm}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="account_bank" style= {{ color: UI.color }}>Bank</label>
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
                <label htmlFor="account_number" style= {{ color: UI.color }}>Account number</label>
                <Input
                  type= 'number'
                  placeholder= 'Account number'
                  name= 'account_number'
                  value= {form.account_number || ''}
                  onChange= {getForm}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="account_number" style= {{ color: UI.color }}>Category</label>
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
                <label htmlFor="description" style= {{ color: UI.color }}>Description</label>
                <TextArea
                  placeholder= 'Business Description'
                  name= 'description'
                  value= {form.description || ''}
                  onChange= {getForm}
                />
              </Form.Field>
              <Button
                content= 'Update Business'
                color= 'teal'
                style= {{ borderRadius: '0' }}
                inverted= {UI.dark ? true : false}
                onClick= {handleSubmit}
                loading= {loading}
              />
              <Button
                floated= 'right'
                content= 'Delete Business'
                color= 'red'
                style= {{ borderRadius: '0' }}
                inverted= {UI.dark ? true : false}
                onClick= {() => setConfirmDelete(true)}
              />
              <Confirm
                content= 'NOTE:  All the Products listed under this Business will be Lost.'
                header= 'Confirm Delete Action.'
                size= 'mini'
                open={confirmDelete}
                cancelButton= {{ content: 'Never mind', primary: true, size: 'tiny'}}  
                confirmButton= {{ content: 'Delete.', negative: true, size: 'tiny'}} 
                onCancel= {() => setConfirmDelete(false)}
                onConfirm={handleStoreDelete}
              />
            </Form>
          </div> : <Loader title= {deleting ? 'Deleting Business' : ''} />}
        </Modal>
      </Business>
    )
  }