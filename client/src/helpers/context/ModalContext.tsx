import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import { getCookie } from 'cookies-next'
import { HeaderDrawer } from '../../assets/models/headerDrawer'
import { useToggleState } from '../hooks/useToggleState'
import { CookiesKeys } from '../../assets/models/cookiesKeys'

interface ModalContextValue {
  openedDrawer: HeaderDrawer | null
  setOpenedDrawer: React.Dispatch<SetStateAction<HeaderDrawer | null>>
  isAuthorized: boolean
  toggleAuthorized: (key: boolean) => void
}

export const ModalContext = createContext<ModalContextValue | null>(null)

interface ModalContextProviderProps {
  children: ReactNode
}

export const ModalContextProvider: React.FC<ModalContextProviderProps> = ({
  children,
}) => {
  const [openedDrawer, setOpenedDrawer] = useState<HeaderDrawer | null>(null)
  const [isAuthorized, toggleAuthorized] = useToggleState(
    !!getCookie(CookiesKeys.AUTH_KEY),
  )

  const contextValue = useMemo(
    () => ({ openedDrawer, setOpenedDrawer, isAuthorized, toggleAuthorized }),
    [openedDrawer, setOpenedDrawer, isAuthorized, toggleAuthorized],
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error(
      'useModalContext must be used within a ModalContextProvider',
    )
  }
  return context
}
