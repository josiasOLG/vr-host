import { AxiosInstance } from 'axios'
import { IInterceptorManager } from '../interfaces'
import { tokenManager } from './tokenManager'
import { errorHandler } from './errorHandler'

export class InterceptorManager implements IInterceptorManager {
  constructor(
    private client: AxiosInstance,
    private onTokenRefresh?: () => Promise<string | null>
  ) {}

  setupRequestInterceptor(): void {
    this.client.interceptors.request.use(
      (config) => {
        const token = tokenManager.getToken()
        if (token) {
          config.headers = config.headers || {}
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
  }

  setupResponseInterceptor(): void {
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          
          if (this.onTokenRefresh) {
            try {
              const newAccessToken = await this.onTokenRefresh()
              if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return this.client(originalRequest)
              }
            } catch {
              this.handleAuthFailure()
            }
          } else {
            this.handleAuthFailure()
          }
        }
        
        return Promise.reject(errorHandler.handleError(error))
      }
    )
  }

  private handleAuthFailure(): void {
    tokenManager.clearTokens()
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }
}
