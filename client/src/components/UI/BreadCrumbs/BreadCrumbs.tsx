import React from 'react'
import classNames from 'classnames'
import Button from '../Button/Button'

import styles from './breadCrumbs.module.scss'

interface BreadCrumbItem {
  href: string
  name: string
}

interface BreadCrumbsProps {
  array: BreadCrumbItem[]
  className?: string
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ array, className }) => (
  <div className={classNames(styles.BreadCrumbs, className)}>
    {array.map(({ href, name }, index) => (
      <React.Fragment key={`${name}_${href}`}>
        <Button
          key={name}
          className={styles.BreadCrumbButton}
          as='link'
          href={href}
        >
          {name}
        </Button>
        {index !== array.length - 1 && (
          <span key={`${name}slash`} className={styles.Indent}>
            /
          </span>
        )}
      </React.Fragment>
    ))}
  </div>
)

export default BreadCrumbs
