import firebase from './firebase/config'
import {v4 as uuid} from 'uuid'

export const get_image = (e) => {

    const valid_image_type = ['image/png', 'image/jpeg', 'image/jpg']
    const img = e.target.files[0]

    if(img && valid_image_type.includes(img.type)) {
        const url = URL.createObjectURL(img)
        return ({file: img, preview: url})
    }
    else return null
}

export const getMultipleImages = (e) => {

    const validImageType = ['image/jpeg', 'image/png', 'image/jpg']

    const fileRef = e.target.files
    const result = []

    if(fileRef){
       const file = Array.from(fileRef)
       file.map(file => {
        if(validImageType.includes(file.type)){
            const url = URL.createObjectURL(file)
            result.push({file: file, preview: url})
        }
        else{
            return {success: false, message: 'Image format not supported.'}
        }
      }) 
    }
    return {success: true, message: result}
}
// 

export const uploadImage = async (files, user) => {


    try{
        if (user && files.length > 0) {
            const promise = await files.map( async (file) => {
                        const imageId = uuid()
                        const metaData = { contentType: 'image/jpeg'}
                        const storageRef = firebase.storage().ref()
                        const uploadTask = storageRef.child(`${user._id}/${imageId}`)
                        const data = await uploadTask.put(file, metaData)
                        const url = await data.ref.getDownloadURL()
                        return ({ url: url, id: imageId })
                        })
            const data = await Promise.all(promise)
            return ({success: true, message: 'Image successfuly uploaded', data: data})
        } throw new Error('Incomplete Data.')
    }
    
    catch(err){
        return ({success: false, message: err.message, data: null}) 
    }
}

export const uploadSingleImage = async (file, user) => {

    
    try{
        if (user && file) {
            const imageId = uuid()
            const metaData = { contentType: 'image/jpeg'}
            const storageRef = firebase.storage().ref()
            const uploadTask = storageRef.child(`${user._id}/${imageId}`)
            const data = await uploadTask.put(file, metaData)
            const url = await data.ref.getDownloadURL()
            return ({success: true, message: 'Image successfuly uploaded', data: { url: url, id: imageId }})
        } throw new Error('Incomplete Data.')
    }
    
    catch(err){
        return ({success: false, message: err.message, data: null}) 
    }
}
