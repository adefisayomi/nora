import { memo } from 'react'
import styles from './style/gallery.module.css'
import Slider from '../slider/slider'
import { GlobalState } from '../../context/globalState'
import { Label } from 'semantic-ui-react'
import {useRouter} from 'next/router'


const Gallery = memo(({slides}) => {

    const router = useRouter()
    const {UI} = GlobalState()

    return(
        <div className= {styles.gallery}>
            {slides && slides.map((slide, index) => (
               <div key= {index} className= {styles.gallery_div}>
                   <span className= {styles.gellery_span}>
                       <Slider images= {slide.details.images} />
                   </span>
                   <span className= {styles.gallery_span_overlay}>
                       <span onClick= {() => router.push(`${router.asPath}/${slide._id}`)}>
                            <Label as= 'a' tag color= 'black'>
                                ${slide.details?.price}
                            </Label>
                       </span>
                   </span>
                </div>
            ))}
        </div>
    )
})

export default Gallery

export const ImageGallery = memo(({images}) => {

    const {UI} = GlobalState()

    return(
        <div className= {styles.image_gallery} style= {{ backgroundColor: UI.bgColor }}>
            {images && images.map((img, index) => (
               <div key= {index} className={styles.image_gallery_div}>
                    <img src= {img.url} alt= 'photo' key= {img.id} loading= 'lazy' />
                </div> 
            ))}
        </div>
    )
})