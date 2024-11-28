import React from 'react'

import styles from './cart.module.scss'
import Drawer from '../UI/Drawer/Drawer'
import CartContent from './CartContent/CartContent'

interface CartProps {
  isOpened: boolean
  onClose?: () => void
}

const Cart: React.FC<CartProps> = ({ isOpened, onClose }) => (
  <Drawer
    className={styles.Cart}
    headClassName={styles.CartHead}
    isOpened={isOpened}
    setIsOpened={onClose}
    title='КОРЗИНА'
    position='right'
    zIndex={12}
  >
    <CartContent />
  </Drawer>
)

export default Cart
