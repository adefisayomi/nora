import axios from "axios"
import { trigger, mutate } from "swr"


export async function logOut () {
    mutate(`/user`, null, false)
    await axios.delete('/user/signout')
    return trigger('/user')
} 
// Login
export async function signInWithToken (token) {
    const res = await axios.get('/user', {headers: { authorization: `Bearer ${token}` }})
    if(res && res.data.success) {
        trigger('/user')
        return res.data.data
    }
    return 
}