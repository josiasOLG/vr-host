export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface FormState<T = Record<string, unknown>> {
  data: T
  errors: Record<string, string>
  isSubmitting: boolean
  isDirty: boolean
}
