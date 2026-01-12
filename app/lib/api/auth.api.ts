import { apiClient } from '~/lib/api/client'
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '~/types/auth'

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const params = new URLSearchParams()
    params.append('username', credentials.username)
    params.append('password', credentials.password)

    const response = await apiClient.post<AuthResponse>('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  },

  register: async (data: RegisterRequest): Promise<User> => {
    const response = await apiClient.post<User>('/auth/register', data)
    return response.data
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me')
    return response.data
  },
}
