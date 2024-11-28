import React, { MouseEvent, useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductItem } from '../../assets/models/catalog'
import IconButton from '../UI/IconButton/IconButton'
import Svg from '../UI/Svg/Svg'
import {
  getSessionStorage,
  setSessionStorage,
} from '../../helpers/functions/sessionStorageUtils'
import { VIEWED_PRODUCTS } from '../../helpers/constants/viewedProducts'
import { CartItem } from '../../assets/models/cart'
import Input from '../UI/Input/Input'
import { FavoritesApi } from '../../api/favorites.api'
import { CatalogApi } from '../../api/catalog.api'
import { CartApi } from '../../api/cart.api'

import styles from './cartCard.module.scss'
import { FILES_URL } from '../../helpers/constants/baseUrl'

const { qkGetCart, deleteFromCart, updateCart } = CartApi
const { qkGetProduct } = CatalogApi
const { qkGetFavorites } = FavoritesApi

interface FavoritesCardProps {
  product: CartItem
}

const CartCard: React.FC<FavoritesCardProps> = ({ product }) => {
  const {
    id,
    price,
    priceDiscount,
    priceWithDiscount,
    count,
    maxCount,
    product: { id: productId, preview, motive, title, volume },
  } = product

  const [productQuantity, setProductQuantity] = useState<number | string>(
    maxCount ? count : 0,
  )

  const router = useRouter()

  const queryClient = useQueryClient()

  const validMaxCount = useMemo(() => maxCount || 0, [maxCount])

  const { mutate: deleteFromCartRequest } = useMutation(deleteFromCart, {
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries(qkGetFavorites)
      queryClient.invalidateQueries(qkGetProduct(productId))
      queryClient.setQueryData(qkGetCart, updatedData)
    },
  })

  const { mutate: updateCartRequest } = useMutation(updateCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(qkGetCart)
    },
  })

  const updateViewedProducts = useCallback(() => {
    const viewedProducts: ProductItem[] = getSessionStorage(VIEWED_PRODUCTS)

    if (viewedProducts.find((item) => item.id === productId)) return

    setSessionStorage(VIEWED_PRODUCTS, [...viewedProducts, product])
  }, [productId])

  const handleOpenProductPage = useCallback(() => {
    updateViewedProducts()
    router.push(`/catalog/${productId}`)
  }, [productId])

  const handleDeleteFromCart = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      deleteFromCartRequest(id)
    },
    [id],
  )

  const handleClickInput = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation()
  }

  // eslint-disable-next-line consistent-return
  const handleBlurInput = useCallback(() => {
    if (productQuantity >= 1 && productQuantity <= validMaxCount) {
      return updateCartRequest({ id, count: Number(productQuantity) })
    }

    if (validMaxCount) {
      updateCartRequest({
        id,
        count: Number(productQuantity ? validMaxCount : 0),
      })
      return setProductQuantity(productQuantity ? validMaxCount : 0)
    }
  }, [productQuantity, validMaxCount, id])

  const updateProductQuantity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value)

      setProductQuantity(value)
    },
    [productQuantity],
  )

  return (
    <div className={styles.CartCard}>
      <div
        className={styles.ImageContainer}
        onClick={handleOpenProductPage}
        /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
        tabIndex={0}
      >
        <Image
          className={styles.Image}
          src={`${FILES_URL}${preview}`}
          loading='lazy'
          width={100}
          height={100}
          alt={preview}
        />
      </div>
      <div className={styles.InfoContainer}>
        <span className={styles.Motive}>{motive.title}</span>
        <div className={styles.TitleBlock}>
          <span className={styles.Title}>{title}</span>
          <IconButton
            className={styles.DeleteButton}
            onClick={handleDeleteFromCart}
          >
            <Svg name='close-icon' />
          </IconButton>
        </div>
        <span className={styles.Volume}>{volume.title}</span>
        <div className={styles.Bottom}>
          <Input
            type='number'
            value={String(productQuantity)}
            max={validMaxCount}
            min={0}
            placeholder='кол-во'
            onChange={updateProductQuantity}
            onClick={handleClickInput}
            onBlur={handleBlurInput}
          />
          <span className={styles.Stock}>
            {validMaxCount ? 'в наличии' : 'нет в наличии'}
          </span>
          <div className={styles.PriceBlock}>
            {priceWithDiscount && (
              <span className={styles.OldPrice}>{`${price} ₽`}</span>
            )}
            <span className={styles.Price}>{`${
              priceWithDiscount || price
            } ₽`}</span>
            {priceDiscount && (
              <span className={styles.Sale}>{`скидка ${priceDiscount}₽`}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartCard
