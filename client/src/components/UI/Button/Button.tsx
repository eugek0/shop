import React from 'react'
import classNames from 'classnames'

import { UrlObject } from 'url'
import Link from 'next/link'
import styles from './button.module.scss'

interface ButtonProps<T extends 'button' | 'link'> {
  children?: string
  variant?: 'white' | 'black' | 'transparent'
  as?: T
  href?: T extends 'link' ? UrlObject | string : never
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const Button: React.FC<ButtonProps<'button' | 'link'>> = ({
  children,
  variant = 'white',
  onClick,
  className,
  as = 'button',
  href = '',
  type = 'button',
  disabled = false,
}) => {
  if (as === 'link')
    return (
      <Link
        href={href}
        className={classNames(styles.Button, styles[variant], className)}
      >
        <span className={styles.Text}>{children}</span>
      </Link>
    )

  return (
    <button
      disabled={disabled}
      /* eslint-disable-next-line react/button-has-type */
      type={type}
      className={classNames(styles.Button, styles[variant], className)}
      onClick={onClick}
    >
      <span className={styles.Text}>{children}</span>
    </button>
  )
}

export default Button
