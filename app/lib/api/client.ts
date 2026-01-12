import axios from 'axios'
import { getToken, clearToken } from '~/lib/auth/token'

export const apiClient = axios.create({
  baseURL: '/api/v3',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${ token }`
    }
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes('/auth/login')
      const isRegisterRequest = error.config?.url?.includes('/auth/register')

      if (!isLoginRequest && !isRegisterRequest) {
        clearToken()
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  },
)
