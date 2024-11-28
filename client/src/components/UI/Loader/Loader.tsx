import React from 'react'

import styles from './loader.module.scss'

interface LoaderProps {
  height?: number | string
  width?: number | string
}

const Loader: React.FC<LoaderProps> = ({ height, width }) => (
  <div className={styles.Container} style={{ height, width }}>
    <div className={styles.FirstDot} />
    <div className={styles.SecondDot} />
    <div className={styles.ThirdDot} />
  </div>
)

export default Loader
