import { SWRConfig } from 'swr'
import { apiClient } from '~/lib/api/client'
import type { ReactNode } from 'react'

const fetcher = (url: string) => {
  if (typeof window === 'undefined') {
    return Promise.resolve(null)
  }
  return apiClient.get(url).then((res) => res.data)
}

const swrConfig = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  shouldRetryOnError: true,
  dedupingInterval: 2000,
  provider: () => {
    if (typeof window === 'undefined') {
      return new Map()
    }
    return new Map()
  },
  onError: (error: any) => {
    if (error?.response?.status === 401 && typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  },
}

export function SWRProvider({ children }: { children: ReactNode }) {
  return <SWRConfig value={ swrConfig }>{ children }</SWRConfig>
}
