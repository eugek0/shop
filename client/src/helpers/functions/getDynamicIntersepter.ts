import { GetServerSidePropsContext } from 'next'
import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { CookiesKeys } from '../../assets/models/cookiesKeys'
import {
  configuredAxios,
  interceptorRequestId,
} from '../intersepter/intersepter'

const processCookie = (cookieObj: { [x: string]: any }) =>
  Object.keys(cookieObj).reduce(
    (acc, curr) => (acc = `${acc} ${curr}=${cookieObj[curr]};`),
    '',
  )

export const getDynamicAxios = (context: GetServerSidePropsContext) => {
  const {
    req: { cookies },
  } = context

  const addToken = (
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig => {
    config.headers.set('Cookie', processCookie(cookies))
    config.headers.set('Authorization', cookies[CookiesKeys.ACCESS_KEY])
    return config
  }

  const dynamicAxios = { ...configuredAxios } as AxiosInstance

  dynamicAxios.interceptors.request.eject(interceptorRequestId)

  dynamicAxios.interceptors.request.use(
    (config) => addToken(config),
    (error) => error,
  )

  return { dynamicAxios }
}
