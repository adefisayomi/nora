import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useState, useEffect } from 'react'
import styles from './style/slider.module.css'
import {Placeholder} from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'

const Slider = ({maxHeight, dot= true, images}) => {

  const {UI} = GlobalState()
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })
  // 
  useEffect(() => {
    const getImage = async () => {
      if(images && images.length > 0) setLoading(false)
      else setLoading(true)
    }
    getImage()
  }, [images])

  return (
    <div ref={sliderRef} className= {`keen-slider ${styles.slider_container}`} style= {{ maxHeight: maxHeight }}>
       {loading ?
          <Placeholder inverted= {UI.dark ? true : false} style={{ height: '50vh', width: '100%' }}>
            <Placeholder.Image />
          </Placeholder> : 
          images && images.map((img, index) => (
            <div key= {index} className="keen-slider__slide" >
                <img src= {img.url} alt="product-picture" key={img.id}/>
            </div>
        ))
      }
      {!loading && dot && slider &&
            <div className= {styles.slider_dots}>
                {[...Array(slider.details().size).keys()].map((index) => {
                    return (
                    <button
                        key={index}
                        onClick={() => {
                        slider.moveToSlideRelative(index)
                        }}
                        className= {`${currentSlide === index ? styles.dot_active : styles.dot}`}
                    />
                    )
                })}
            </div>
        }
  </div>
  )
}

export default Slider