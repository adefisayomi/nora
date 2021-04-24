import styles from './style/user.module.css'
import Layout from '../wrapper/layout'
import Header from './header'
import { GlobalState } from '../../context/globalState'
import  {ImageGallery} from '../re-usables/gallery'
import { Divider } from 'semantic-ui-react'
import Empty from '../re-usables/empty'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '../re-usables/loader'
import EmptyUser from '../re-usables/emptyUser'


export default function User ({children}) {

    const router = useRouter()
    const {UI, user, products} = GlobalState()
    const {data: currentUser} = useSWR(() => router.query?.user !== user?.username || router.query?.user !== user?._id ? 
    `/user/${router.query.user}` : '', {initialData: user, revalidateOnMount: true})
    // 
    const {data: currenUserProducts} = useSWR(() => router.query?.user !== user?.username || router.query?.user !== user?._id ?  `/products/${router.query.user}` : '', {initialData: products, revalidateOnMount: true})
    // Get products and parse them into individual images
    let photos = currenUserProducts?.map(prod => prod.details.images).reduce((a, b) => a.concat(b), [])

    return(
        <Layout>
            <div className= {styles.user} style= {{ backgroundColor: UI.bgColor, color: UI.color, border: !UI.dark && UI.border }}>
                { currentUser ? 
                  <>
                    <div className= {styles.user_header}>
                        <Header user= {currentUser} />
                    </div>
                    <div className= {styles.user_main}>
                        <Divider  />
                        {photos.length > 0 ? <ImageGallery images= {photos} /> : <Empty content= {{ text: 'You currently have no upload.', icon: 'image' }} /> }
                    </div>
                  </> :
                  currentUser == undefined ?
                  <Loader title = 'User Profile' />
                    :
                 <EmptyUser content= 'User not found' />
                }
                {children}
            </div>
        </Layout>
    )
}