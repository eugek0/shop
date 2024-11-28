import React, { ReactNode } from 'react'

import styles from './stepParagraph.module.scss'

interface StepParagraphProps {
  title: string
  children: ReactNode
}

const StepParagraph: React.FC<StepParagraphProps> = ({ title, children }) => (
  <div className={styles.Paragraph}>
    <span className={styles.Title}>{title}</span>
    <div className={styles.Content}>{children}</div>
  </div>
)

export default StepParagraph
