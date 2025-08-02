import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IHttpClient } from '../interfaces'
import { InterceptorManager } from './interceptorManager'

export class BaseHttpClient implements IHttpClient {
  protected client: AxiosInstance
  private interceptorManager: InterceptorManager

  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'https://dummyjson.com',
    onTokenRefresh?: () => Promise<string | null>
  ) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.interceptorManager = new InterceptorManager(this.client, onTokenRefresh)
    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.interceptorManager.setupRequestInterceptor()
    this.interceptorManager.setupResponseInterceptor()
  }

  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config)
    return response.data
  }

  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config)
    return response.data
  }

  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config)
    return response.data
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config)
    return response.data
  }

  async patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, config)
    return response.data
  }
}

let httpClientInstance: BaseHttpClient | null = null

export const createHttpClient = (onTokenRefresh?: () => Promise<string | null>): BaseHttpClient => {
  if (!httpClientInstance) {
    httpClientInstance = new BaseHttpClient(
      process.env.NEXT_PUBLIC_API_URL || 'https://dummyjson.com',
      onTokenRefresh
    )
  }
  return httpClientInstance
}

export const httpClient = new BaseHttpClient()
