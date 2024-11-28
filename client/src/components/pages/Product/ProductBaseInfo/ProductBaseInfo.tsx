import React, { MouseEvent, useCallback, useEffect } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import styles from './productBaseInfo.module.scss'
import { ProductDetailedItem } from '../../../../assets/models/catalog'
import Svg from '../../../UI/Svg/Svg'
import Button from '../../../UI/Button/Button'
import IconButton from '../../../UI/IconButton/IconButton'
import { useToggleState } from '../../../../helpers/hooks/useToggleState'
import { FavoritesApi } from '../../../../api/favorites.api'
import { useModalContext } from '../../../../helpers/context/ModalContext'
import { HeaderDrawer } from '../../../../assets/models/headerDrawer'
import { CartApi } from '../../../../api/cart.api'
import { CatalogApi } from '../../../../api/catalog.api'

const { addToFavorites, deleteFromFavorites } = FavoritesApi
const { qkGetProduct } = CatalogApi
const { addToCart, qkGetCart } = CartApi

interface ProductBaseInfoProps {
  product: ProductDetailedItem
}

const ProductBaseInfo: React.FC<ProductBaseInfoProps> = ({ product }) => {
  const {
    id,
    volume,
    price,
    isFavorite,
    isAddedToCart,
    discount,
    priceWithDiscount,
  } = product

  const [actuallyFavorite, toggleActuallyFavorite] = useToggleState(isFavorite)
  const [showAuthorizedText, toggleShowAuthorizedText] = useToggleState(false)

  const queryClient = useQueryClient()

  const { mutate: addToFavoritesRequest } = useMutation(addToFavorites, {
    onSuccess: toggleActuallyFavorite,
  })
  const { mutate: deleteFromFavoritesRequest } = useMutation(
    deleteFromFavorites,
    { onSuccess: toggleActuallyFavorite },
  )

  const { mutate: addToCartRequest } = useMutation(addToCart, {
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries(qkGetCart)
      queryClient.setQueryData(qkGetProduct(id), updatedData)
    },
  })

  const { isAuthorized, setOpenedDrawer } = useModalContext()

  const handleAddToFavorites = useCallback(
    // eslint-disable-next-line consistent-return
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!isAuthorized) return setOpenedDrawer(HeaderDrawer.LOGIN)

      if (actuallyFavorite) {
        deleteFromFavoritesRequest(id)
      } else {
        addToFavoritesRequest(id)
      }
    },
    [id, actuallyFavorite, isAuthorized],
  )

  useEffect(() => {
    toggleActuallyFavorite(isFavorite)
  }, [isFavorite])

  useEffect(() => {
    toggleShowAuthorizedText(!isAuthorized)
  }, [isAuthorized])

  return (
    <div className={styles.ProductBaseInfo}>
      <span className={styles.ProductCode}>код товара: {id}</span>
      <div className={styles.ProductVolume}>
        <span>объем / мл</span>
        <div className={styles.VolumeItem}>{volume.title.slice(0, 2)}</div>
      </div>
      <div className={styles.PriceContainer}>
        <div className={styles.PriceBlock}>
          <span className={styles.Discount}>
            {priceWithDiscount || price} ₽
          </span>
          {discount?.value && (
            <span className={styles.DiscountTitle}>
              со скидкой {discount?.value}%
            </span>
          )}
        </div>
        {!!priceWithDiscount && (
          <div className={styles.PriceBlock}>
            <span className={styles.OldPrice}>{price} ₽</span>
            <span className={styles.OldPriceTitle}>без скидки</span>
          </div>
        )}
      </div>
      {showAuthorizedText && (
        <div className={styles.AuthContainer}>
          <Svg className={styles.InfoSvg} name='info-icon' />
          <span>авторизируйся и получай бонусы</span>
        </div>
      )}
      <div className={styles.ButtonContainer}>
        <Button
          className={styles.CartButton}
          variant='black'
          onClick={() => addToCartRequest(id)}
          disabled={isAddedToCart}
        >
          {isAddedToCart ? 'добавлено в корзину' : 'добавить в корзину'}
        </Button>
        <IconButton
          className={classNames(
            styles.HeartButton,
            actuallyFavorite && styles.Favorite,
          )}
          onClick={handleAddToFavorites}
          strokePath
        >
          <Svg className={styles.HeartIcon} name='heart-icon' />
        </IconButton>
      </div>
    </div>
  )
}

export default React.memo(ProductBaseInfo)
