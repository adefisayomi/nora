import styles from './style/store.module.css'
import Layout from '../wrapper/layout'
import Filter from '../re-usables/filter'
import { Divider, Icon } from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import Gallery from '../re-usables/gallery'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '../re-usables/loader'


export default function Store () {

    const router = useRouter()
    const {data: products} = useSWR(`/products/${router.query.user}`)
    const {UI} = GlobalState()

    return(
        <Layout>
          {products ? <div className= {styles.store} style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
               <Icon
                    name= 'arrow alternate circle left outline'
                    size= 'large'
                    link
                    onClick= {() => router.back()}
               />
              <Divider />
              <Filter />
              <Divider />
              <Gallery slides= {products} />
           </div> : 
            <Loader title= 'Loading Store' />
           }
        </Layout>
        
    )
}