import { IHttpClient, IBaseService } from '../interfaces'
import { httpClient } from './baseHttpClient'
import { errorHandler } from './errorHandler'

export abstract class BaseService implements IBaseService {
  protected httpClient: IHttpClient
  public readonly baseUrl: string

  constructor(baseUrl: string, httpClientInstance: IHttpClient = httpClient) {
    this.baseUrl = baseUrl
    this.httpClient = httpClientInstance
  }

  protected buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`
  }

  protected buildQueryString(params?: Record<string, unknown>): string {
    if (!params) return ''
    
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, String(value))
      }
    })
    
    return searchParams.toString()
  }

  protected handleServiceError(error: unknown): never {
    console.error(`${this.constructor.name} error:`, error)
    return errorHandler.handleError(error)
  }

  protected createFormData(data: Record<string, unknown>): FormData {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, String(value))
        }
      }
    })
    return formData
  }
}
