import React from 'react'
import { Parallax } from 'react-scroll-parallax'
import Image from 'next/image'
import Page from '../../Page/Page'
import { ProductItem } from '../../../assets/models/catalog'
import Loader from '../../UI/Loader/Loader'
import CatalogContent from './CatalogContent/CatalogContent'

import styles from './catalog.module.scss'
import Filter from './Filter/Filter'

interface CatalogProps {
  products: ProductItem[][]
  isLoading: boolean
}

const Catalog: React.FC<CatalogProps> = ({ products, isLoading }) => (
  <Page noTopPadding>
    <div className={styles.Banner}>
      <Image
        className={styles.BannerImage}
        src='/catalogBanner.jpg'
        width={1920}
        height={500}
        alt='catalog'
      />
      <Parallax className={styles.Title} speed={10}>
        каталог парфюмерии
      </Parallax>
    </div>
    <Filter />
    <CatalogContent products={products} />
    {isLoading && <Loader height='70vh' />}
  </Page>
)

export default React.memo(Catalog)
