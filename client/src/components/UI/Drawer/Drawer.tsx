import React, {
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react'

import classNames from 'classnames'
import styles from './drawer.module.scss'
import Svg from '../Svg/Svg'
import IconButton from '../IconButton/IconButton'
import { useToggleState } from '../../../helpers/hooks/useToggleState'

interface DrawerProps {
  isOpened: boolean
  setIsOpened?: React.Dispatch<SetStateAction<boolean>>
  title: string
  children: ReactNode
  position?: 'top' | 'left' | 'right' | 'bottom'
  hideClose?: boolean
  className?: string
  headClassName?: string
  zIndex?: number
}

const Drawer: React.FC<DrawerProps> = ({
  isOpened,
  setIsOpened,
  title,
  children,
  position,
  hideClose,
  className,
  headClassName,
  zIndex,
}) => {
  const [isHide, toggleHide] = useToggleState(true)

  const closeDrawer = useCallback(() => {
    if (!setIsOpened) return
    setIsOpened(false)
  }, [isOpened, setIsOpened])

  const toggleStyles = useMemo(() => (isOpened ? 'Show' : 'Hide'), [isOpened])

  useEffect(() => {
    const body = document.querySelector('body')

    if (!body) return

    if (isOpened) {
      toggleHide(!isOpened)
      body.style.overflowY = 'hidden'
    } else {
      setTimeout(() => toggleHide(!isOpened), 400)
      body.style.overflowY = 'auto'
    }
  }, [isOpened])

  return isHide ? null : (
    <div
      className={classNames(styles[`Background${toggleStyles}`])}
      style={{ zIndex }}
    >
      <div
        className={classNames(
          styles.Drawer,
          styles[`Drawer${toggleStyles}_${position}`],
          className,
        )}
      >
        <div className={classNames(styles.Head, headClassName)}>
          <span className={styles.Title}>{title}</span>
          {!hideClose && (
            <IconButton onClick={closeDrawer}>
              <Svg name='close-icon' />
            </IconButton>
          )}
        </div>
        <div className={styles.Content}>{children}</div>
      </div>
    </div>
  )
}

Drawer.defaultProps = {
  position: 'left',
  zIndex: 8,
}

export default Drawer
