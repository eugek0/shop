import React, { useEffect, useMemo, useState } from 'react'
import { getSessionStorage } from '../../../../helpers/functions/sessionStorageUtils'
import { VIEWED_PRODUCTS } from '../../../../helpers/constants/viewedProducts'
import ProductCard from '../../../ProductCard/ProductCard'

import styles from './viewedProducts.module.scss'
import Svg from '../../../UI/Svg/Svg'
import IconButton from '../../../UI/IconButton/IconButton'
import { ProductItem } from '../../../../assets/models/catalog'
import { useWindowCoordinate } from '../../../../helpers/hooks/useWindowCoordinate'

const ViewedProducts = () => {
  const { windowX } = useWindowCoordinate()
  const [viewedProducts, setViewedProducts] = useState<ProductItem[]>([])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  const visibleCardsQuantity = useMemo(() => {
    if (windowX > 1678) return 4

    return Math.floor((windowX - 400) / 434 + 1)
  }, [windowX])

  const handlePrev = () => {
    setStart((prevStart) => Math.max(0, prevStart - visibleCardsQuantity))
    setEnd((prevEnd) =>
      Math.max(visibleCardsQuantity, prevEnd - visibleCardsQuantity),
    )
  }

  const handleNext = () => {
    setStart((prevStart) =>
      Math.min(
        viewedProducts.length - visibleCardsQuantity,
        prevStart + visibleCardsQuantity,
      ),
    )
    setEnd((prevEnd) =>
      Math.min(viewedProducts.length, prevEnd + visibleCardsQuantity),
    )
  }

  useEffect(() => {
    setViewedProducts(getSessionStorage(VIEWED_PRODUCTS))
  }, [])

  useEffect(() => {
    setEnd(Math.floor((windowX - 360) / 434 + 1))
  }, [windowX])

  if (!viewedProducts?.length) return null

  return (
    <div className={styles.ViewedProducts}>
      <div className={styles.Header}>
        <span className={styles.Title}>просмотренные товары</span>
        <IconButton
          className={styles.SlideButton}
          onClick={handlePrev}
          disabled={start === 0}
        >
          <Svg name='arrow-left' />
        </IconButton>
        <IconButton
          className={styles.SlideButton}
          onClick={handleNext}
          disabled={end >= viewedProducts.length}
        >
          <Svg name='arrow-right' />
        </IconButton>
      </div>
      <div className={styles.Content}>
        {viewedProducts.slice(start, end).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ViewedProducts
