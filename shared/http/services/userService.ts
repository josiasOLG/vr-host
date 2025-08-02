import { BaseService } from '../baseService'
import { User, UserCreateData, UserFilters, UserUpdateData } from '../../interfaces/user.interface'


export class UserService extends BaseService {
  constructor() {
    super('/users')
  }

  async getAllUsers(filters?: UserFilters): Promise<User[]> {
    try {
      const queryString = this.buildQueryString(filters)
      const url = this.buildUrl(`${queryString ? `?${queryString}` : ''}`)
      
      return await this.httpClient.get<User[]>(url)
    } catch (error) {
      this.handleServiceError(error)
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      return await this.httpClient.get<User>(this.buildUrl(`/${id}`))
    } catch (error) {
      this.handleServiceError(error)
    }
  }

  async createUser(userData: UserCreateData): Promise<User> {
    try {
      return await this.httpClient.post<User>(this.buildUrl(''), userData)
    } catch (error) {
      this.handleServiceError(error)
    }
  }

  async updateUser(id: string, userData: UserUpdateData): Promise<User> {
    try {
      const data = userData.avatar 
        ? this.createFormData(userData as Record<string, unknown>)
        : userData

      const config = userData.avatar 
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : undefined

      return await this.httpClient.put<User>(this.buildUrl(`/${id}`), data, config)
    } catch (error) {
      this.handleServiceError(error)
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.httpClient.delete(this.buildUrl(`/${id}`))
    } catch (error) {
      this.handleServiceError(error)
    }
  }

  async uploadAvatar(id: string, avatar: File): Promise<User> {
    try {
      const formData = this.createFormData({ avatar })
      
      return await this.httpClient.patch<User>(
        this.buildUrl(`/${id}/avatar`), 
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
    } catch (error) {
      this.handleServiceError(error)
    }
  }
}

export const userService = new UserService()
