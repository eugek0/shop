import React from 'react'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Favorites from '../../../components/pages/Favorites/Favorites'
import { FavoritesApi } from '../../../api/favorites.api'
import { checkAuthorization } from '../../../helpers/functions/checkAuthorization'

const { qkGetFavorites, getFavorites } = FavoritesApi

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated } = checkAuthorization(context)

  if (!isAuthenticated)
    return {
      props: {},
    }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(qkGetFavorites, () => getFavorites(context))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const FavoritesPage = () => {
  const { data: favoriteProducts = [] } = useQuery(qkGetFavorites, () =>
    getFavorites(),
  )

  return (
    <>
      <Head>
        <title>Избранные товары</title>
      </Head>
      <Favorites products={favoriteProducts} />
    </>
  )
}

export default FavoritesPage
