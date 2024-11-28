import { ProductItem } from './catalog'

export interface CartItem {
  id: string
  count: number
  maxCount: number
  price: number
  priceDiscount: number
  priceWithDiscount: number
  product: ProductItem
}
