import styles from './style/store.module.css'
import Filter from '../re-usables/filter'
import { Divider, Icon } from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import Gallery from '../re-usables/gallery'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Empty from '../re-usables/empty'
import Loader from '../re-usables/loader'


export default function Store () {

    const router = useRouter()
    const {data: products} = useSWR(`/products/${router.query.user}`)
    const {UI} = GlobalState()

    return(
        <div className= {styles.store} style= {{ border: !UI.dark && UI.border, backgroundColor: UI.bgColor, color: UI.color  }}>
          {products ? 
            <>
               <Icon
                    name= 'arrow alternate circle left outline'
                    size= 'large'
                    link
                    onClick= {() => router.back()}
               />
              <Divider />
              <Filter />
              <Divider />
              { products.length > 0 ? <Gallery slides= {products} /> : <Empty content= {{ text: 'Your store is empty.', icon: 'cart' }} /> }
           </> : 
            <Loader title= 'Loading Store' />
           }
        </div>
        
    )
}