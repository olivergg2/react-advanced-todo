import { useContext } from 'react'
import { UserContext } from '../providers/AuthProvider'

export default function useUser() {
  const { user, isAuthenticated } = useContext(UserContext)!

  return { user, isAuthenticated }
}
