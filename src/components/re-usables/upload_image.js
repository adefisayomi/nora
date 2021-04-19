import { memo } from 'react'
import { Icon } from 'semantic-ui-react'
import styles from './style/upload_image.module.css'
import {v4 as uuid} from 'uuid'


const Upload = memo(({onDelete, onChange, images, hide}) => {

    return(
        <div className= {styles.upload}>
           {images && images.map(img => (
               <span className= {styles.upload_image} key= {uuid()}>
                    <img src= {img.preview || img.url}  alt="" key= {uuid()}/>
                    <span className= {styles.upload_overlay}>
                        {onDelete && <Icon id= {img.preview || img.id} name= 'cancel' size= 'large' color= 'red' link onClick= {(e) => onDelete(e)}/>}
                    </span>
                </span>
           ))}

                {!hide && <label htmlFor="upload_image">
                    <Icon name= 'plus' link size= 'large' onChange= {onChange}/>
                    <input type="file" name="upload_image" id="upload_image" onChange= {onChange} multiple/>
                </label>}
        </div>
    )
})

export default Upload