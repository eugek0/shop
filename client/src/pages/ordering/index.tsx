import React from 'react'
import Head from 'next/head'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Ordering from '../../components/pages/Ordering/Ordering'
import { OrderApi } from '../../api/order.api'
import { checkAuthorization } from '../../helpers/functions/checkAuthorization'
import { OrderContextProvider } from '../../components/pages/Ordering/context/OrderContext'

const { qkGetOrderRequest, getOrderRequest } = OrderApi

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated } = checkAuthorization(context)

  if (!isAuthenticated)
    return {
      props: {},
    }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(qkGetOrderRequest, () =>
    getOrderRequest(context),
  )

  return {
    props: {},
  }
}

const OrderingPage = () => {
  const router = useRouter()

  const { data: cachedOrder } = useQuery(qkGetOrderRequest, () =>
    getOrderRequest(),
  )

  if (!cachedOrder) return router.back()

  return (
    <>
      <Head>
        <title>Оформление заказа</title>
      </Head>
      <OrderContextProvider value={cachedOrder}>
        <Ordering />
      </OrderContextProvider>
    </>
  )
}

export default OrderingPage
