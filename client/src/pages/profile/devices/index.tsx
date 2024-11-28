import React from 'react'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Devices from '../../../components/pages/Devices/Devices'
import { SeancesApi } from '../../../api/seances.api'
import { checkAuthorization } from '../../../helpers/functions/checkAuthorization'
import { CookiesKeys } from '../../../assets/models/cookiesKeys'
import { decodeJWT } from '../../../helpers/functions/decodeJWT'

const { qkGetSeances, getSeances } = SeancesApi

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated } = checkAuthorization(context)

  if (!isAuthenticated)
    return {
      props: {},
    }

  const {
    req: { cookies },
  } = context

  const token = cookies[CookiesKeys.ACCESS_KEY]

  const currentSeanceId = token ? decodeJWT(token as string)?.jti : null

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(qkGetSeances, () => getSeances(context))

  return {
    props: {
      currentSeanceId,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

interface DevicesPageProps {
  currentSeanceId: string | null
}

const DevicesPage: React.FC<DevicesPageProps> = ({ currentSeanceId }) => {
  const { data: seances = [] } = useQuery(qkGetSeances, () => getSeances())
  return (
    <>
      <Head>
        <title>Активные сеансы</title>
      </Head>
      <Devices seances={seances} currentSeanceId={currentSeanceId} />
    </>
  )
}

export default DevicesPage
