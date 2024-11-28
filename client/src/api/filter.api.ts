import { CatalogCategory } from '../assets/models/catalog'
import { configuredAxios } from '../helpers/intersepter/intersepter'

export abstract class FilterApi {
  static qkGetGenders = ['get-genders']

  static async getGenders(): Promise<CatalogCategory[]> {
    const { data } = await configuredAxios.get('/filter/genders')

    return data
  }

  static qkGetMotives = ['get-motives']

  static async getMotives(): Promise<CatalogCategory[]> {
    const { data } = await configuredAxios.get('/filter/motives')

    return data
  }

  static qkGetVolumes = ['get-volumes']

  static async getVolumes(): Promise<CatalogCategory[]> {
    const { data } = await configuredAxios.get('/filter/volumes')

    return data
  }

  static qkGetTypes = ['get-types']

  static async getTypes(): Promise<CatalogCategory[]> {
    const { data } = await configuredAxios.get('/filter/types')

    return data
  }

  static qkGetColors = ['get-colors']

  static async getColors(): Promise<CatalogCategory[]> {
    const { data } = await configuredAxios.get('/filter/colors')

    return data
  }

  static qkGetOrders = ['get-orders']

  static async getOrders(): Promise<CatalogCategory[]> {
    const { data } = await configuredAxios.get('/filter/orders')

    return data
  }

  static qkGetPrices = ['get-prices']

  static async getPrices(): Promise<{ min: number; max: number }> {
    const { data } = await configuredAxios.get('/filter/prices')

    return data
  }
}
