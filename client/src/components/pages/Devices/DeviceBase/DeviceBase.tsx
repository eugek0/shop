import React from 'react'
import { format, parseISO } from 'date-fns'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import Button from '../../../UI/Button/Button'
import { Seance } from '../../../../assets/models/seance'
import { SeancesApi } from '../../../../api/seances.api'

import styles from './deviceBase.module.scss'

const { deleteSeance, qkGetSeances } = SeancesApi

interface DeviceBaseProps {
  seance: Seance
  closeable?: boolean
}

const DeviceBase: React.FC<DeviceBaseProps> = ({
  seance,
  closeable = true,
}) => {
  const { app, updatedAt, city, country, id } = seance

  const queryClient = useQueryClient()

  const { mutate } = useMutation(() => deleteSeance(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(qkGetSeances)
    },
  })

  return (
    <div className={styles.Device}>
      <span className={styles.Text}>{app}</span>
      <span
        className={classNames(styles.Text, styles.DisplayNone)}
      >{`${city}, ${country}`}</span>
      <span className={classNames(styles.Text, styles.DisplayNone)}>
        {format(parseISO(updatedAt), 'dd.MM.yyyy')}
      </span>
      {closeable && (
        <Button className={styles.CloseButton} onClick={mutate}>
          завершить
        </Button>
      )}
    </div>
  )
}

export default DeviceBase
