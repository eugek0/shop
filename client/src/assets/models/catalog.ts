export interface CatalogCategory {
  id: string
  title: string
}

export interface HistoryPoint {
  value: string
  createdAt: string
}

export interface ProductItemType {
  id: string
  lowNotes: string
  middleNotes: string
  sentiment: string
  title: string
  topNotes: string
}

export interface Gender extends CatalogCategory {
  abbreviation: string
}

export interface Discount extends CatalogCategory {
  value: number
}

export interface ProductItem {
  discount: Discount
  gender: Gender
  motive: CatalogCategory
  volume: CatalogCategory
  preview: string
  price: number
  priceDiscount: number
  priceWithDiscount: number
  quantity: number
  title: string
  isFavorite: boolean
  id: string
  isAddedToCart: boolean
}

export interface ProductDetailedItem extends ProductItem {
  color: CatalogCategory
  description: string
  history: HistoryPoint[]
  images: string[]
  type: ProductItemType
}

export interface CatalogResult {
  count: number
  page: number
  limit: number
  rows: ProductItem[]
}
