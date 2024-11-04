import supabase from '../config/supabase.config'

export async function getUserAsync() {
  const { data } = await supabase.auth.getUser()

  return data.user
}
