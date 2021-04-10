import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useState } from 'react'
import styles from './style/slider.module.css'

const Slider = ({maxHeight, dot= true, images}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  return (
    <div ref={sliderRef} className= {`keen-slider ${styles.slider_container}`} style= {{ maxHeight: maxHeight }}>
        {images.map((img, index) => (
            <div ke= {index} className="keen-slider__slide" key= {index}>
                <img src= {img.url} alt="product-picture" key={img.id}/>
            </div>
        ))}
        { dot && slider &&
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