import { useKeenSlider } from 'keen-slider/react'
import { useState, useEffect } from 'react'
import styles from './style/slider.module.css'
import {Placeholder, Image} from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'

const Slider = ({tag, dot= true, images}) => {

  const {UI} = GlobalState()
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  return (
    <div ref={sliderRef} className= {`keen-slider ${styles.slider_container}`}>
      {
        images && images.length> 0 && images.map((img, index) => (
          img.url ? 
            <div key= {index} className="keen-slider__slide" >
                  <Image src= {img.url} alt="product-image" key={index} />
            </div> : 
            <Placeholder className= {styles.slider_placeholder} key= {index}>
              <Placeholder.Image />
            </Placeholder>
        ))
      }
      {
        dot && slider && 
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