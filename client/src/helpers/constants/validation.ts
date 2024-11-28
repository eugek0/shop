export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const NAME_REGEX = /^[А-ЯЁA-Z][а-яёa-z]{1,}$/

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?\\/])[A-Za-z\d!@#$%^&*()_\-+={}[\]|:;"'<>,.?\\/]{8,}$/

export const EMAIL_ERROR_MESSAGE = 'Почта должна содержать символ @ и .'

export const PASSWORD_ERROR_MESSAGE =
  'Пароль должен содержать 1 строчную, заглавную буквы, цифру и специальный символ, а так-же быть не короче 8 символов'

export const NAME_ERROR_MESSAGE = 'Поле должно начинаться с заглавной буквы'
