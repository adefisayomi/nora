import styles from './style/upload_profile_picture.module.css'
import {Icon} from 'semantic-ui-react'
import {v4 as uuid} from 'uuid'
import { memo } from 'react'


const UploadProfilePicture = memo(({onChange, image, text , onDelete, width}) => {


    return(
        <div className= {styles.upload_profile_picture} style= {{ width: width , height: width }}>
            <div className= {styles.upload_profile_picture_div}>
              { image && (image.preview || image.url) ? 
                    <img src= { image.preview || image.url } alt="" key= {uuid()}/>
                    :
                <h1>{text ? text[0] : 'nora'}</h1>}
            </div>
            { image && (image.preview || image.url) && onDelete &&
             <div className= {styles.upload_profile_picture_delete}>
                <Icon
                    name= 'cancel'
                    color= 'red'
                    fitted
                    size= 'large'
                    link
                    onClick= {onDelete}
                />
            </div>}
            <label htmlFor="logo" className= {styles.upload_profile_picture_label}>
            <input type="file" name="logo" id="logo" onChange= {onChange}/>
                <Icon
                    name= 'camera'
                    fitted
                    circular
                    inverted
                    link
                    onChange= {onChange}
                />
            </label>
        </div>
    )
})

export default UploadProfilePicture