import { httpClient } from './index'

export interface LoginCredentials {
  username: string
  password: string
  expiresInMins?: number
}

export interface LoginResponse {
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

export class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>('/auth/login', credentials)
    
    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken)
    }
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken)
    }
    
    return response
  }

  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await httpClient.post<LoginResponse>('/auth/refresh', {
      refreshToken
    })
    
    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken)
    }
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken)
    }
    
    return response
  }

  async handleTokenRefresh(): Promise<string | null> {
    try {
      const response = await this.refreshToken()
      return response.accessToken
    } catch {
      this.logout()
      return null
    }
  }

  logout(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken')
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authService = new AuthService()
