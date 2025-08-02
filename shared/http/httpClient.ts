import { createHttpClient } from './baseHttpClient'
import { authService } from './services/authService'

export const httpClient = createHttpClient(() => authService.handleTokenRefresh())

export * from './baseHttpClient'
export * from './baseService'
export * from './tokenManager'
export * from './errorHandler'
export * from './interceptorManager'
export * from './services'

export const createFormData = (data: Record<string, unknown>): FormData => {
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

export const createQueryString = (params: Record<string, unknown>): string => {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value))
    }
  })
  return searchParams.toString()
}
