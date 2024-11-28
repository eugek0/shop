import React, { useMemo } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import ProfileLayout from '../../ProfileLayout/ProfileLayout'
import Page from '../../Page/Page'
import Accordion from '../../UI/Accordion/Accordion'
import Button from '../../UI/Button/Button'
import { Seance } from '../../../assets/models/seance'
import DeviceBase from './DeviceBase/DeviceBase'
import DeviceAdditional from './DeviceAdditional/DeviceAdditional'
import Loader from '../../UI/Loader/Loader'
import { SeancesApi } from '../../../api/seances.api'

import styles from './devices.module.scss'

const getSeancesForUi = ({
  seances,
  closeable = false,
}: {
  seances: Seance[]
  closeable?: boolean
}) =>
  seances.map((seance) => ({
    id: seance?.id,
    title: <DeviceBase seance={seance} closeable={closeable} />,
    content: <DeviceAdditional seance={seance} />,
  }))

const { deleteAllSeances, qkGetSeances } = SeancesApi

interface DevicesProps {
  seances: Seance[]
  currentSeanceId: string | null
}

const Devices: React.FC<DevicesProps> = ({ seances, currentSeanceId }) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate } = useMutation(deleteAllSeances, {
    onSuccess: () => {
      queryClient.invalidateQueries(qkGetSeances)
    },
  })

  const currentSeance = useMemo(
    () => seances.find(({ id }) => id === currentSeanceId),
    [currentSeanceId, seances],
  )

  const seancesForUi = useMemo(
    () =>
      currentSeance
        ? getSeancesForUi({
            seances: seances.filter(({ id }) => id !== currentSeance.id),
            closeable: true,
          })
        : [],
    [seances, currentSeance],
  )

  const breadCrumbsItem = {
    href: router.asPath,
    name: `устройства`,
  }

  return (
    <Page className={styles.DevicePage} wrapper>
      <ProfileLayout
        title='активные сеансы'
        breadCrumbsItems={[breadCrumbsItem]}
      >
        <div className={styles.Content}>
          {currentSeance ? (
            <>
              <div className={styles.Container}>
                <span className={styles.Subtitle}>Текущий сеанс:</span>
                <Accordion
                  items={getSeancesForUi({
                    seances: [currentSeance] as Seance[],
                  })}
                />
              </div>
              {seancesForUi.length ? (
                <div className={styles.Container}>
                  <span className={styles.Subtitle}>Все сеансы:</span>
                  <Accordion items={seancesForUi} />
                </div>
              ) : null}
            </>
          ) : (
            <Loader />
          )}
        </div>
        {seancesForUi.length && currentSeance ? (
          <div className={styles.ButtonWrapper}>
            <Button
              className={styles.CloseAllButton}
              variant='black'
              onClick={mutate}
            >
              завершить все сеансы
            </Button>
          </div>
        ) : null}
      </ProfileLayout>
    </Page>
  )
}

export default Devices
