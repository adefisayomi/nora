import styles from './style/user.module.css'
import Layout from '../wrapper/layout'
import Header from './header'
import { GlobalState } from '../../context/globalState'
import Filter from '../re-usables/filter'
import Gallery, {ImageGallery} from '../re-usables/gallery'
import { Divider } from 'semantic-ui-react'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '../re-usables/loader'


export default function User ({children}) {

    // Get data
    const router = useRouter()
    const {UI, user, products} = GlobalState()
    const [refetchUser, setRefetchUser] = useState(false)
    // 
    useEffect(() => {
        if(router.query.user == user?.username) {
            setRefetchUser(false)
        }
        else setRefetchUser(true)
    }, [user, router.query.user])
    //
    const {data} = useSWR(() => refetchUser && `/user/${router.query.user}`, {initialData: user, revalidateOnMount: true})
    // 
    const {data: userProducts} = useSWR(() => refetchUser && `/products/${router.query.user}`, {initialData: products, revalidateOnMount: true})
    //
    const [images, setImages] = useState([])
    useEffect(() => {
        if(userProducts) {
            const prods = userProducts.map(prod => prod.details.images)
            const prodImages = prods.reduce((a, b) => a.concat(b), []);
            setImages(prodImages)
        }
    }, [userProducts])
    

    return(
        <Layout>
            <div className= {styles.user} style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
                { data ? 
                  <>
                    <div className= {styles.user_header}>
                        <Header data= {data} />
                    </div>
                    <div className= {styles.user_main}>
                        <Divider  />
                        <ImageGallery images= {images} />
                    </div>
                  </>
                    :
                    <Loader title= 'User Profile' />
                }
                {children}
            </div>
        </Layout>
    )
}