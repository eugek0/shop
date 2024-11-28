import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import Button from '../../UI/Button/Button'
import { HeaderVariant } from '../../../assets/models/headerVariant'
import Svg from '../../UI/Svg/Svg'
import { useToggleState } from '../../../helpers/hooks/useToggleState'
import IconButton from '../../UI/IconButton/IconButton'
import { HeaderDrawer } from '../../../assets/models/headerDrawer'
import { NavigationApi } from '../../../api/navigation.api'
import { NavigationFilterParams } from '../../../assets/models/navigation'

import styles from './desktopHeader.module.scss'

const { qkGetNavigation, getNavigation } = NavigationApi

interface DesktopHeaderProps {
  variant?: HeaderVariant
  openedDrawer: HeaderDrawer | null
  onChangeOpenedDrawer: (key: HeaderDrawer) => void
  onOpenPage: (route: string, params?: { private?: boolean }) => void
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  variant,
  openedDrawer,
  onChangeOpenedDrawer,
  onOpenPage,
}) => {
  const [isHover, toggleHover] = useToggleState(false)

  const router = useRouter()

  const { data: navigation = [] } = useQuery(qkGetNavigation, getNavigation)

  const { SEARCH, LOGIN, CART } = HeaderDrawer

  const finalVariant = useMemo(
    () => (isHover || openedDrawer ? 'white' : variant),
    [isHover, variant],
  )

  const handleOpenCatalog = useCallback(
    (params: NavigationFilterParams) => {
      router.push({ pathname: '/catalog', query: { ...params } })
    },
    [router],
  )

  return (
    <header
      onMouseOver={() => toggleHover(true)}
      onFocus={() => toggleHover(true)}
      onMouseOut={() => toggleHover(false)}
      onBlur={() => toggleHover(false)}
      className={styles[`Header_${finalVariant}`]}
    >
      <div className={styles.Content}>
        <IconButton className={styles.Logo} onClick={() => router.push('/')}>
          <Svg name='ups-text-logo' />
        </IconButton>
        <div className={styles.Navigation}>
          <IconButton onClick={() => onChangeOpenedDrawer(SEARCH)}>
            <Svg
              className={styles.NavSvg}
              name={openedDrawer === SEARCH ? 'close-icon' : 'search-icon'}
            />
          </IconButton>
          <IconButton
            onClick={() =>
              onOpenPage('/profile/personalInfo', { private: true })
            }
          >
            <Svg
              className={styles.NavSvg}
              name={openedDrawer === LOGIN ? 'close-icon' : 'user-icon'}
            />
          </IconButton>
          <IconButton
            onClick={() => onOpenPage('/profile/favorites', { private: true })}
          >
            <Svg className={styles.NavSvg} name='favorites-icon' />
          </IconButton>
          <IconButton onClick={() => onChangeOpenedDrawer(CART)}>
            <Svg className={styles.NavSvg} name='cart-icon' />
          </IconButton>
        </div>
      </div>
      <nav className={styles.BottomNav}>
        {navigation.map(({ title, id, params }) => (
          <Button
            key={id}
            className={styles.NavButton}
            variant={finalVariant}
            onClick={() => handleOpenCatalog(params)}
          >
            {title}
          </Button>
        ))}
      </nav>
    </header>
  )
}

DesktopHeader.defaultProps = {
  variant: 'white',
}

export default DesktopHeader
