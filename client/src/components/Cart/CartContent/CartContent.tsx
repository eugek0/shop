import React, { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { CartApi } from '../../../api/cart.api'
import CartCard from '../../CartCard/CartCard'
import Button from '../../UI/Button/Button'

import styles from '../cart.module.scss'
import { useModalContext } from '../../../helpers/context/ModalContext'

const { qkGetCart, getCart } = CartApi

const CartContent = () => {
  const router = useRouter()

  const { data: cartCatalog = [] } = useQuery(qkGetCart, getCart)

  const { setOpenedDrawer } = useModalContext()

  const { discount, price } = useMemo(
    () =>
      cartCatalog.reduce(
        (acc, { priceDiscount, priceWithDiscount, price: oldPrice }) => ({
          discount: acc.discount + priceDiscount,
          price: acc.price + (priceWithDiscount || oldPrice),
        }),
        { discount: 0, price: 0 },
      ),
    [cartCatalog],
  )

  const foundMissingItems = useMemo(
    () => !!cartCatalog.find(({ maxCount }) => !maxCount),
    [cartCatalog],
  )

  const handleProceedToCheckout = () => {
    setOpenedDrawer(null)
    router.push('/ordering')
  }

  return (
    <div className={styles.Content}>
      <div className={styles.Catalog}>
        {cartCatalog.map((el) => (
          <CartCard key={el.id} product={el} />
        ))}
      </div>
      <div className={styles.InfoContainer}>
        <div className={styles.PriceContainer}>
          {!!discount && (
            <div className={styles.PriceBox}>
              <span className={styles.PriceTitle}>скидка:</span>
              <span className={styles.Sale}>{`-${discount} ₽`}</span>
            </div>
          )}
          <div className={styles.PriceBox}>
            <span className={styles.PriceTitle}>итого:</span>
            <span className={styles.Price}>{`${price} ₽`}</span>
          </div>
        </div>
        <Button
          className={styles.Button}
          variant='black'
          disabled={!cartCatalog.length || foundMissingItems}
          onClick={handleProceedToCheckout}
        >
          оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default CartContent
