import React from 'react'
import Drawer from '../UI/Drawer/Drawer'
import Tabs from '../UI/Tabs/Tabs'
import Authorization from './Authorization/Authorization'
import Registration from './Registration/Registration'

import styles from './login.module.scss'

interface LoginProps {
  isOpened: boolean
  onClose: () => void
}

const Login: React.FC<LoginProps> = ({ isOpened, onClose }) => {
  const tabs = [
    {
      title: 'ВОЙТИ',
      content: <Authorization onClose={onClose} />,
    },
    {
      title: 'ЗАРЕГЕСТРИРОВАТЬСЯ',
      content: <Registration onClose={onClose} />,
    },
  ]

  return (
    <Drawer
      className={styles.Login}
      isOpened={isOpened}
      setIsOpened={onClose}
      title='ВОЙТИ ИЛИ ЗАРЕГЕСТРИРОВАТЬСЯ'
      position='right'
      zIndex={12}
    >
      <Tabs tabs={tabs} position='center' />
    </Drawer>
  )
}

export default Login
