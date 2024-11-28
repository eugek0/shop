import React, { useCallback, useMemo } from 'react'

import { useRouter } from 'next/router'
import styles from './ordering.module.scss'
import PendingOrderCard from '../../PendingOrderCard/PendingOrderCard'
import Accordion from '../../UI/Accordion/Accordion'
import OrderAccordionTitle from './OrderAccordionTitle/orderAccordionTitle'
import AddressAndDelivery from './AddressAndDelivery/AddressAndDelivery'
import Recipient from './Recipient/Recipient'
import Payments from './Payments/Payments'
import { useOrderContext } from './context/OrderContext'
import Svg from '../../UI/Svg/Svg'
import IconButton from '../../UI/IconButton/IconButton'
import { useModalContext } from '../../../helpers/context/ModalContext'
import { HeaderDrawer } from '../../../assets/models/headerDrawer'

const { CART } = HeaderDrawer

const Ordering = () => {
  const router = useRouter()
  const { setOpenedDrawer } = useModalContext()

  const {
    orderForm,
    validityList: { recipient, addressAndDelivery },
  } = useOrderContext()

  const accordionContent = useMemo(
    () => [
      {
        id: '111',
        title: (
          <OrderAccordionTitle
            step='1/3'
            title='адрес и доставка'
            filled={addressAndDelivery}
          />
        ),
        content: <AddressAndDelivery />,
      },
      {
        id: '222',
        title: (
          <OrderAccordionTitle
            step='2/3'
            title='получатель'
            disabled={!addressAndDelivery}
            filled={recipient}
          />
        ),
        content: <Recipient />,
        disabled: !addressAndDelivery,
      },
      {
        id: '333',
        title: (
          <OrderAccordionTitle
            step='3/3'
            title='оплата'
            disabled={!recipient || !addressAndDelivery}
          />
        ),
        content: <Payments />,
        disabled: !recipient || !addressAndDelivery,
      },
    ],
    [orderForm, recipient, addressAndDelivery],
  )

  const routeBack = useCallback(() => {
    router.push('/')
    setOpenedDrawer(CART)
  }, [router])

  return (
    <main className={styles.OrderPage}>
      <IconButton onClick={routeBack}>
        <Svg className={styles.BackIcon} name='arrow-left' />
      </IconButton>
      <div className={styles.Content}>
        <Accordion
          className={styles.OrderAccordion}
          items={accordionContent}
          border={false}
          allActive
          requiredOpen
        />
      </div>
      <PendingOrderCard />
    </main>
  )
}

export default Ordering
