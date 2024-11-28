import React, { ReactNode } from 'react'
import classNames from 'classnames'
import styles from './page.module.scss'

interface PageProps {
  children: ReactNode
  className?: string
  wrapper?: boolean
  noTopPadding?: boolean
}

const Page: React.FC<PageProps> = ({
  children,
  className,
  wrapper,
  noTopPadding,
}) => {
  if (!wrapper)
    return (
      <main
        className={classNames(
          styles.Page,
          !noTopPadding && styles.TopPadding,
          className,
        )}
      >
        {children}
      </main>
    )

  return (
    <main
      className={classNames(
        styles.Page,
        styles.Padding,
        !noTopPadding && styles.TopPadding,
        className,
      )}
    >
      <div className={styles.Wrapper}>{children}</div>
    </main>
  )
}

export default Page
