import React, { useState, useCallback, ChangeEvent, useEffect } from 'react'
import { Slider } from '@mui/material'
import styles from './rangeSlider.module.scss'
import { useStyles } from './muiStyles'
import useDebounce from '../../../helpers/hooks/useDebounce'

interface RangeSliderProps {
  min: number
  max: number
  defaultValue?: number[]
  onChange?: (event: Event, value: number | number[]) => void
  onChangeCommitted?: (value: number | number[]) => void
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  defaultValue,
  onChange,
  onChangeCommitted,
}) => {
  const classes = useStyles()
  const [value, setValue] = useState(defaultValue || [min, max])

  const debouncedValue = useDebounce(value, 500)

  const handleMinInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let newValue = parseInt(event.target.value, 10)
      if (newValue < min) {
        newValue = min
      } else if (newValue > value[1]) {
        // eslint-disable-next-line prefer-destructuring
        newValue = value[1]
      }
      setValue((prev) => [newValue, prev[1]])
    },
    [min, value, onChange],
  )

  const handleMaxInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let newValue = parseInt(event.target.value, 10)
      if (newValue > max) {
        newValue = max
      } else if (newValue < value[0]) {
        // eslint-disable-next-line prefer-destructuring
        newValue = value[0]
      }
      setValue((prev) => [prev[0], newValue])
    },
    [max, value, onChange],
  )

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  useEffect(() => {
    setValue(defaultValue || [min, max])
  }, [defaultValue, min, max])

  useEffect(() => {
    if (!onChangeCommitted) return

    onChangeCommitted(debouncedValue)
  }, [debouncedValue])

  return (
    <div className={styles.rangeSlider}>
      <div className={styles.Inputs}>
        <span>от</span>
        <input
          type='number'
          className={styles.input}
          min={min}
          max={max}
          value={value[0]}
          onChange={handleMinInputChange}
        />
        <span>до</span>
        <input
          type='number'
          className={styles.input}
          min={min}
          max={max}
          value={value[1]}
          onChange={handleMaxInputChange}
        />
        <span>₽</span>
      </div>
      <Slider
        className={styles.slider}
        classes={classes}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default RangeSlider
