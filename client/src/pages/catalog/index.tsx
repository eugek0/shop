import React, { useEffect, useMemo, useState } from 'react'
import { QueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import Layout from '../../components/Layout/Layout'
import Catalog from '../../components/pages/Catalog/Catalog'
import { useWindowCoordinate } from '../../helpers/hooks/useWindowCoordinate'
import { CatalogApi } from '../../api/catalog.api'
import { ProductItem } from '../../assets/models/catalog'
import { useScrollEnd } from '../../helpers/hooks/useScrollEndResult'
import { useModalContext } from '../../helpers/context/ModalContext'

const itemsLimit = 10

const prefetchParams = { page: 1, limit: itemsLimit }

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  const { qkGetCatalog, getCatalog } = CatalogApi

  await queryClient.prefetchQuery(
    qkGetCatalog({ ...prefetchParams, filter: query }),
    () => getCatalog({ ...prefetchParams, filter: query }),
  )

  return {
    props: {},
  }
}

const CatalogPage = () => {
  const router = useRouter()
  const { scrollY } = useWindowCoordinate()
  const { isEnd } = useScrollEnd({ offset: 1200 })

  const { qkGetCatalog, getCatalog } = CatalogApi

  const [filter, setFilter] = useState(router.query)

  const { isAuthorized } = useModalContext()

  const {
    data: rowCatalog = { pages: [] },
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery(
    qkGetCatalog({ ...prefetchParams, filter }),
    ({ pageParam = 1 }) =>
      getCatalog({ page: pageParam, limit: itemsLimit, filter }),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.rows.length === itemsLimit ? pages.length + 1 : false,
    },
  )

  const catalog = useMemo(
    () => rowCatalog?.pages.flatMap(({ rows }) => rows) ?? [],
    [rowCatalog],
  )

  const formattedArray: ProductItem[][] = useMemo(
    () =>
      catalog.reduce(
        (acc: ProductItem[][], _, i) =>
          !(i % 5) ? [...acc, catalog?.slice(i, i + 5)] : acc,
        [],
      ),
    [catalog],
  )

  useEffect(() => {
    if (!isEnd || !hasNextPage || isFetching) return
    fetchNextPage()
  }, [isEnd, hasNextPage, isFetching])

  useEffect(() => {
    setFilter(router.query)
  }, [router])

  useEffect(() => {
    refetch()
  }, [isAuthorized])

  return (
    <>
      <Head>
        <title>Каталог парфюмерии</title>
      </Head>
      <Layout headerVariant={scrollY < 100 ? 'transparent' : 'white'}>
        <Catalog products={formattedArray} isLoading={isFetching} />
      </Layout>
    </>
  )
}

export default React.memo(CatalogPage)
