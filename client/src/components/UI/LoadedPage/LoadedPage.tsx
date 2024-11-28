import React, { ReactNode, useEffect, useLayoutEffect } from 'react'
import classNames from 'classnames'
import { usePageIsLoaded } from '../../../helpers/hooks/usePageIsLoaded'

import styles from './loadedPage.module.scss'
import { useToggleState } from '../../../helpers/hooks/useToggleState'
import Svg from '../Svg/Svg'

interface LoadedPageProps {
  children: ReactNode
}

const LoadedPage: React.FC<LoadedPageProps> = ({ children }) => {
  const { isLoading } = usePageIsLoaded()

  const [pageIsLoaded, toggleLoaded] = useToggleState(false)
  const [isHidden, toggleHidden] = useToggleState(false)

  const handleAnimationEnd = () => {
    toggleHidden(true)
  }

  useEffect(() => {
    toggleLoaded(!isLoading)
  }, [isLoading])

  useEffect(() => {
    const body = document.querySelector('body')

    if (!body) return

    if (pageIsLoaded) {
      body.style.overflowY = 'auto'
    } else {
      body.style.overflowY = 'hidden'
    }
  }, [pageIsLoaded])

  return (
    <>
      {children}{' '}
      <div
        className={classNames(
          styles.Loading,
          pageIsLoaded && styles.Loaded,
          isHidden && styles.Hide,
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={styles.Logo}>
          <Svg className={styles.LogoImage} name='ups-image-logo' />
          <Svg className={styles.LogoText} name='ups-text-logo' />
        </div>
      </div>
    </>
  )
}

export default LoadedPage
