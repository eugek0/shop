import { configuredAxios } from '../helpers/intersepter/intersepter'
import { DefaultProfile, Profile } from '../assets/models/profile'

export abstract class ProfileApi {
  static qkGetProfile = ['get-profile']

  static async getProfile(): Promise<DefaultProfile> {
    const { data } = await configuredAxios.get('/users')

    return data
  }

  static async updateProfile(params: Profile) {
    const { data } = await configuredAxios.patch('/users', params)

    return data
  }
}
