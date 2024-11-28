import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import Orders from '../../../components/pages/Orders/Orders'
import { checkAuthorization } from '../../../helpers/functions/checkAuthorization'
import { OrderApi } from '../../../api/order.api'

const { qkGetOrders, getOrders } = OrderApi

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated } = checkAuthorization(context)

  if (!isAuthenticated)
    return {
      props: {},
    }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(qkGetOrders, getOrders)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const OrdersPage = () => {
  const { data: cachedOrders = [] } = useQuery(qkGetOrders, getOrders)

  return (
    <>
      <Head>
        <title>История заказов</title>
      </Head>
      <Orders orders={cachedOrders} />
    </>
  )
}

export default OrdersPage
