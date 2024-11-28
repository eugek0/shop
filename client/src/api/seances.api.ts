import { GetServerSidePropsContext } from 'next'
import { configuredAxios } from '../helpers/intersepter/intersepter'
import { Seance } from '../assets/models/seance'
import { getDynamicAxios } from '../helpers/functions/getDynamicIntersepter'

export abstract class SeancesApi {
  static qkGetSeances = ['get-seances']

  static async getSeances(
    context?: GetServerSidePropsContext,
  ): Promise<Seance[]> {
    if (context) {
      const { dynamicAxios } = getDynamicAxios(context)
      const { data } = await dynamicAxios.get('/seances')
      return data
    }

    const { data } = await configuredAxios.get('/seances')
    return data
  }

  static async deleteSeance(id: string) {
    const { data } = await configuredAxios.delete(`/seances?id=${id}`)

    return data
  }

  static async deleteAllSeances() {
    const { data } = await configuredAxios.delete('/seances')

    return data
  }

  static async logout() {
    const { data } = await configuredAxios.get('/seances/logout')

    return data
  }
}
