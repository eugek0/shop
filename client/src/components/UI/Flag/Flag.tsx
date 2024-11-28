import React from 'react'

import classNames from 'classnames'
import styles from './flag.module.scss'

interface FlagProps {
  value?: string | number
  show?: boolean
  color?: 'blue' | 'bronze'
  position?: 'bottom' | 'center'
  className?: string
}

const Flag: React.FC<FlagProps> = ({
  value,
  show = true,
  className,
  color = 'blue',
  position = 'bottom',
}) =>
  show ? (
    <div
      className={classNames(
        styles.Flag,
        styles[color],
        styles[position],
        className,
      )}
    >
      {value}
    </div>
  ) : null

export default Flag
