import axios from "axios";



export async function RequestAffiliation (state, action) {
    axios.post(`/affiliate/${action.product_id}`)
}