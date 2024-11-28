import React, { useMemo } from 'react'
import Head from 'next/head'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Order from '../../../components/pages/Order/Order'
import { OrderApi } from '../../../api/order.api'
import { checkAuthorization } from '../../../helpers/functions/checkAuthorization'
import styles from '../../../components/pages/Order/order.module.scss'
import Page from '../../../components/Page/Page'
import ProfileLayout from '../../../components/ProfileLayout/ProfileLayout'

const { qkGetOrder, getOrder, qkGetOrders, getOrders } = OrderApi

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated } = checkAuthorization(context)

  if (!isAuthenticated)
    return {
      props: {},
    }

  const { id } = context.params as any
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(qkGetOrder(id), () =>
    getOrder({ id, context }),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const OrderPage = () => {
  const { query, asPath } = useRouter()
  const { data: cachedOrder } = useQuery(qkGetOrder(query?.id as string), () =>
    getOrder({ id: query?.id as string }),
  )

  const breadCrumbsItems = useMemo(
    () => [
      {
        href: '/profile/orders',
        name: `заказы`,
      },
      {
        href: asPath,
        name: `заказ №${cachedOrder?.id.slice(0, 12)}...`,
      },
    ],
    [cachedOrder, asPath],
  )

  return (
    <>
      <Head>
        <title>Заказ</title>
      </Head>
      <Page className={styles.OrderPage} wrapper>
        <ProfileLayout title='заказ' breadCrumbsItems={breadCrumbsItems}>
          {cachedOrder && <Order order={cachedOrder} />}
        </ProfileLayout>
      </Page>
    </>
  )
}

export default OrderPage
