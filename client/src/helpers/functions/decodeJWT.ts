export const decodeJWT = (token: string) => {
  const base64Url = (token as string)?.split('.')[1] // берем часть токена, которая содержит данные
  const base64 = base64Url.replace('-', '+').replace('_', '/') // заменяем url-safe символы
  const payload = JSON.parse(atob(base64)) // декодируем base64 и преобразуем данные в формат JSON
  return payload
}
