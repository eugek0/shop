import React, { useMemo } from 'react'
import { ru } from 'date-fns/locale'
import { format, parseISO } from 'date-fns'
import { Seance } from '../../../../assets/models/seance'

import styles from './deviceAdditional.module.scss'

interface DeviceAdditionalProps {
  seance: Seance
}

const DeviceAdditional: React.FC<DeviceAdditionalProps> = ({ seance }) => {
  const { ip, city, country, os, createdAt, updatedAt, app } = seance

  const data = useMemo(
    () => [
      { title: 'IP', value: ip },
      { title: 'Операционная система', value: os },
      { title: 'Приложение', value: app },
      { title: 'Геолокация', value: `${city}, ${country}` },
      {
        title: 'Первый вход',
        value: format(parseISO(createdAt), "dd MMMM yyyy 'года в' HH:mm", {
          locale: ru,
        }),
      },
      {
        title: 'Последний вход',
        value: format(parseISO(updatedAt), "dd MMMM yyyy 'года в' HH:mm", {
          locale: ru,
        }),
      },
    ],
    [seance],
  )

  return (
    <div className={styles.Device}>
      {data.map(({ title, value }) => (
        <div key={title} className={styles.Row}>
          <span>{title}:</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  )
}

export default DeviceAdditional
