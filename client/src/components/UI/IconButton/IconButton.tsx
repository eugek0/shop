import React, { MouseEventHandler, ReactNode } from 'react'

import classNames from 'classnames'
import styles from './iconButton.module.scss'

interface IconButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  disabled?: boolean
  strokePath?: boolean
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  className,
  disabled = false,
  strokePath = false,
}) => (
  <button
    type='button'
    className={classNames(
      styles.IconButton,
      strokePath ? styles.StrokePath : styles.DefaultFill,
      className,
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)

export default IconButton
