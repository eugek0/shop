import { GetServerSidePropsContext } from 'next'
import { configuredAxios } from '../helpers/intersepter/intersepter'
import {
  CompleteOrderItem,
  OrderItem,
  PlaceOrderRequestData,
} from '../assets/models/order'
import { getDynamicAxios } from '../helpers/functions/getDynamicIntersepter'

export abstract class OrderApi {
  static qkGetOrderRequest = ['get-ordering-request']

  static qkGetOrders = ['get-orders']

  static async getOrderRequest(
    context?: GetServerSidePropsContext,
  ): Promise<OrderItem> {
    if (context) {
      const { dynamicAxios } = getDynamicAxios(context)
      const { data } = await dynamicAxios.get('/order/request')
      return data
    }
    const { data } = await configuredAxios.get('/order/request')
    return data
  }

  static async placeOrder(requestData: PlaceOrderRequestData) {
    const { data } = await configuredAxios.post('/order', requestData)
    return data
  }

  static async getOrders(): Promise<CompleteOrderItem[]> {
    const { data } = await configuredAxios.get('/order/all')
    return data
  }

  static qkGetOrder = (id: string) => ['get-orders', id] as const

  static async getOrder({
    id,
    context,
  }: {
    id: string
    context?: GetServerSidePropsContext
  }): Promise<CompleteOrderItem> {
    if (context) {
      const { dynamicAxios } = getDynamicAxios(context)
      const { data } = await dynamicAxios.get<CompleteOrderItem>(
        `/order?id=${id}`,
      )
      return data
    }
    const { data } = await configuredAxios.get<CompleteOrderItem>(
      `/order?id=${id}`,
    )
    return data
  }
}
