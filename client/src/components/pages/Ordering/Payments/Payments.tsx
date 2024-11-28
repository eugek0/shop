import React, { useCallback, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Button from '../../../UI/Button/Button'
import { useOrderContext } from '../context/OrderContext'
import { OrderApi } from '../../../../api/order.api'

import styles from './payments.module.scss'
import { CartApi } from '../../../../api/cart.api'
import { FavoritesApi } from '../../../../api/favorites.api'
import SuccessfulPurchase from '../../../UI/SuccessfulPurchase/SuccessfulPurchase'
import { useToggleState } from '../../../../helpers/hooks/useToggleState'

const { placeOrder, qkGetOrders } = OrderApi
const { qkGetCart } = CartApi
const { qkGetFavorites } = FavoritesApi

const Payments = () => {
  const { setOrderRequestData, orderRequestData } = useOrderContext()

  const {
    orderForm: { payments },
  } = useOrderContext()

  const [paymentId, setPaymentId] = useState(payments[0]?.id)
  const [showModal, toggleShowModal] = useToggleState(false)

  const queryClient = useQueryClient()

  const { mutate: placeOrderRequest } = useMutation(placeOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(qkGetCart)
      queryClient.invalidateQueries(qkGetFavorites)
      queryClient.invalidateQueries(qkGetOrders)
      toggleShowModal(true)
    },
  })

  const handleChangePayment = useCallback(
    (id: string) => {
      setPaymentId(id)
    },
    [setPaymentId],
  )

  const handlePlaceOrder = useCallback(() => {
    placeOrderRequest(orderRequestData)
  }, [orderRequestData, placeOrderRequest])

  useEffect(() => {
    setOrderRequestData((prev) => ({ ...prev, paymentId }))
  }, [paymentId, setOrderRequestData])

  return (
    <>
      <div className={styles.Content}>
        {payments.map(({ id, title }) => (
          <div
            key={id}
            className={styles.Payment}
            onClick={() => handleChangePayment(id)}
          >
            {/* todo: Заменить на комопнент Ratio, когда будут реализованы другие способы оплаты  */}
            <div className={styles.Ratio} />
            {title}
          </div>
        ))}
        <Button
          className={styles.OrderButton}
          variant='black'
          onClick={handlePlaceOrder}
        >
          оформить заказ
        </Button>
      </div>
      {showModal && (
        <SuccessfulPurchase closeModal={() => toggleShowModal(false)} />
      )}
    </>
  )
}

export default Payments
