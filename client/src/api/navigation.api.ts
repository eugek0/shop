import { configuredAxios } from '../helpers/intersepter/intersepter'
import { NavigationItem } from '../assets/models/navigation'

export abstract class NavigationApi {
  static qkGetNavigation = ['get-navigation']

  static async getNavigation(): Promise<NavigationItem[]> {
    const { data = [] } = await configuredAxios.get('/navigation/main')

    const filteredObj = data.map((item: NavigationItem) => ({
      ...item,
      params: Object.entries(item.params).reduce((acc, [key, value]) => {
        if (value) {
          // @ts-ignore
          acc[key] = value
        }
        return acc
      }, {}),
    }))

    return filteredObj
  }
}
