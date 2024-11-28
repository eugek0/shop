import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import { AuthApi } from '../../../api/auth.api'
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_REGEX,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_REGEX,
} from '../../../helpers/constants/validation'

import styles from './authorization.module.scss'
import { useModalContext } from '../../../helpers/context/ModalContext'

const defaultFormValue = {
  email: '',
  password: '',
}

const { login } = AuthApi

interface AuthorizationProps {
  onClose: () => void
}

const Authorization: React.FC<AuthorizationProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: defaultFormValue,
    mode: 'onChange',
  })

  const { mutate: loginToAccount, status: loginStatus } = useMutation(login)

  const { toggleAuthorized } = useModalContext()

  useEffect(() => {
    if (loginStatus !== 'success') return
    toggleAuthorized(true)
    onClose()
  }, [loginStatus])

  return (
    <div className={styles.Form}>
      <div className={styles.TextContainer}>
        <span className={styles.Title}>С возвращением!</span>
        <span className={styles.Subtitle}>
          Войти с помощью адреса эл. почты и пароля
        </span>
      </div>
      <form
        className={styles.InputsContainer}
        onSubmit={handleSubmit((value) => loginToAccount(value))}
      >
        <Input
          type='email'
          name='email'
          placeholder='Электронная почта'
          value={watch('email')}
          register={register}
          rules={{ required: true, pattern: EMAIL_REGEX }}
          error={!!errors.email && EMAIL_ERROR_MESSAGE}
        />
        <Input
          type='password'
          name='password'
          placeholder='Пароль'
          value={watch('password')}
          register={register}
          rules={{ required: true, pattern: PASSWORD_REGEX }}
          error={!!errors.password && PASSWORD_ERROR_MESSAGE}
        />
        <Button
          className={styles.ConfirmButton}
          type='submit'
          variant='black'
          disabled={!!Object.keys(errors).length}
        >
          Войти
        </Button>
      </form>
    </div>
  )
}

export default Authorization
