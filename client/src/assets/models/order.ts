import { CartItem } from './cart'

export interface RecipientFields {
  firstName: string
  lastName: string
  middleName: string
  email: string
  phone: string
}

export interface OrderCategory {
  id: string
  title: string
}

export interface OrderItem {
  id: string
  createdAt: string
  totalPrice: string
  totalPriceDiscount: string
  totalPriceWithDiscount: string
  recipient: RecipientFields
  products: CartItem[]
  payments: OrderCategory[]
  deliveries: OrderCategory[]
}

export interface CompleteOrderItem extends OrderItem {
  id: string
  createdAt: string
  status: OrderCategory
}

export interface PlaceOrderRequestData {
  paymentId: string
  deliveryId: string
  recipient: RecipientFields
}
