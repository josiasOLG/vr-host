import { AxiosRequestConfig } from 'axios'

export interface IHttpClient {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
}

export interface IBaseService {
  readonly baseUrl: string
}

export interface IErrorHandler {
  handleError(error: unknown): never
}

export interface ITokenManager {
  getToken(): string | null
  setToken(token: string): void
  removeToken(): void
  isTokenValid(): boolean
}

export interface IInterceptorManager {
  setupRequestInterceptor(): void
  setupResponseInterceptor(): void
}
