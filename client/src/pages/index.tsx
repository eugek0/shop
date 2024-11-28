import Head from 'next/head'
import React from 'react'
import { GetServerSideProps } from 'next'
import { QueryClient, useQuery } from '@tanstack/react-query'
import Main from '../components/pages/Main/Main'
import { NavigationApi } from '../api/navigation.api'

const { qkGetNavigation, getNavigation } = NavigationApi

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(qkGetNavigation, getNavigation)

  return {
    props: {},
  }
}
const MainPage = () => {
  const { data: cachedNavigation = [] } = useQuery(
    qkGetNavigation,
    getNavigation,
  )

  return (
    <>
      <Head>
        <title>U PROJECT STUDIO - Магазин парфюмерии</title>
      </Head>
      <Main navigation={cachedNavigation} />
    </>
  )
}

export default MainPage
