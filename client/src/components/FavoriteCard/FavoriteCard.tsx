import React, { MouseEvent, useCallback } from 'react'
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
import styles from './favoriteCard.module.scss'
import { FavoritesApi } from '../../api/favorites.api'
import { CartApi } from '../../api/cart.api'
import Flag from '../UI/Flag/Flag'
import { FILES_URL } from '../../helpers/constants/baseUrl'

const { deleteFromFavorites, qkGetFavorites } = FavoritesApi

const { addToCart, qkGetCart } = CartApi

interface FavoritesCardProps {
  product: ProductItem
}

const FavoriteCard: React.FC<FavoritesCardProps> = ({ product }) => {
  const {
    id,
    preview,
    motive,
    title,
    volume,
    price,
    isAddedToCart,
    discount,
    priceWithDiscount,
  } = product

  const router = useRouter()

  const queryClient = useQueryClient()

  const { mutate: deleteFromFavoritesRequest } = useMutation(
    deleteFromFavorites,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(qkGetFavorites)
      },
    },
  )

  const { mutate: addToCartRequest } = useMutation(addToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(qkGetCart)
      queryClient.invalidateQueries(qkGetFavorites)
    },
  })

  const updateViewedProducts = useCallback(() => {
    const viewedProducts: ProductItem[] = getSessionStorage(VIEWED_PRODUCTS)

    if (viewedProducts.find((item) => item.id === id)) return

    setSessionStorage(VIEWED_PRODUCTS, [...viewedProducts, product])
  }, [id])

  const handleOpenProductPage = useCallback(() => {
    updateViewedProducts()
    router.push(`/catalog/${id}`)
  }, [id])

  const handleDeleteFromFavorites = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      deleteFromFavoritesRequest(id)
    },
    [id],
  )

  const handleAddToCart = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      addToCartRequest(id)
    },
    [id],
  )

  return (
    <div
      className={styles.FavoritesCard}
      onClick={handleOpenProductPage}
      /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
      tabIndex={0}
    >
      <div className={styles.ImageContainer}>
        <Flag value={`${discount?.value}%`} show={!!discount?.value} />
        <Image
          className={styles.Image}
          src={`${FILES_URL}${preview}`}
          loading='lazy'
          width={128}
          height={128}
          alt={preview}
        />
      </div>
      <div className={styles.InfoContainer}>
        <span className={styles.Motive}>{motive.title}</span>
        <div className={styles.TitleBlock}>
          <span className={styles.Title}>{title}</span>
          <IconButton
            className={styles.DeleteButton}
            onClick={handleDeleteFromFavorites}
          >
            <Svg name='close-icon' />
          </IconButton>
        </div>
        <span className={styles.Volume}>{volume.title}</span>
        <div className={styles.Bottom}>
          <div className={styles.PriceBlock}>
            <span className={styles.Price}>{`${
              priceWithDiscount || price
            } ₽`}</span>
            {!!priceWithDiscount && (
              <span className={styles.OldPrice}>{`${price} ₽`}</span>
            )}
          </div>
          <IconButton
            className={styles.CardButton}
            onClick={handleAddToCart}
            disabled={isAddedToCart}
          >
            <Svg name='cart-icon' />
            <span>{isAddedToCart ? 'в корзине' : 'в корзину'}</span>
          </IconButton>
          <span className={styles.Stock}>в наличии</span>
        </div>
      </div>
    </div>
  )
}

export default FavoriteCard
