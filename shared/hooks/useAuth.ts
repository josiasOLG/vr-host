import { useEffect, useState } from 'react'
import { authService } from '../http/services/authService'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          setIsAuthenticated(true)
          setIsLoading(false)
          return
        }
        await authService.login({
          username: 'emilys',
          password: 'emilyspass',
          expiresInMins: 30
        })

        setIsAuthenticated(true)
      } catch (error) {
        console.error('Auto login failed:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const logout = () => {
    authService.logout()
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    isLoading,
    logout
  }
}
