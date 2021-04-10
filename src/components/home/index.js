import styles from './style/home.module.css'
import Layout from '../wrapper/layout'
import Product from '../store/product/'

export default function Home ({children}) {

    
    return(
        <Layout>
            <div className= {styles.home} >
                <Product />
                <Product />
            </div>
        </Layout>
        
    )
}