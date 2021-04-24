import {mutate} from "swr"
import axios from 'axios'


//Add to cart
export async function AddToCart (state, action) {
    mutate('/cart', [...state, action.data], false)
    await axios.post(`/cart/${action.id}`, action.data)
    mutate('/cart')
    mutate('/products')
    return
} 

export async function RemoveFromCart (state, action) {
    mutate('/cart', state.filter(cart => cart._id !== action.id), false)
    await axios.delete(`/cart/${action.id}`)
    mutate('/cart')
}
