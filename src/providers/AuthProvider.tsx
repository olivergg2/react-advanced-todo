import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { Optional } from '../types'
import AuthService from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { User } from '@supabase/supabase-js'

interface IUserContext {
  user: Optional<User>
  isAuthenticated: boolean
  loading: boolean
  logout: () => Promise<void>
  login: (username: string, password: string) => Promise<boolean>
}

export const UserContext = createContext<Optional<IUserContext>>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<Optional<User>>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const isAuthenticated = Boolean(user)

  async function checkAuthStatus() {
    setLoading(true)
    const user = await AuthService.auth()

    if (user) setUser(user)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  async function login(email: string, password: string) {
    const success = await AuthService.login(email, password)

    if (success) {
      await checkAuthStatus()
      navigate('/')
    }

    return success
  }

  async function logout() {
    const success = await AuthService.logout()

    if (success) setUser(null)
  }

  if (loading) return 'Laddar...'

  return (
    <UserContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
