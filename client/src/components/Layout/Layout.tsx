import React, { ReactNode } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { HeaderVariant } from '../../assets/models/headerVariant'

interface LayoutProps {
  children: ReactNode
  headerVariant?: HeaderVariant
  hideFooter?: boolean
}

const Layout: React.FC<LayoutProps> = ({
  children,
  headerVariant,
  hideFooter,
}) => (
  <>
    <Header variant={headerVariant} />
    {children}
    <Footer hide={hideFooter} />
  </>
)

export default React.memo(Layout)
