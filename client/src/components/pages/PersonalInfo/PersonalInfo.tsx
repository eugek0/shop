import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Page from '../../Page/Page'
import ProfileLayout from '../../ProfileLayout/ProfileLayout'
import Input from '../../UI/Input/Input'
import { ProfileApi } from '../../../api/profile.api'
import Button from '../../UI/Button/Button'
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_REGEX,
  NAME_ERROR_MESSAGE,
  NAME_REGEX,
} from '../../../helpers/constants/validation'
import { DefaultProfile, Profile } from '../../../assets/models/profile'
import { calcNumbers } from '../../../helpers/functions/calcNumbers'

import styles from './personalInfo.module.scss'
import { OrderApi } from '../../../api/order.api'

const { qkGetProfile, getProfile, updateProfile } = ProfileApi
const { qkGetOrderRequest } = OrderApi

const phoneNumberPlaceholder = '+7 (___) ___-__-__'
const phoneNumberMask = '+7 (999) 999-99-99'

const defaultForm: DefaultProfile = {
  id: '',
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  phone: phoneNumberPlaceholder,
  address: '',
  avatar: '',
  dateOfBirth: '',
}

const PersonalInfo = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: profile = defaultForm } = useQuery(qkGetProfile, getProfile)

  const { mutate } = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(qkGetProfile)
      queryClient.invalidateQueries(qkGetOrderRequest)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    reset,
  } = useForm({
    defaultValues: profile,
    mode: 'onChange',
  })

  const [phoneNumber, setPhoneNumber] = useState(profile.phone)

  const numberIsNotVoid = useMemo(
    () => calcNumbers(phoneNumber) > 1,
    [phoneNumber],
  )

  const numberIsFull = useMemo(
    () => calcNumbers(phoneNumber) === calcNumbers(phoneNumberMask),
    [phoneNumber, phoneNumberMask, profile],
  )

  const updateUserProfile = useCallback(
    (data: Profile) => {
      if (numberIsNotVoid && !numberIsFull) return
      mutate({ ...data, phone: phoneNumber || null })
    },
    [phoneNumber, numberIsNotVoid, numberIsFull],
  )

  useEffect(() => {
    reset(profile)
    setPhoneNumber(profile.phone)
  }, [profile])

  const disableButton = useMemo(
    () =>
      Object.keys(errors).length !== 0 ||
      (numberIsNotVoid && !numberIsFull) ||
      (Object.keys(dirtyFields).length === 0 && phoneNumber === profile.phone),
    [
      errors,
      numberIsNotVoid,
      numberIsFull,
      Object.keys(dirtyFields).length,
      profile,
    ],
  )

  const breadCrumbsItem = {
    href: router.asPath,
    name: `личная информация`,
  }

  return (
    <Page className={styles.PersonalInfoPage} wrapper>
      <ProfileLayout
        title='личная информация'
        breadCrumbsItems={[breadCrumbsItem]}
      >
        <form
          className={styles.Form}
          onSubmit={handleSubmit(updateUserProfile)}
        >
          <Input
            type='text'
            name='firstName'
            value={watch('firstName')}
            placeholder='Имя'
            register={register}
            rules={{ required: true, pattern: NAME_REGEX }}
            error={!!errors.firstName && NAME_ERROR_MESSAGE}
          />
          <Input
            type='text'
            name='lastName'
            value={watch('lastName')}
            placeholder='Фамилия'
            register={register}
            rules={{ required: true, pattern: NAME_REGEX }}
            error={!!errors.lastName && NAME_ERROR_MESSAGE}
          />
          <Input
            type='text'
            name='middleName'
            value={watch('middleName')}
            placeholder='Отчество'
            register={register}
            rules={{ pattern: NAME_REGEX }}
            error={!!errors.middleName && NAME_ERROR_MESSAGE}
          />
          <Input
            type='email'
            name='email'
            value={watch('email')}
            placeholder='Email'
            register={register}
            rules={{ required: true, pattern: EMAIL_REGEX }}
            error={!!errors.email && EMAIL_ERROR_MESSAGE}
          />
          <Input
            type='text'
            name='phone'
            placeholder='Номер телефона'
            value={phoneNumber || phoneNumberPlaceholder}
            mask={phoneNumberMask}
            maskPlaceholder={phoneNumberPlaceholder}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={numberIsNotVoid && !numberIsFull}
          />
          <Input
            type='text'
            name='address'
            value={watch('address')}
            placeholder='Адрес'
            register={register}
            error={!!errors.address}
          />
          <Button
            className={styles.ProfileButton}
            type='submit'
            variant='black'
            disabled={disableButton}
          >
            сохранить
          </Button>
        </form>
      </ProfileLayout>
    </Page>
  )
}

export default PersonalInfo
