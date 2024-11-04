import { useEffect, useState } from 'react'
import { getFromLocalStorage, saveToLocalStorage } from '../helpers/localeStorage.helper'

export default function useStored<T>(key: string, fallback: T) {
  const stored = useState(() => getFromLocalStorage<T>(key) ?? fallback)
  const state = stored[0]

  useEffect(() => {
    // Save state to localStorage whenever it is manipulated
    saveToLocalStorage(key, state)
  }, [state])

  return stored
}
