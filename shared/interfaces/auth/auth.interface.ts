export interface LoginCredentials {
  username: string
  password: string
  expiresInMins?: number
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface AuthResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface UserProfile {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}
