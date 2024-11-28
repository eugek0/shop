import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Svg from '../Svg/Svg'
import IconButton from '../IconButton/IconButton'

import styles from './successfulPurchase.module.scss'

interface SuccessfulPurchaseProps {
  closeModal?: () => void
}

const SuccessfulPurchase: React.FC<SuccessfulPurchaseProps> = ({
  closeModal,
}) => {
  const router = useRouter()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push('/profile/orders')
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
      router.push('/profile/orders')
    }
  }, [])

  return (
    <div className={styles.Background}>
      <div className={styles.Modal}>
        <IconButton className={styles.Button} onClick={closeModal}>
          <Svg className={styles.CloseIcon} name='close-icon' />
        </IconButton>
        <span className={styles.Title}>Спасибо за покупку!</span>
        <span className={styles.Subtitle}>
          Вы можете отслеживать статус заказа на странице заказов
        </span>
        <div className={styles.Line} />
      </div>
    </div>
  )
}

export default SuccessfulPurchase
