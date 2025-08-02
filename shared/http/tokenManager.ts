import { ITokenManager } from '../interfaces'

export class TokenManager implements ITokenManager {
  private readonly ACCESS_TOKEN_KEY = 'accessToken'
  private readonly REFRESH_TOKEN_KEY = 'refreshToken'

  getToken(): string | null {
    return typeof window !== 'undefined' 
      ? localStorage.getItem(this.ACCESS_TOKEN_KEY) 
      : null
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token)
    }
  }

  getRefreshToken(): string | null {
    return typeof window !== 'undefined' 
      ? localStorage.getItem(this.REFRESH_TOKEN_KEY) 
      : null
  }

  setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token)
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    }
  }

  removeRefreshToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    }
  }

  clearTokens(): void {
    this.removeToken()
    this.removeRefreshToken()
  }

  isTokenValid(): boolean {
    const token = this.getToken()
    if (!token) return false

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp > currentTime
    } catch {
      return false
    }
  }
}

export const tokenManager = new TokenManager()
