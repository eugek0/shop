import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import mem from 'mem'
import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { CookiesKeys } from '../../assets/models/cookiesKeys'
import { BASE_URL } from '../constants/baseUrl'

const ACCESS_MAX_AGE_CACHE = 30000

export const isUnauthorized = (response?: AxiosResponse): boolean =>
  response?.status === 401

export const addToken = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  config.headers.set('Authorization', getCookie(CookiesKeys.ACCESS_KEY))
  return config
}

const generateEventLogout = () => {
  const event = new Event('disconnect', { bubbles: true })
  document.dispatchEvent(event)
}

export const updateSeance = async () => {
  try {
    await axios.patch(`${BASE_URL}/seances`)

    return getCookie(CookiesKeys.ACCESS_KEY)
  } catch (e) {
    if (typeof window !== 'undefined') {
      window.location.pathname = '/'
      generateEventLogout()
    }
    throw e
  }
}

export const memoizedAccess = mem(updateSeance, {
  maxAge: ACCESS_MAX_AGE_CACHE,
})

export const retryRequest = async (error: AxiosError) => {
  const access = await memoizedAccess()

  const config = {
    ...error.config,
    headers: {
      ...error.config?.headers,
      Authorization: access,
    },
  }

  return axios(config)
}

export const configuredAxios = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})

export const interceptorRequestId = configuredAxios.interceptors.request.use(
  (config) => addToken(config),
  (error) => error,
)

configuredAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<{ message: string }>) => {
    const isAccessError = isUnauthorized(error.response)
    if (isAccessError) {
      return retryRequest(error)
    }
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_LEFT,
      className: 'toast',
    })
    throw error
  },
)
