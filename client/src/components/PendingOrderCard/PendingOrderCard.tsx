import React from 'react'

import Image from 'next/image'
import styles from './pendingOrderCard.module.scss'
import { useOrderContext } from '../pages/Ordering/context/OrderContext'
import { FILES_URL } from '../../helpers/constants/baseUrl'
import DescriptionTable from '../pages/Product/ProductAdditionalInfo/DescriptionTable/DescriptionTable'
import Flag from '../UI/Flag/Flag'

const PendingOrderCard = () => {
  const { orderForm } = useOrderContext()

  const { products, totalPrice, totalPriceWithDiscount, totalPriceDiscount } =
    orderForm

  const productsQuantity = products.length

  const tableData = [
    {
      title: 'сумма заказа',
      description: `${totalPrice} ₽`,
    },
    {
      title: 'доставка',
      description: 'не указано',
    },
    {
      title: 'скидка',
      description: totalPriceDiscount ? `-${totalPriceDiscount} ₽` : `0 ₽`,
    },
  ]

  return (
    <div className={styles.Card}>
      <div>ваш заказ / {productsQuantity}шт.</div>
      <div className={styles.ImagesContainer}>
        {products.map(({ id, count, product: { preview, title } }) => (
          <div key={id} className={styles.ImageContainer}>
            <Image
              className={styles.Image}
              src={`${FILES_URL}${preview}`}
              alt={title}
              width={116}
              height={116}
            />
            <Flag value={count} color='bronze' position='center' />
          </div>
        ))}
      </div>
      <DescriptionTable className={styles.Table} array={tableData} />
      <div className={styles.FinalPriceContainer}>
        <span className={styles.FinalText}>ИТОГО</span>
        <span className={styles.FinalPrice}>
          {totalPriceWithDiscount || 0} ₽
        </span>
      </div>
    </div>
  )
}

export default PendingOrderCard
