import styles from './style/home.module.css'
import Layout from '../wrapper/layout'
import Product from '../store/product/'
import { GlobalState } from '../../context/globalState'

export default function Home ({children}) {

    const {products} = GlobalState()
    
    return(
        <Layout>
            <div className= {styles.home} >
                {products && products.map((product, index) => (
                    <Product key= {index} props= {product} />
                ))}
            </div>
        </Layout>
        
    )
}