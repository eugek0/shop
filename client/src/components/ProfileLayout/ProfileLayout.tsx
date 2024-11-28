import React, { ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useMutation, useQuery } from '@tanstack/react-query'
import BreadCrumbs from '../UI/BreadCrumbs/BreadCrumbs'
import { PROFILE_CATEGORIES } from './constants/constants'
import Button from '../UI/Button/Button'
import { SeancesApi } from '../../api/seances.api'
import { ProfileApi } from '../../api/profile.api'

import styles from './profileLayout.module.scss'
import Drawer from '../UI/Drawer/Drawer'
import { useToggleState } from '../../helpers/hooks/useToggleState'
import Svg from '../UI/Svg/Svg'
import IconButton from '../UI/IconButton/IconButton'
import { useModalContext } from '../../helpers/context/ModalContext'

const { logout } = SeancesApi

const { qkGetProfile, getProfile } = ProfileApi

interface ProfileLayoutProps {
  children: ReactNode
  title: string
  breadCrumbsItems?: { href: string; name: string }[]
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  title,
  breadCrumbsItems = [],
}) => {
  const router = useRouter()

  const { data: { firstName, lastName } = { firstName: '', lastName: '' } } =
    useQuery(qkGetProfile, getProfile)

  const { mutate, status } = useMutation(logout)

  const { toggleAuthorized } = useModalContext()

  const [drawerIsOpened, toggleDrawerIsOpened] = useToggleState(false)

  const breadCrumbs = useMemo(
    () => [
      {
        href: '/',
        name: 'главная',
      },
      {
        href: '/profile/personalInfo',
        name: 'профиль',
      },
      ...breadCrumbsItems,
    ],
    [router, title, breadCrumbsItems],
  )

  const renderNavPanel = useCallback(
    () => (
      <>
        <div className={styles.UserBlock}>
          <div className={styles.UserAvatar} />
          <span className={styles.Name}>{`${firstName} ${lastName}`}</span>
        </div>
        <div className={styles.Nav}>
          {PROFILE_CATEGORIES.map(({ id, name, link }) => (
            <Button key={id} className={styles.NavButton} as='link' href={link}>
              {name}
            </Button>
          ))}
          <Button className={styles.NavButton} onClick={mutate}>
            выйти
          </Button>
        </div>
      </>
    ),
    [firstName, lastName],
  )

  useEffect(() => {
    if (status !== 'success') return
    toggleAuthorized(false)
    router.push('/')
  }, [status])

  return (
    <>
      <div className={styles.ProfileLayout}>
        <div className={styles.Top}>
          <BreadCrumbs
            className={styles.ProfileBreadCrumbs}
            array={breadCrumbs}
          />
          <IconButton
            className={styles.BurgerButton}
            onClick={toggleDrawerIsOpened}
          >
            <Svg name='burger-icon' />
          </IconButton>
        </div>
        <div className={styles.Content}>
          <div className={classNames(styles.Container, styles.FullWidth)}>
            <div className={styles.TitleWrapper}>
              <span className={styles.Title}>{title}</span>
            </div>
            <div className={styles.Children}>{children}</div>
          </div>
          <div className={styles.Container}>{renderNavPanel()}</div>
        </div>
      </div>
      <Drawer
        className={styles.ProfileDrawer}
        isOpened={drawerIsOpened}
        setIsOpened={toggleDrawerIsOpened}
        position='right'
        title=''
      >
        {renderNavPanel()}
      </Drawer>
    </>
  )
}

export default ProfileLayout
