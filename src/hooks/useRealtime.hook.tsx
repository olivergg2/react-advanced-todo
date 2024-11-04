import { useEffect } from 'react'
import supabase from '../config/supabase.config'

interface PostgresChangeHandler extends Record<string, any> {
  update?: (change: any, old: any) => void
  insert?: (change: any, old: any) => void
  delete?: (change: any, old: any) => void
}

export default function useRealtime(
  channel: string,
  table: string,
  changeHandler: PostgresChangeHandler,
  filter?: string
) {
  async function handleChange(payload: any) {
    const event = payload.eventType.toLowerCase()

    const handler = changeHandler[event]

    await handler?.(payload.new, payload.old)
  }

  useEffect(() => {
    const connection = supabase
      .channel(channel)
      .on('postgres_changes', { event: '*', schema: 'public', table, filter }, handleChange)
      .subscribe()

    return () => {
      connection.unsubscribe()
    }
  }, [table, filter, changeHandler])
}
