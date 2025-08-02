import { BaseService } from '../baseService'
import { tokenManager } from '../tokenManager'
import { 
  LoginCredentials, 
  RefreshTokenRequest, 
  AuthResponse, 
  UserProfile 
} from '../../interfaces/auth'

export class AuthService extends BaseService {
  constructor() {
    super('/auth')
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.httpClient.post<AuthResponse>(
        this.buildUrl('/login'), 
        credentials
      )
      
      this.storeTokens(response)
      return response
    } catch (error) {
      this.handleServiceError(error)
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = tokenManager.getRefreshToken()
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await this.httpClient.post<AuthResponse>(
        this.buildUrl('/refresh'),
        { refreshToken } as RefreshTokenRequest
      )
      
      this.storeTokens(response)
      return response
    } catch (error) {
      this.handleServiceError(error)
    }
  }

  async getUserProfile(): Promise<UserProfile> {
    try {
      return await this.httpClient.get<UserProfile>(this.buildUrl('/me'))
    } catch (error) {
      this.handleServiceError(error)
    }
  }

  async logout(): Promise<void> {
    try {
      const refreshToken = tokenManager.getRefreshToken()
      if (refreshToken) {
        await this.httpClient.post(this.buildUrl('/logout'), { refreshToken })
      }
    } catch (error) {
      console.warn('Logout API call failed:', error)
    } finally {
      this.clearTokens()
    }
  }

  async handleTokenRefresh(): Promise<string | null> {
    try {
      const response = await this.refreshToken()
      return response.accessToken
    } catch {
      this.clearTokens()
      return null
    }
  }

  getToken(): string | null {
    return tokenManager.getToken()
  }

  isAuthenticated(): boolean {
    return tokenManager.isTokenValid()
  }

  private storeTokens(response: AuthResponse): void {
    if (response.accessToken) {
      tokenManager.setToken(response.accessToken)
    }
    if (response.refreshToken) {
      tokenManager.setRefreshToken(response.refreshToken)
    }
  }

  private clearTokens(): void {
    tokenManager.clearTokens()
  }
}

export const authService = new AuthService()
