import styles from './style/home.module.css'
import Layout from '../wrapper/layout'
import Product from '../store/product/product'
import useSWR from 'swr'


export default function Home () {

    const {data: products} = useSWR(`/products`)
      
    return(
        <Layout>
            <div className= {styles.home} >
                {products && products.map((product, index) => (
                    <Product key= {index} product= {product} />
                ))}
            </div>
        </Layout>
        
    )
}