import React, { HTMLInputTypeAttribute } from 'react'
import classNames from 'classnames'
import { RegisterOptions } from 'react-hook-form'

import InputMask from 'react-input-mask'
import styles from './input.module.scss'
import { useToggleState } from '../../../helpers/hooks/useToggleState'

interface InputProps {
  placeholder?: string
  value: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: React.MouseEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  className?: string
  register?: ReturnType<any>['register']
  rules?: RegisterOptions
  error?: string | boolean
  type?: HTMLInputTypeAttribute
  maxLength?: number
  min?: number
  max?: number
  mask?: string
  maskPlaceholder?: string
}

const Input: React.FC<InputProps> = (props) => {
  const {
    placeholder,
    value,
    onChange,
    onClick,
    onBlur,
    className,
    name,
    register,
    rules,
    error,
    type,
    maxLength,
    min,
    max,
    mask,
    maskPlaceholder,
  } = props

  const [showErrorMessage, toggleShowErrorMessage] = useToggleState(false)

  return (
    <div className={classNames(styles.Container, className)}>
      <div className={styles.InputWrapper}>
        {!showErrorMessage ? (
          <>
            {mask ? (
              <InputMask
                className={styles.Input}
                onClick={onClick}
                onBlur={onBlur}
                value={value}
                mask={mask}
                min={min}
                max={max}
                placeholder={maskPlaceholder}
                onChange={onChange}
              />
            ) : (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <>
                {register && name ? (
                  <input
                    onClick={onClick}
                    value={value}
                    onBlur={onBlur}
                    type={type}
                    maxLength={maxLength}
                    min={min}
                    max={max}
                    className={styles.Input}
                    {...register(name, rules)}
                  />
                ) : (
                  <input
                    onClick={onClick}
                    name={name}
                    type={type}
                    value={value}
                    onBlur={onBlur}
                    maxLength={maxLength}
                    min={min}
                    max={max}
                    className={styles.Input}
                    onChange={onChange}
                  />
                )}
              </>
            )}
            {placeholder && (
              <span
                className={classNames(
                  styles.Label,
                  styles[error ? 'Error' : 'Valid'],
                )}
              >
                {placeholder}
              </span>
            )}
          </>
        ) : (
          <span
            className={classNames(
              styles.ErrorMessage,
              showErrorMessage && styles.ShowErrorMessage,
            )}
          >
            {error}
          </span>
        )}
        {error && typeof error === 'string' && (
          <div
            className={styles.ErrorIcon}
            onMouseOver={() => toggleShowErrorMessage(true)}
            onMouseOut={() => toggleShowErrorMessage(false)}
            onFocus={() => toggleShowErrorMessage(true)}
            onBlur={() => toggleShowErrorMessage(false)}
          >
            !
          </div>
        )}
      </div>
      <div
        className={classNames(styles.Border, styles[error ? 'Error' : 'Valid'])}
      />
    </div>
  )
}

export default Input
