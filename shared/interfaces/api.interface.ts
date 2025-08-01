export interface ApiResponse<T = unknown> {
  data: T
  message: string
  success: boolean
  errors?: string[]
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
