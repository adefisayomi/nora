import Dashboard from '../dashboard'
import styles from './style/store.module.css'
import Footer from '../../re-usables/footer'
import { useRouter } from "next/router";
import Empty from "../../re-usables/empty";
import Filter from "../../re-usables/filter";
import { GlobalState } from "../../../context/globalState";
import Gallery from'../../re-usables/gallery'
import { useCallback, useState, useEffect, useMemo } from "react";


export default function Store ({children}) {

    const router = useRouter()
    const {products, UI} = GlobalState()
    
    const handleClick = (path) => {
        router.push(`${router.asPath}/create`)
    }
    const [category, setCategory] = useState(products)
    // 
    useEffect(() => {
        setCategory(products)
    }, [products])
    
    const getBusiness = useCallback((e, {value}) => {
        const res = products?.filter(prod => prod.details.business_id == value)
        setCategory(res)
    }, [])

    return(
        <Dashboard>
             <div className= {styles.store}>
                 { products && products.length > 0 ? 
                    <>
                    <div className= {styles.store_header}>
                        <Filter onChange= {getBusiness} />
                    </div>
                    <div className= {styles.store_main}>
                        <Gallery slides= {category} />
                    </div>
                    </> : 
                    <Empty content= {{ icon: 'cart', text: 'Your Store is completely empty.'}} />
                 }
                 <div className= {styles.store_footer}>
                    <Footer content= {{ icon: 'cart', content: 'Create new Product', onClick: handleClick }} />
                 </div>
            </div>
            {children}
        </Dashboard>
        
    )
}