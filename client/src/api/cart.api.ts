import { configuredAxios } from '../helpers/intersepter/intersepter'
import { CartItem } from '../assets/models/cart'

export abstract class CartApi {
  static qkGetCart = ['get-cart']

  static async getCart(): Promise<CartItem[]> {
    const { data } = await configuredAxios.get('/cart')
    return data
  }

  static async addToCart(productId: string) {
    const { data } = await configuredAxios.post('/cart', { productId })

    return data
  }

  static async updateCart({ id, count }: { id: string; count: number }) {
    const { data } = await configuredAxios.patch('/cart', { id, count })

    return data
  }

  static async deleteFromCart(id: string) {
    const { data } = await configuredAxios.delete(`/cart?id=${id}`)

    return data
  }
}
