import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import classNames from 'classnames'
import styles from './select.module.scss'
import Button from '../Button/Button'
import Svg from '../Svg/Svg'
import IconButton from '../IconButton/IconButton'

interface Option {
  value: string
  label: string
}

export interface SelectValue {
  key: string
  value: string
}

interface SelectProps {
  options?: Option[]
  value?: SelectValue
  onChange: (value: Option) => void
  onClearValue?: (key?: string) => void
  selected?: boolean
  children?: ReactNode
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  onClearValue,
  selected,
  children,
}) => {
  const divRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: Option) => {
    onChange(option)
    setIsOpen(false)
  }

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const handleClearValue = useCallback(() => {
    if (!onClearValue) return

    setIsOpen(false)
    onClearValue(value?.key)
  }, [value, onClearValue])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div ref={divRef} className={styles.Select}>
      <span className={styles.Selected}>
        <button className={styles.Text} type='button' onClick={handleClick}>
          {value?.value || 'Выберите значение'}{' '}
        </button>
        {selected && onClearValue && (
          <IconButton className={styles.Reset} onClick={handleClearValue}>
            <Svg name='close-icon' />
          </IconButton>
        )}
      </span>
      <div className={classNames(styles.Options, { [styles.Open]: isOpen })}>
        {children ||
          options?.map((option) => (
            <Button
              key={option.value}
              variant='white'
              className={styles.Option}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </Button>
          ))}
      </div>
    </div>
  )
}

export default Select
