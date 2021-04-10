import styles from './style/user.module.css'
import Layout from '../wrapper/layout'
import Header from './header'
import { GlobalState } from '../../context/globalState'
import Filter from '../re-usables/filter'
import {ImageGallery} from '../re-usables/gallery'
import { Divider } from 'semantic-ui-react'
import { useCallback, useEffect, useState } from 'react'


export default function User ({children}) {

    const {UI, products} = GlobalState()
    const [images, setImages] = useState([])
    const getImages = useCallback(() => {
            const img = products.map(img => {
                return img.details.images
            })
            return img
         })
    useEffect(() => {
        if(products) {
            const img = getImages()
            const arrays = img.reduce((a, b) => a.concat(b), []);
            setImages(arrays)
        }
       
    }, [products])

    
    return(
        <Layout>
            <div className= {styles.user} style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
                <div className= {styles.user_header}>
                    <Header />
                </div>
                <div className= {styles.user_main}>
                    <Divider  />
                    <Filter />
                    <Divider  />
                    <ImageGallery images= {images} />
                </div>
                {children}
            </div>
        </Layout>
    )
}