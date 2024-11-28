import React, { useEffect } from 'react'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Product from '../../components/pages/Product/Product'
import { CatalogApi } from '../../api/catalog.api'
import { useModalContext } from '../../helpers/context/ModalContext'

const { qkGetProduct, getProduct } = CatalogApi

export async function getServerSideProps(context: { params: any }) {
  const { params } = context
  const { id } = params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(qkGetProduct(id), () => getProduct(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const ProductPage = () => {
  const router = useRouter()

  const { data: cachedProduct, refetch } = useQuery(
    qkGetProduct(router.query?.id as string),
    () => getProduct(router.query?.id as string),
  )

  const { isAuthorized } = useModalContext()

  useEffect(() => {
    refetch()
  }, [isAuthorized])

  if (!cachedProduct) return router.back()

  return (
    <>
      <Head>
        <title>{`${cachedProduct.title} - ${cachedProduct.gender.title}`}</title>
        <meta name='description' content={cachedProduct.description} />
      </Head>
      <Product product={cachedProduct} />
    </>
  )
}

export default ProductPage
