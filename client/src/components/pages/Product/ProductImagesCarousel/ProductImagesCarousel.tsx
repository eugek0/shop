import React from 'react'
import Image from 'next/image'
import styles from './productImagesCarousel.module.scss'
import Svg from '../../../UI/Svg/Svg'
import { svgMap } from '../../../UI/Svg/svgStorage'
import { FILES_URL } from '../../../../helpers/constants/baseUrl'
import Flag from '../../../UI/Flag/Flag'

interface ConditionItem {
  icon: keyof typeof svgMap
  text: string
}

const conditionsContent: ConditionItem[] = [
  {
    icon: 'free-icon',
    text: 'Бесплатная доставка от 1000 ₽',
  },
  {
    icon: 'ru-icon',
    text: 'Доставка по всей территории РФ',
  },
  {
    icon: 'diamond-icon',
    text: 'Гарантия качества продукции',
  },
]

interface ProductImagesCarouselProps {
  images: string[]
  title: string
  subtitle: string
  discountValue?: number
}

const ProductImagesCarousel: React.FC<ProductImagesCarouselProps> = ({
  images,
  title,
  subtitle,
  discountValue,
}) => (
  <div className={styles.ImagesCarousel}>
    <Flag
      className={styles.Discount}
      value={`${discountValue}%`}
      show={!!discountValue}
    />
    <div className={styles.ImageItemsContainer}>
      {images.map((image) => (
        <div key={image} className={styles.ImageContainer}>
          <Image
            className={styles.Image}
            src={`${FILES_URL}${image}`}
            width={80}
            height={80}
            alt={image}
          />
        </div>
      ))}
    </div>
    <div className={styles.ImageLargeContainer}>
      <Image
        className={styles.LargeImage}
        src={`${FILES_URL}${images[0]}`}
        width={555}
        height={666}
        alt={images[0]}
      />
      <div className={styles.TitleContainer}>
        <div className={styles.Subtitle}>{subtitle}</div>
        <div className={styles.Title}>{title}</div>
      </div>
      <div className={styles.ConditionsContainer}>
        {conditionsContent.map(({ icon, text }) => (
          <div className={styles.Condition}>
            <Svg className={styles.Svg} name={icon} />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default ProductImagesCarousel
