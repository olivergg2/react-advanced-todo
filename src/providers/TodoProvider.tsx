import { createContext, PropsWithChildren, useState } from 'react'
import { Todo } from '../types'
import useRealtime from '../hooks/useRealtime.hook'
import { toast } from 'react-toastify'
import TodoService from '../services/todo.service'

interface ITodoContext {
  id: number
  setId: (id: number) => void
  addTodo: (title: string) => Promise<any>
  removeTodo: (todo: Todo) => Promise<boolean>
  toggleComplete: (todo: Todo) => Promise<boolean>
}

export const TodoContext = createContext<ITodoContext | null>(null)

export default function TodoProvider({ children }: PropsWithChildren) {
  const [id, setId] = useState<number>(0)

  // Behöver förbättras
  useRealtime('todos', 'todos', {
    insert: () => toast('Ny todo'),
    update: () => toast('Uppdaterade todo'),
  })

  async function addTodo(title: string) {
    return await TodoService.add(title, id)
  }

  async function removeTodo(todo: Todo) {
    return await TodoService.remove(todo)
  }

  async function toggleComplete(todo: Todo) {
    return await TodoService.toggleComplete(todo)
  }

  return (
    <TodoContext.Provider value={{ id, setId, addTodo, removeTodo, toggleComplete }}>
      {children}
    </TodoContext.Provider>
  )
}
