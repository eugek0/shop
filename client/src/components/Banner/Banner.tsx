import React, { useCallback } from 'react'

import Image, { StaticImageData } from 'next/image'
import { Parallax } from 'react-scroll-parallax'
import { useRouter } from 'next/router'
import styles from './banner.module.scss'
import Button from '../UI/Button/Button'
import { NavigationFilterParams } from '../../assets/models/navigation'
import { FILES_URL } from '../../helpers/constants/baseUrl'

interface BannerProps {
  image: string | StaticImageData
  title: string
  subtitle: string
  params: NavigationFilterParams
}

const Banner: React.FC<BannerProps> = ({ image, title, subtitle, params }) => {
  const router = useRouter()

  const handleOpenCatalog = useCallback(() => {
    router.push({ pathname: '/catalog', query: { ...params } })
  }, [params, router])

  return (
    <div className={styles.Banner}>
      <Parallax disabled className={styles.Parallax} speed={30}>
        <Image
          src={`${FILES_URL}${image}`}
          layout='responsive'
          loading='lazy'
          width={1920}
          height={1000}
          alt={title}
          className={styles.Image}
        />
      </Parallax>
      <span className={styles.Subtitle}>{subtitle}</span>
      <span className={styles.Title}>{title}</span>
      <Button onClick={handleOpenCatalog}>подробнее</Button>
    </div>
  )
}

export default Banner
