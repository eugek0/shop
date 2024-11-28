import React, { useCallback, useEffect } from 'react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useWindowCoordinate } from '../../helpers/hooks/useWindowCoordinate'
import DesktopHeader from './DesktopHeader/DesktopHeader'
import MobileHeader from './MobileHeader/MobileHeader'
import { HeaderVariant } from '../../assets/models/headerVariant'
import { HeaderDrawer } from '../../assets/models/headerDrawer'
import Search from '../Search/Search'
import Login from '../Login/Login'
import { CookiesKeys } from '../../assets/models/cookiesKeys'
import { useToggleState } from '../../helpers/hooks/useToggleState'
import { useModalContext } from '../../helpers/context/ModalContext'
import Cart from '../Cart/Cart'

interface HeaderProps {
  variant?: HeaderVariant
}

const Header: React.FC<HeaderProps> = ({ variant }) => {
  const router = useRouter()
  const { openedDrawer, setOpenedDrawer } = useModalContext()
  const { windowX } = useWindowCoordinate()

  const { SEARCH, LOGIN, CART } = HeaderDrawer

  const [isAuthorized, toggleAuthorized] = useToggleState(false)

  const handleChangeOpenedDrawer = useCallback(
    // eslint-disable-next-line consistent-return
    (key: HeaderDrawer) => {
      if (openedDrawer === key) return setOpenedDrawer(null)

      if (key === CART && !isAuthorized) return setOpenedDrawer(LOGIN)

      setOpenedDrawer(key)
    },
    [openedDrawer, setOpenedDrawer, isAuthorized],
  )

  const handleOpenPage = useCallback(
    (route: string, params?: { private?: boolean }) => {
      if (isAuthorized || !params?.private) {
        router.push(route)
      } else {
        setOpenedDrawer(LOGIN)
      }
    },
    [isAuthorized, router, setOpenedDrawer],
  )

  useEffect(() => {
    toggleAuthorized(!!getCookie(CookiesKeys.AUTH_KEY))
  }, [getCookie(CookiesKeys.AUTH_KEY)])

  return (
    <>
      {windowX > 990 ? (
        <DesktopHeader
          variant={variant}
          openedDrawer={openedDrawer}
          onChangeOpenedDrawer={handleChangeOpenedDrawer}
          onOpenPage={handleOpenPage}
        />
      ) : (
        <MobileHeader
          openedDrawer={openedDrawer}
          onChangeOpenedDrawer={handleChangeOpenedDrawer}
          onOpenPage={handleOpenPage}
        />
      )}
      <Search
        isOpened={openedDrawer === SEARCH}
        position={windowX > 990 ? 'top' : 'left'}
        hideClose
      />
      <Cart
        isOpened={openedDrawer === CART}
        onClose={() => setOpenedDrawer(null)}
      />
      {!isAuthorized && (
        <Login
          isOpened={openedDrawer === LOGIN}
          onClose={() => setOpenedDrawer(null)}
        />
      )}
    </>
  )
}

export default Header
