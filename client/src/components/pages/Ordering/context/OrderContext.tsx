import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  OrderItem,
  PlaceOrderRequestData,
} from '../../../../assets/models/order'

interface ValidityList {
  addressAndDelivery: boolean
  recipient: boolean
}

interface OrderContextValue {
  orderForm: OrderItem
  setOrderForm: React.Dispatch<SetStateAction<OrderItem>>
  validityList: ValidityList
  setValidityList: React.Dispatch<SetStateAction<ValidityList>>
  orderRequestData: PlaceOrderRequestData
  setOrderRequestData: React.Dispatch<SetStateAction<PlaceOrderRequestData>>
}

const initialRequestData = {
  paymentId: '',
  deliveryId: '',
  recipient: {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
  },
}

export const OrderContext = createContext<OrderContextValue | null>(null)

interface OrderContextProviderProps {
  value: OrderItem
  children: ReactNode
}

export const OrderContextProvider: React.FC<OrderContextProviderProps> = ({
  children,
  value,
}) => {
  const [orderForm, setOrderForm] = useState<OrderItem>(value)
  const [orderRequestData, setOrderRequestData] =
    useState<PlaceOrderRequestData>(initialRequestData)
  const [validityList, setValidityList] = useState<ValidityList>({
    addressAndDelivery: false,
    recipient: false,
  })

  const contextValue = useMemo(
    () => ({
      orderForm,
      setOrderForm,
      validityList,
      setValidityList,
      orderRequestData,
      setOrderRequestData,
    }),
    [
      orderForm,
      setOrderForm,
      validityList,
      setValidityList,
      orderRequestData,
      setOrderRequestData,
    ],
  )

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrderContext = () => {
  const context = useContext(OrderContext)

  if (!context) {
    throw new Error(
      'useOrderContext must be used within a OrderContextProvider',
    )
  }
  return context
}
