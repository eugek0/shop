import React from 'react'
import Select from '../../../UI/Select/Select'
import { useFilterParams } from './hooks/useFilterParams'

import styles from './filter.module.scss'

const Filter = () => {
  const { filter, selectParams } = useFilterParams()

  return (
    <div className={styles.Filter}>
      {filter.map(({ label, value, key, selected, children, onClearValue }) => (
        <Select
          key={key}
          value={{ key, value: label }}
          options={value}
          onChange={(item) => selectParams(key, item.value)}
          onClearValue={onClearValue}
          selected={selected}
        >
          {children}
        </Select>
      ))}
    </div>
  )
}

export default Filter
