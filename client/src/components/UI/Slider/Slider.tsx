import React from 'react'
import Slider, { Settings } from 'react-slick'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import styles from './slider.module.scss'

interface Slide {
  src: string
  alt: string
}

interface SliderProps {
  slides: Slide[]
}

const NextSlider: React.FC<SliderProps> = ({ slides }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  }

  return (
    <Slider className={styles.Slider} {...settings}>
      {slides.map((slide) => (
        <div className={styles.Slide} key={slide.src}>
          <Image
            className={styles.Images}
            src={slide.src}
            alt={slide.alt}
            layout='responsive'
            width={360}
            height={360}
          />
        </div>
      ))}
    </Slider>
  )
}

export default NextSlider
