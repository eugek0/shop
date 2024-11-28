import { useQuery } from '@tanstack/react-query'
import { NavigationApi } from '../../api/navigation.api'

export const usePageIsLoaded = () => {
  const { qkGetNavigation, getNavigation } = NavigationApi

  const { status: navigationStatus } = useQuery(qkGetNavigation, getNavigation)

  return { isLoading: navigationStatus !== 'success' }
}
