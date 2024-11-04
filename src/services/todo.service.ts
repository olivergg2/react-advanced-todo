import supabase from '../config/supabase.config'
import { getUserAsync } from '../helpers/user.helper'
import { Todo } from '../types'

async function add(title: string, listId: number) {
  const user = await getUserAsync()

  if (!user) return { data: null, success: false }

  const { data, error } = await supabase
    .from('todos')
    .insert({ title, list_id: listId, user_id: user.id })
    .select('*')
    .single()

  return { data, success: error === null }
}

async function toggleComplete({ id, complete }: Todo) {
  const { error } = await supabase.from('todos').update({ complete: !complete }).eq('id', id)

  return error === null
}

async function remove(todo: Todo) {
  const { error } = await supabase.from('todos').delete().eq('id', todo.id)

  return error === null
}

const TodoService = { add, toggleComplete, remove }

export default TodoService
