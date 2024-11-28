import { CatalogResult, ProductDetailedItem } from '../assets/models/catalog'
import { configuredAxios } from '../helpers/intersepter/intersepter'

export interface FilterParams {
  order?: string | string[]
  volumeId?: string | string[]
  typeId?: string | string[]
  genderId?: string | string[]
  motiveId?: string | string[]
  colorId?: string | string[]
  minPrice?: string | string[]
  maxPrice?: string | string[]
}

interface CatalogParams {
  title?: string
  page?: number
  limit?: number
  filter?: FilterParams
}

export abstract class CatalogApi {
  static qkGetCatalog = (params?: CatalogParams) =>
    [
      'get-catalog',
      params?.title || '',
      params?.page || '',
      params?.limit || '',
      params?.filter?.order || '',
      params?.filter?.volumeId || '',
      params?.filter?.typeId || '',
      params?.filter?.genderId || '',
      params?.filter?.motiveId || '',
      params?.filter?.colorId || '',
      params?.filter?.minPrice || '',
      params?.filter?.maxPrice || '',
    ] as const

  static async getCatalog(params?: CatalogParams): Promise<CatalogResult> {
    const { data } = await configuredAxios.get<CatalogResult>('/products', {
      params: {
        title: params?.title,
        page: params?.page,
        limit: params?.limit,
        ...params?.filter,
      },
    })

    return data
  }

  static qkGetProduct = (id: string) => ['get-products', id] as const

  static async getProduct(id: string): Promise<ProductDetailedItem> {
    const { data } = await configuredAxios.get<ProductDetailedItem>(
      `/products/current?id=${id}`,
    )

    return data
  }
}
