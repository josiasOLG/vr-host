import { IErrorHandler } from '../interfaces'

export interface HttpError {
  status?: number
  message: string
  data?: unknown
}

export class ErrorHandler implements IErrorHandler {
  handleError(error: unknown): never {
    if (this.isAxiosError(error)) {
      const responseData = error.response?.data as { message?: string }
      const httpError: HttpError = {
        status: error.response?.status,
        message: responseData?.message || error.message,
        data: error.response?.data
      }
      
      this.logError(httpError)
      throw httpError
    }
    
    const genericError: HttpError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }
    
    this.logError(genericError)
    throw genericError
  }

  private isAxiosError(error: unknown): error is {
    response?: { status: number; data: unknown }
    message: string
  } {
    return error !== null && 
           typeof error === 'object' && 
           'response' in error
  }

  private logError(error: HttpError): void {
    console.error('HTTP Error:', {
      status: error.status,
      message: error.message,
      data: error.data,
      timestamp: new Date().toISOString()
    })
  }
}

export const errorHandler = new ErrorHandler()
