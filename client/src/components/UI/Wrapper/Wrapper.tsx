import React, { ReactNode } from 'react'

import styles from './wrapper.module.scss'

interface WrapperProps {
  children: ReactNode
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <div className={styles.Wrapper}>{children}</div>
)

export default Wrapper
