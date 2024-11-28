import { GetServerSidePropsContext } from 'next'
import { CookiesKeys } from '../../assets/models/cookiesKeys'

export const checkAuthorization = (context: GetServerSidePropsContext) => {
  const { req, res } = context
  const { cookies } = req

  // Проверяем наличие auth_key
  const isAuthenticated = !!cookies[CookiesKeys.AUTH_KEY]

  // Если пользователь не авторизован, устанавливаем заголовок Location и перенаправляем на главную страницу
  if (!isAuthenticated) {
    res.writeHead(302, { Location: '/' })
    res.end()
  }

  return { isAuthenticated }
}
