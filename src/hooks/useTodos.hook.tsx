import { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../providers/TodoProvider'
import { Todo } from '../types'
import ListService from '../services/list.service'
import useRealtime from './useRealtime.hook'
import { useApi } from './useApi.hook'
import TodoService from '../services/todo.service'
import useUser from './useUser.hook'

export function useTodo(todo: Todo) {
  const { removeTodo, toggleComplete } = useContext(TodoContext)!

  const remove = async () => await removeTodo(todo)
  const toggle = async () => await toggleComplete(todo)

  return { remove, toggle }
}

export default function useTodos(listId: number) {
  const { setId } = useContext(TodoContext)!
  const [todos, setTodos] = useState<Todo[]>([])
  const { user } = useUser()

  const { loading, result: list } = useApi(async () => await ListService.getListById(listId))

  async function add(title: string) {
    const { data, success } = await TodoService.add(title, listId)

    if (success) onInsert(data, true)
  }

  function onToggle(todo: Todo) {
    setTodos(current =>
      current.map(old => (old.id === todo.id ? { ...old, complete: !old.complete } : old))
    )
  }

  function onInsert(todo: Todo, force = false) {
    if (!force && todo.user_id === user?.id) return

    setTodos(current => [...current, todo])
  }

  function onDelete(old: { id: number }) {
    setTodos(current => current.filter(todo => todo.id !== old.id))
  }

  // Realtime channel for changes to relevant todos
  useRealtime(
    'todos',
    'todos',
    {
      update: change => onToggle(change),
      insert: change => onInsert(change),
    },
    `list_id=eq.${list?.id}`
  )

  // Separate channel for delete events
  useRealtime('deleted_todos', 'todos', { delete: (_, old) => onDelete(old) })

  useEffect(() => {
    if (!list) return

    setTodos(list.todos)
  }, [list])

  useEffect(() => {
    setId(listId)
  }, [])

  return { todos, list, add, loading }
}
