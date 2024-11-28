import { useMemo, useRef } from 'react'
import '../assets/styles/globals.scss'
import { ParallaxProvider } from 'react-scroll-parallax'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Layout from '../components/Layout/Layout'
import LoadedPage from '../components/UI/LoadedPage/LoadedPage'
import { ModalContextProvider } from '../helpers/context/ModalContext'
import { pagesWithoutLayout } from '../helpers/constants/customLayoutPages'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const isPageWithoutLayout = useMemo(
    () => !!pagesWithoutLayout.find((page) => page === router.pathname),
    [router, pagesWithoutLayout],
  )

  const isPageWithoutFooter = useMemo(
    () => router.pathname.includes('/profile/'),
    [router],
  )

  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          retryDelay: 1000,
        },
      },
    }),
  )

  return (
    <ParallaxProvider>
      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ModalContextProvider>
            <LoadedPage>
              {isPageWithoutLayout ? (
                <Component {...pageProps} />
              ) : (
                <Layout hideFooter={isPageWithoutFooter}>
                  <Component {...pageProps} />
                </Layout>
              )}
            </LoadedPage>
            <ToastContainer />
          </ModalContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </ParallaxProvider>
  )
}

export default App
