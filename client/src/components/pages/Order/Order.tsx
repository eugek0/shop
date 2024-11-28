import React, { useMemo } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CompleteOrderItem } from '../../../assets/models/order'

import styles from './order.module.scss'
import { FILES_URL } from '../../../helpers/constants/baseUrl'
import DescriptionTable from '../Product/ProductAdditionalInfo/DescriptionTable/DescriptionTable'
import Flag from '../../UI/Flag/Flag'

interface OrderProps {
  order: CompleteOrderItem
}

const Order: React.FC<OrderProps> = ({ order }) => {
  const {
    id: orderId,
    status,
    createdAt,
    products,
    totalPrice,
    totalPriceDiscount,
    totalPriceWithDiscount,
  } = order

  const productsQuantity = products?.length

  const tableData = useMemo(
    () => [
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
    ],
    [totalPriceDiscount, totalPrice],
  )

  const baseInfo = useMemo(
    () => [
      {
        id: '11',
        title: 'время оформления заказа',
        value: format(new Date(createdAt), "d MMMM yyyy 'года в' HH:mm ", {
          locale: ru,
        }),
      },
      { id: '33', title: 'статус заказа', value: status?.title },
      { id: '22', title: 'количество позиций', value: productsQuantity },
    ],
    [productsQuantity, createdAt, status],
  )

  return (
    <div className={styles.Content}>
      <span className={styles.OrderId}>№ {orderId}</span>
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
      <div className={styles.BaseInfo}>
        {baseInfo.map(({ id, title, value }) => (
          <div key={id} className={styles.InfoItem}>
            <span className={styles.InfoTitle}>{title}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className={styles.PriceContainer}>
        <DescriptionTable className={styles.Table} array={tableData} />
        <div className={styles.FinalPriceContainer}>
          <span className={styles.FinalText}>ИТОГО</span>
          <span className={styles.FinalPrice}>
            {totalPriceWithDiscount || 0} ₽
          </span>
        </div>
      </div>
    </div>
  )
}

export default Order
