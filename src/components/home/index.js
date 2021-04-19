import styles from './style/home.module.css'
import Layout from '../wrapper/layout'
import Product from '../store/product/'
import { GlobalState } from '../../context/globalState'
import axios from 'axios'
import useSWR, { mutate, trigger } from 'swr'
import { useEffect, useState } from 'react'



export default function Home ({children}) {

    const {data: products} = useSWR(`/products`)
    console.log(products)
      
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