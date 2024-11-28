import React from 'react'

import classNames from 'classnames'
import styles from './descriptionTable.module.scss'

interface TableItem {
  title: string
  description: string
}

interface DescriptionTableProps {
  array: TableItem[]
  className?: string
}

const DescriptionTable: React.FC<DescriptionTableProps> = ({
  array,
  className,
}) => (
  <div className={classNames(styles.TableOfContents, className)}>
    {array.map(({ title, description }) => (
      <div key={title} className={styles.Item}>
        <div className={styles.LeftGroup}>
          <span className={styles.Heading}>{title}</span>
          <span className={styles.Border} />
        </div>
        <span className={styles.Description}>{description}</span>
      </div>
    ))}
  </div>
)

export default DescriptionTable
