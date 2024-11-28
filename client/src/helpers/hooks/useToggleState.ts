import { useCallback, useState } from 'react'

export const useToggleState = (
  initialValue = false,
): [boolean, (value?: any) => void] => {
  const [isToggled, setToggle] = useState(initialValue)

  const handleToggle = useCallback((newValue: boolean) => {
    setToggle((prevValue) =>
      typeof newValue === 'boolean' ? newValue : !prevValue,
    )
  }, [])

  return [isToggled, handleToggle]
}
