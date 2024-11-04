import { useContext } from 'react'
import { UserContext } from '../providers/AuthProvider'

export function useAuth() {
  const { login, logout, loading } = useContext(UserContext)!

  return { login, logout, loading }
}
