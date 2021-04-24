import {mutate, trigger} from 'swr'
import axios from 'axios'


export async function AddComment (state, action) {
    mutate(`/comment/${action.id}`,  [...state, { body: {comment: action.data}}], false)
    await axios.post(`/comment/${action.id}`, {comment: action.data})
    trigger(`/comment/${action.id}`)
}

export async function DeleteComment (state, action) {
    mutate(`/comment/${action.product_id}`, state.filter(comments => comments._id !== action.id), false)
    await axios.delete(`/comment/${action.product_id}/${action.id}`)
    mutate(`/comment/${action.product_id}`)
}

export async function LikePost (state, action) {
    mutate(`/like/${action.product_id}`, () => {
        const alreadyLiked = state.filter(like => like._id === action.user_id)[0]
        if(alreadyLiked) {
            return state.filter(like => like._id !== action.user_id)
        }
        else {
            return state.push({_id: action.user_id})
        }
    }, false)
    await axios.post(`/like/${action.product_id}`)
    mutate(`/like/${action.product_id}`)
}