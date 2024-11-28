import React, { useCallback } from 'react'

import Image from 'next/image'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { FILES_URL } from '../../helpers/constants/baseUrl'
import DescriptionTable from '../pages/Product/ProductAdditionalInfo/DescriptionTable/DescriptionTable'
import { CompleteOrderItem } from '../../assets/models/order'
import styles from './completeOrderCard.module.scss'
import Flag from '../UI/Flag/Flag'

interface CompletedOrderCardProps {
  order: CompleteOrderItem
}

const CompletedOrderCard: React.FC<CompletedOrderCardProps> = ({ order }) => {
  const {
    products,
    totalPrice,
    totalPriceWithDiscount,
    totalPriceDiscount,
    createdAt,
    status,
    id,
  } = order

  const router = useRouter()

  const productsQuantity = products?.length

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

  const openOrder = useCallback(() => {
    router.push(`/profile/orders/${id}`)
  }, [id])

  return (
    <div className={styles.Card} onClick={openOrder}>
      <div className={styles.Head}>
        <div className={styles.BaseInfo}>
          <span>
            {createdAt && format(new Date(createdAt), 'dd.MM.yyyy')} /{' '}
            {productsQuantity}
            шт.
          </span>
          <span className={styles.Status}>{status?.title}</span>
        </div>
        <span className={styles.OrderId}>{id}</span>
      </div>
      <div className={styles.ImagesContainer}>
        {products?.map(
          ({ id: productId, count, product: { preview, title } }) => (
            <div key={productId} className={styles.ImageContainer}>
              <Image
                className={styles.Image}
                src={`${FILES_URL}${preview}`}
                alt={title}
                width={116}
                height={116}
              />
              <Flag value={count} color='bronze' position='center' />
            </div>
          ),
        )}
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

export default CompletedOrderCard
