import {
  AuthorizationForm,
  Confirmation,
  RegistrationForm,
} from '../assets/models/authForms'
import { configuredAxios } from '../helpers/intersepter/intersepter'

export abstract class AuthApi {
  static async registration(params: RegistrationForm) {
    const { data } = await configuredAxios.post('/authorization/registration', {
      ...params,
      genderId: 'a6765a55-17e5-454e-ab33-dd874398c8da',
    })

    return data
  }

  static async confirmation(params: Confirmation) {
    const { data } = await configuredAxios.patch(
      '/authorization/confirmation',
      params,
    )

    return data
  }

  static async login(params: AuthorizationForm) {
    const { data } = await configuredAxios.post('/authorization/login', params)

    return data
  }
}
