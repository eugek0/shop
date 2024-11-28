import React from 'react'

import styles from './product.module.scss'
import BreadCrumbs from '../../UI/BreadCrumbs/BreadCrumbs'
import Page from '../../Page/Page'
import { ProductDetailedItem } from '../../../assets/models/catalog'
import ProductImagesCarousel from './ProductImagesCarousel/ProductImagesCarousel'
import ProductBaseInfo from './ProductBaseInfo/ProductBaseInfo'
import ProductAdditionalInfo from './ProductAdditionalInfo/ProductAdditionalInfo'
import PriceDynamicsChart from './PriceDynamicsChart/PriceDynamicsChart'
import ViewedProducts from './ViewedProducts/ViewedProducts'
import Slider from '../../UI/Slider/Slider'
import { useWindowCoordinate } from '../../../helpers/hooks/useWindowCoordinate'
import { FILES_URL } from '../../../helpers/constants/baseUrl'

interface ProductProps {
  product: ProductDetailedItem
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { id, title, images, gender, history, discount } = product

  const { windowX } = useWindowCoordinate()

  const breadCrumbs = [
    {
      name: 'главная',
      href: '/',
    },
    {
      name: 'мужская парфюмерия',
      href: '/catalog',
    },
    {
      name: title.toLowerCase(),
      href: `/catalog/${id}`,
    },
  ]

  return (
    <Page className={styles.ProductPage} wrapper={windowX > 1680}>
      <BreadCrumbs className={styles.ProductBreadCrumbs} array={breadCrumbs} />
      <div className={styles.Content}>
        <div className={styles.BaseInfo}>
          {windowX > 1000 ? (
            <ProductImagesCarousel
              images={images}
              title={title}
              subtitle={gender.title}
              discountValue={discount?.value}
            />
          ) : (
            <>
              <Slider
                slides={images.map((el) => ({
                  src: `${FILES_URL}${el}`,
                  alt: 'image',
                }))}
              />
              <div className={styles.TitleContainer}>
                <div className={styles.Subtitle}>{gender.title}</div>
                <div className={styles.Title}>{title}</div>
              </div>
            </>
          )}
          <ProductBaseInfo product={product} />
        </div>
        <ProductAdditionalInfo product={product} />
        <PriceDynamicsChart history={history} />
        <ViewedProducts />
      </div>
    </Page>
  )
}

export default Product
