export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserCreateData {
  name: string
  email: string
  password: string
  role?: 'admin' | 'user' | 'guest'
}

export interface UserUpdateData {
  name?: string
  email?: string
  role?: 'admin' | 'user' | 'guest'
  avatar?: File
}

export interface UserFilters extends Record<string, unknown> {
  page?: number
  limit?: number
  role?: 'admin' | 'user' | 'guest'
  search?: string
}

