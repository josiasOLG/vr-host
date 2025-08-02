import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido'),
  role: z.enum(['admin', 'user', 'guest']),
  avatar: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateUserSchema = UserSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
})

export const UpdateUserSchema = CreateUserSchema.partial()

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    message: z.string(),
    success: z.boolean(),
    errors: z.array(z.string()).optional(),
  })

export const PaginationSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1).max(100),
  total: z.number().min(0),
  totalPages: z.number().min(0),
})

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    message: z.string(),
    success: z.boolean(),
    errors: z.array(z.string()).optional(),
    pagination: PaginationSchema,
  })

export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(1, 'Nome é obrigatório'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
})

export const NavigationItemSchema: z.ZodType<{
  id: string
  label: string
  path: string
  icon?: string
  children?: Array<{
    id: string
    label: string
    path: string
    icon?: string
    children?: unknown
  }>
}> = z.lazy(() =>
  z.object({
    id: z.string(),
    label: z.string(),
    path: z.string(),
    icon: z.string().optional(),
    children: z.array(NavigationItemSchema).optional(),
  })
)
