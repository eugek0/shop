import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import StepParagraph from '../StepParagraph/StepParagraph'
import styles from './addressAndDelivery.module.scss'
import { useOrderContext } from '../context/OrderContext'

const AddressAndDelivery = () => {
  const {
    orderForm: { deliveries },
    setValidityList,
    setOrderRequestData,
  } = useOrderContext()

  const [deliveryId, setDeliveryId] = useState<string | null>(null)

  const handleChangeDeliveryId = (id: string) => {
    setDeliveryId(id)
  }

  useEffect(() => {
    setValidityList((prev) => ({ ...prev, addressAndDelivery: !!deliveryId }))

    if (!deliveryId) return

    setOrderRequestData((prev) => ({ ...prev, deliveryId }))
  }, [deliveryId, setValidityList])

  return (
    <div className={styles.Content}>
      <StepParagraph title='населенный пункт'>
        <span>г. Ростов-на-Дону</span>
      </StepParagraph>
      <StepParagraph title='способ доставки'>
        <div className={styles.DeliveryContent}>
          {deliveries?.map(({ id, title }) => (
            <div
              key={id}
              className={classNames(
                styles.DeliveryItem,
                deliveryId === id && styles.Selected,
              )}
              onClick={() => handleChangeDeliveryId(id)}
            >
              {title}
            </div>
          ))}
        </div>
      </StepParagraph>
      <StepParagraph title='адрес доставки'>
        <span>г. Ростов-на-Дону, просп. Коммунистический, д. 10</span>
      </StepParagraph>
    </div>
  )
}

export default AddressAndDelivery
