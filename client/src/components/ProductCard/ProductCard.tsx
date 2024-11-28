import React, { MouseEvent, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Parallax } from 'react-scroll-parallax'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import Svg from '../UI/Svg/Svg'
import { ProductItem } from '../../assets/models/catalog'
import { VIEWED_PRODUCTS } from '../../helpers/constants/viewedProducts'
import {
  getSessionStorage,
  setSessionStorage,
} from '../../helpers/functions/sessionStorageUtils'
import IconButton from '../UI/IconButton/IconButton'
import { FavoritesApi } from '../../api/favorites.api'
import { useToggleState } from '../../helpers/hooks/useToggleState'
import { useModalContext } from '../../helpers/context/ModalContext'
import { FILES_URL } from '../../helpers/constants/baseUrl'
import Flag from '../UI/Flag/Flag'

import styles from './productCard.module.scss'

const { addToFavorites, deleteFromFavorites } = FavoritesApi

interface ProductCardProps {
  product: ProductItem
  variant?: 'small' | 'large'
}

const ProductCard: React.FC<ProductCardProps> = ({ variant, product }) => {
  const {
    id,
    title,
    price,
    motive,
    preview,
    gender,
    isFavorite,
    discount,
    priceWithDiscount,
  } = product

  const router = useRouter()

  const [actuallyFavorite, toggleActuallyFavorite] = useToggleState(isFavorite)
  const [showHeart, toggleShowHeart] = useToggleState(false)

  const { mutate: addToFavoritesRequest } = useMutation(addToFavorites, {
    onSuccess: toggleActuallyFavorite,
  })
  const { mutate: deleteFromFavoritesRequest } = useMutation(
    deleteFromFavorites,
    { onSuccess: toggleActuallyFavorite },
  )

  const { isAuthorized } = useModalContext()

  const updateViewedProducts = useCallback(() => {
    const viewedProducts: ProductItem[] = getSessionStorage(VIEWED_PRODUCTS)

    if (viewedProducts.find((item) => item.id === id)) return

    setSessionStorage(VIEWED_PRODUCTS, [...viewedProducts, product])
  }, [id])

  const handleOpenProductPage = useCallback(() => {
    updateViewedProducts()
    router.push(`/catalog/${id}`)
  }, [id])

  const handleAddToFavorites = useCallback(
    // eslint-disable-next-line consistent-return
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (actuallyFavorite) return deleteFromFavoritesRequest(id)

      addToFavoritesRequest(id)
    },
    [id, actuallyFavorite],
  )

  useEffect(() => {
    toggleShowHeart(isAuthorized)
  }, [isAuthorized])

  return (
    <div
      className={styles[`ProductCard_${variant}`]}
      onClick={handleOpenProductPage}
      /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
      tabIndex={0}
    >
      <div className={styles.ImageContainer}>
        <Flag value={`${discount?.value}%`} show={!!discount?.value} />
        <Image
          className={styles.Image}
          src={`${FILES_URL}${preview}`}
          width={variant === 'large' ? 752 : 336}
          height={variant === 'large' ? 640 : 460}
          loading='lazy'
          alt={preview}
        />
        {showHeart && (
          <IconButton
            className={classNames(
              styles.HeartIcon,
              actuallyFavorite && styles.Favorite,
            )}
            onClick={handleAddToFavorites}
            strokePath
          >
            <Svg name='heart-icon' />
          </IconButton>
        )}
      </div>
      <Parallax
        className={styles.InfoContainer}
        speed={variant === 'large' ? 5 : 0}
      >
        <span className={styles.Subtitle}>{motive.title}</span>
        <span className={styles.Text}>{title}</span>
        <span className={styles.Text}>{gender.abbreviation}</span>
        <div className={styles.PriceBox}>
          <span className={styles.Price}>{priceWithDiscount || price} ₽</span>
          {priceWithDiscount && (
            <span className={styles.OldPrice}>{price} ₽</span>
          )}
        </div>
      </Parallax>
    </div>
  )
}

ProductCard.defaultProps = {
  variant: 'small',
}

export default React.memo(ProductCard)
