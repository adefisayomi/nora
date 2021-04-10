import axios from "axios"
import { trigger, mutate } from "swr"


  // LOG_OUT
  export const logOut = async () => {
    mutate('/user', null, false)
    // mutate('/business/account', {}, false)
    // mutate('/business/clients', {}, false)
    await axios.delete('/user/signout')
    trigger('/user')
    return null
}

// SIGN_IN
export const signInWithToken = async (token) => {
    const res = await axios.get('/user', {headers: { authorization: `Bearer ${token}` }})
    trigger('/user')
    if(res && res.data.success) {
        return res.data.data
    }
    else {
        return null
    }
}