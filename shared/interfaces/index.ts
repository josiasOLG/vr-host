export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

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

export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface NavigationItem {
  id: string
  label: string
  path: string
  icon?: string
  children?: NavigationItem[]
}

export interface FormState<T = Record<string, unknown>> {
  data: T
  errors: Record<string, string>
  isSubmitting: boolean
  isDirty: boolean
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
