import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import StepParagraph from '../StepParagraph/StepParagraph'

import styles from './recipient.module.scss'
import Input from '../../../UI/Input/Input'
import { calcNumbers } from '../../../../helpers/functions/calcNumbers'
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_REGEX,
  NAME_ERROR_MESSAGE,
  NAME_REGEX,
} from '../../../../helpers/constants/validation'
import { useOrderContext } from '../context/OrderContext'

const phoneNumberPlaceholder = '+7 (___) ___-__-__'
const phoneNumberMask = '+7 (999) 999-99-99'

const Recipient = () => {
  const {
    orderForm: { recipient },
    setValidityList,
    setOrderRequestData,
  } = useOrderContext()

  const { phone } = recipient

  const {
    register,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm({
    defaultValues: recipient,
    mode: 'onChange',
  })

  const [phoneNumber, setPhoneNumber] = useState(phone)

  const numberIsNotVoid = useMemo(
    () => calcNumbers(phoneNumber) > 1,
    [phoneNumber],
  )

  const numberIsFull = useMemo(
    () => calcNumbers(phoneNumber) === calcNumbers(phoneNumberMask),
    [phoneNumber, phoneNumberMask, recipient],
  )

  useEffect(() => {
    const { phone: _, ...requiredData } = getValues()
    setValidityList((prev) => ({
      ...prev,
      recipient: isValid && numberIsFull,
    }))
    setOrderRequestData((prev) => ({
      ...prev,
      recipient: { ...prev.recipient, ...requiredData },
    }))
  }, [isValid, numberIsFull, setValidityList, getValues])

  useEffect(() => {
    setOrderRequestData((prev) => ({
      ...prev,
      recipient: { ...prev.recipient, phone: phoneNumber },
    }))
  }, [phoneNumber])

  return (
    <div className={styles.Content}>
      <StepParagraph title='ваши данные'>
        <div className={styles.InputBox}>
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
            rules={{ required: true, pattern: NAME_REGEX }}
            error={!!errors.middleName && NAME_ERROR_MESSAGE}
          />
          <span className={styles.Description}>
            обязательно при доставке почтой
          </span>
        </div>
      </StepParagraph>
      <StepParagraph title='контакты'>
        <div className={styles.InputBox}>
          <Input
            type='text'
            name='phone'
            placeholder='Номер телефона'
            value={phoneNumber || phoneNumberPlaceholder}
            mask={phoneNumberMask}
            maskPlaceholder={phoneNumberPlaceholder}
            onChange={(e) => setPhoneNumber(e.target.value)}
            rules={{ required: true }}
            error={numberIsNotVoid && !numberIsFull}
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
          <span className={styles.Description}>
            необходимо для отправки чека
          </span>
        </div>
      </StepParagraph>
    </div>
  )
}

export default Recipient
