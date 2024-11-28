import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import Svg from '../UI/Svg/Svg'
import Button from '../UI/Button/Button'
import IconButton from '../UI/IconButton/IconButton'
import { NavigationApi } from '../../api/navigation.api'
import { NavigationFilterParams } from '../../assets/models/navigation'

import styles from './footer.module.scss'

const { qkGetNavigation, getNavigation } = NavigationApi

interface FooterProps {
  hide?: boolean
}

const Footer: React.FC<FooterProps> = ({ hide }) => {
  const router = useRouter()

  const { data: navigation = [] } = useQuery(qkGetNavigation, getNavigation)

  const handleOpenCatalog = useCallback(
    (params: NavigationFilterParams) => {
      router.push({ pathname: '/catalog', query: { ...params } })
    },
    [router],
  )

  return (
    <footer className={classNames(styles.Relative, !hide && styles.Show)}>
      <div className={styles.Footer}>
        <div className={styles.Top}>
          <nav className={styles.NavList}>
            {navigation.map(({ title, id, params }) => (
              <Button
                key={id}
                className={styles.NavItem}
                onClick={() => handleOpenCatalog(params)}
              >
                {title}
              </Button>
            ))}
          </nav>
          <div className={styles.ImageLogoBlock}>
            <IconButton onClick={() => router.push('/')}>
              <Svg className={styles.ImageLogo} name='ups-image-logo' />
            </IconButton>
            <span>не забудьте подписаться на наши соц. сети!</span>
          </div>
          <nav className={styles.NavList}>
            {[
              'отдел коммерции, для предложений от поставщиков',
              'документы сайта',
              'политика обработки персональных данных',
            ].map((title) => (
              <Button key={title} className={styles.NavItem}>
                {title}
              </Button>
            ))}
          </nav>
        </div>
        <div className={styles.Bottom}>
          <div className={styles.SocialContainer}>
            <Svg name='vk-logo' />
            <Svg name='telegram-logo' />
            <Svg name='youtube-logo' />
          </div>
          <IconButton onClick={() => router.push('/')}>
            <Svg className={styles.TextLogo} name='ups-text-logo' />
          </IconButton>
          <div className={styles.SocialContainer}>
            <Svg name='visa-logo' />
            <Svg name='mir-icon' />
            <Svg name='mastercard-icon' />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
