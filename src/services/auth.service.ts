import supabase from '../config/supabase.config'

async function logout() {
  const { error } = await supabase.auth.signOut()

  return error === null
}

async function auth() {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data) return null

  return data.user
}

async function login(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  return error === null
}

async function register(name: string, email: string, username: string, password: string) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        username,
      },
    },
  })

  return error === null
}

const AuthService = { auth, login, register, logout }

export default AuthService
