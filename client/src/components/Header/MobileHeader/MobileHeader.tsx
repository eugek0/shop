import React from 'react'
import Svg from '../../UI/Svg/Svg'
import IconButton from '../../UI/IconButton/IconButton'
import { HeaderDrawer } from '../../../assets/models/headerDrawer'

import styles from './mobileHeader.module.scss'

interface MobileHeaderProps {
  openedDrawer: HeaderDrawer | null
  onChangeOpenedDrawer: (key: HeaderDrawer) => void
  onOpenPage: (route: string, params?: { private?: boolean }) => void
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  openedDrawer,
  onChangeOpenedDrawer,
  onOpenPage,
}) => {
  const { SEARCH, LOGIN, CART } = HeaderDrawer
  return (
    <header className={styles.Header}>
      <div className={styles.Content}>
        <IconButton
          onClick={() => onOpenPage('/profile/favorites', { private: true })}
        >
          <Svg className={styles.NavSvg} name='favorites-icon' />
        </IconButton>
        <IconButton onClick={() => onChangeOpenedDrawer(CART)}>
          <Svg className={styles.NavSvg} name='cart-icon' />
        </IconButton>
        <IconButton onClick={() => onOpenPage('/')}>
          <Svg className={styles.Logo} name='ups-image-logo' />
        </IconButton>
        <IconButton onClick={() => onChangeOpenedDrawer(SEARCH)}>
          <Svg
            className={styles.NavSvg}
            name={openedDrawer === SEARCH ? 'close-icon' : 'search-icon'}
          />
        </IconButton>
        <IconButton
          onClick={() => onOpenPage('/profile/personalInfo', { private: true })}
        >
          <Svg
            className={styles.NavSvg}
            name={openedDrawer === LOGIN ? 'close-icon' : 'user-icon'}
          />
        </IconButton>
      </div>
    </header>
  )
}

export default MobileHeader
