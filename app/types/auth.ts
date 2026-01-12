export interface User {
  id: number
  nickname: string
  email: string
  role: 'user' | 'admin'
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  nickname: string
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
}
