import styles from './style/home.module.css'
import Layout from '../wrapper/layout'
import Product from '../store/product/'
import { GlobalState } from '../../context/globalState'
import axios from 'axios'

// export async function getServerSideProps(context) {
//     const res = await axios.get('http://localhost:4000/api')

//     return {
//       props: {data: res.data}, 
//     }
//   }

export default function Home ({children, data}) {

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