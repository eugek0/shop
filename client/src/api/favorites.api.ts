import { GetServerSidePropsContext } from 'next'
import { configuredAxios } from '../helpers/intersepter/intersepter'
import { ProductItem } from '../assets/models/catalog'
import { getDynamicAxios } from '../helpers/functions/getDynamicIntersepter'

export abstract class FavoritesApi {
  static qkGetFavorites = ['get-favorites']

  static async getFavorites(
    context?: GetServerSidePropsContext,
  ): Promise<ProductItem[]> {
    if (context) {
      const { dynamicAxios } = getDynamicAxios(context)
      const { data } = await dynamicAxios.get('/favorites')
      return data
    }
    const { data } = await configuredAxios.get('/favorites')
    return data
  }

  static async addToFavorites(id: string) {
    const { data } = await configuredAxios.post(`/favorites?productId=${id}`)

    return data
  }

  static async deleteFromFavorites(id: string) {
    const { data } = await configuredAxios.delete(`/favorites?productId=${id}`)

    return data
  }
}
