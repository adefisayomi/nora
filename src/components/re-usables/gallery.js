import { memo } from 'react'
import { Icon } from 'semantic-ui-react'
import styles from './style/gallery.module.css'
import Slider from '../slider/slider'
import { GlobalState } from '../../context/globalState'


const Gallery = memo(({slides}) => {

    return(
        <div className= {styles.gallery}>
            {slides && slides.map((slide, index) => (
               <div key= {index}>
                   <span>
                       <Slider images= {slide.details.images} />
                   </span>
                </div> 
            ))}
        </div>
    )
})

export default Gallery

export const ImageGallery = ({images}) => {

    const {UI} = GlobalState()

    return(
        <div className= {styles.image_gallery} style= {{ backgroundColor: UI.bgColor }}>
            {images && images.map((img, index) => (
               <div key= {index}>
                    <img src= {img.url} alt= 'photo' key= {img.id}/>
                </div> 
            ))}
        </div>
    )
}