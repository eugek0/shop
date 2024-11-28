import React from 'react'

import classNames from 'classnames'
import styles from './orderAccordionTitle.module.scss'

interface OrderAccordionTitleProps {
  step: string
  title: string
  disabled?: boolean
  filled?: boolean
}

const OrderAccordionTitle: React.FC<OrderAccordionTitleProps> = ({
  step,
  title,
  disabled,
  filled,
}) => (
  <div className={styles.Item}>
    <span
      className={classNames(
        styles.Text,
        disabled && styles.Disabled,
        filled && styles.Filled,
      )}
    >
      {step}
    </span>
    <span
      className={classNames(
        styles.Text,
        disabled && styles.Disabled,
        filled && styles.Filled,
      )}
    >
      {title}
    </span>
  </div>
)

export default OrderAccordionTitle
