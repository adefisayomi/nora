

export default function RenderPage (data) {

    const res = {}
    // 
    if(data) {
       for(let [k, v] of Object.entries(data)) {
            res[k] = v
        } 
    }
    // 
    return res
}