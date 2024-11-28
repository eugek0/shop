import React, { useState } from 'react'
import classNames from 'classnames'

import styles from './checkbox.module.scss'

interface CheckboxProps {
  isChecked: boolean
  toggleChecked: (value: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, toggleChecked }) => (
  <div className={styles.Container} onClick={() => toggleChecked(!isChecked)}>
    <input
      defaultChecked={isChecked}
      className={styles.Checkbox}
      type='checkbox'
    />
    <div
      className={classNames(
        styles.Checked,
        styles[isChecked ? 'Show' : 'Hidden'],
      )}
    />
  </div>
)

export default Checkbox
