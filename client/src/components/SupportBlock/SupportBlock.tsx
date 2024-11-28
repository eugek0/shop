import React from 'react'
import Svg from '../UI/Svg/Svg'

import styles from './supportBlock.module.scss'

const SupportBlock = () => {
  return (
    <div className={styles.SupportContainer}>
      <div className={styles.SupportText}>
        <span className={styles.SupportSubtitle}>нужна помощь?</span>
        <span className={styles.SupportTitle}>служба поддержки</span>
      </div>
      <div className={styles.SupportImageContainer}>
        <Svg className={styles.SupportImage} name='message-icon' />
        <Svg
          className={styles.SupportTextImage}
          name='circle-question-text-image'
        />
      </div>
    </div>
  )
}

export default SupportBlock
