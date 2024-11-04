import { createClient } from '@supabase/supabase-js'

const databaseUrl = import.meta.env.VITE_DATABASE_URL
const databaseKey = import.meta.env.VITE_DATABASE_KEY

const supabase = createClient(databaseUrl, databaseKey)

export default supabase
