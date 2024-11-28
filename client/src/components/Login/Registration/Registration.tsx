import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import Checkbox from '../../UI/Checkbox/Checkbox'
import { useToggleState } from '../../../helpers/hooks/useToggleState'
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_REGEX,
  NAME_ERROR_MESSAGE,
  NAME_REGEX,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_REGEX,
} from '../../../helpers/constants/validation'
import { AuthApi } from '../../../api/auth.api'
import { RegistrationForm } from '../../../assets/models/authForms'
import Svg from '../../UI/Svg/Svg'
import IconButton from '../../UI/IconButton/IconButton'

import styles from './registration.module.scss'
import { useModalContext } from '../../../helpers/context/ModalContext'

const defaultFormValue = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  genderId: '6f3f653f-f41c-438a-9f2c-c7d8d25e0aed',
}

const defaultConfirmed = { email: '', code: '' }

const { registration, confirmation } = AuthApi

interface RegistrationProps {
  onClose: () => void
}

const Registration: React.FC<RegistrationProps> = ({ onClose }) => {
  const router = useRouter()

  const [isChecked, toggleChecked] = useToggleState(false)
  const [confirmed, setConfirmed] = useState(defaultConfirmed)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: defaultFormValue,
    mode: 'onChange',
  })

  const { mutate: sendForConfirmation, data: confirmedData } =
    useMutation(registration)

  const {
    mutate: registerAccount,
    error: confirmationCodeError,
    status: registrationStatus,
  } = useMutation(confirmation)

  const changeConfirmedCode = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      if (value.length > 6) return
      setConfirmed((prev) => ({ ...prev, code: value }))
    },
    [setConfirmed],
  )

  const { toggleAuthorized } = useModalContext()

  useEffect(() => {
    setConfirmed((prev) => ({ ...prev, email: confirmedData?.email }))
  }, [confirmedData])

  useEffect(() => {
    if (registrationStatus !== 'success') return
    toggleAuthorized(true)
    onClose()
    router.push('/profile/personalInfo')
  }, [registrationStatus, onClose])

  return !confirmed.email ? (
    <form
      className={styles.Form}
      onSubmit={handleSubmit((value: RegistrationForm) =>
        sendForConfirmation(value),
      )}
    >
      <Input
        type='email'
        name='email'
        value={watch('email')}
        placeholder='Электронная почта'
        register={register}
        rules={{ required: true, pattern: EMAIL_REGEX }}
        error={!!errors.email && EMAIL_ERROR_MESSAGE}
      />
      <Input
        type='text'
        name='firstName'
        placeholder='Имя'
        value={watch('firstName')}
        register={register}
        rules={{ required: true, pattern: NAME_REGEX }}
        error={!!errors.firstName && NAME_ERROR_MESSAGE}
      />
      <Input
        type='text'
        name='lastName'
        placeholder='Фамилия'
        value={watch('lastName')}
        register={register}
        rules={{ required: true, pattern: NAME_REGEX }}
        error={!!errors.lastName && NAME_ERROR_MESSAGE}
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
      <div className={styles.CheckboxContainer}>
        <Checkbox isChecked={isChecked} toggleChecked={toggleChecked} />
        <span className={styles.CheckboxText}>
          Я принимаю условия Политики конфиденциальности
        </span>
      </div>
      <Button
        type='submit'
        className={styles.ConfirmButton}
        variant='black'
        disabled={!isChecked || !!Object.keys(errors).length}
      >
        Отправить код подтверждения
      </Button>
    </form>
  ) : (
    <form className={styles.ConfirmForm}>
      <div className={styles.Top}>
        <IconButton onClick={() => setConfirmed(defaultConfirmed)}>
          <Svg name='arrow-left' />
        </IconButton>
        <span className={styles.Text}>
          Код подтверждения отправлен на почту: {confirmed.email}
        </span>
      </div>
      <Input
        type='number'
        name='code'
        placeholder='Код подтверждения'
        value={confirmed.code}
        onChange={changeConfirmedCode}
        error={!!confirmationCodeError}
      />
      <Button
        className={styles.ConfirmButton}
        variant='black'
        disabled={confirmed.code.length < 6}
        onClick={() => registerAccount(confirmed)}
      >
        Создать учетную запись
      </Button>
    </form>
  )
}

export default Registration
