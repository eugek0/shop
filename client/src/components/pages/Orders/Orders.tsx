import React from 'react'
import { useRouter } from 'next/router'
import Page from '../../Page/Page'
import ProfileLayout from '../../ProfileLayout/ProfileLayout'
import { CompleteOrderItem } from '../../../assets/models/order'
import CompleteOrderCard from '../../CompleteOrderCard/CompleteOrderCard'

import styles from './orders.module.scss'

interface OrdersProps {
  orders: CompleteOrderItem[]
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  const router = useRouter()

  const breadCrumbsItem = {
    href: router.asPath,
    name: `заказы`,
  }

  return (
    <Page className={styles.OrdersPage} wrapper>
      <ProfileLayout
        title='история заказов'
        breadCrumbsItems={[breadCrumbsItem]}
      >
        <div className={styles.Content}>
          {orders.map((order) => (
            <CompleteOrderCard key={order.id} order={order} />
          ))}
        </div>
      </ProfileLayout>
    </Page>
  )
}

export default Orders
