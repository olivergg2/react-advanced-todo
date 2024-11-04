import supabase from '../config/supabase.config'
import { getUserAsync } from '../helpers/user.helper'
import { List, ListWithTodos } from '../types'

const ListService = {
  getUserLists: async () => {
    const { data, error } = await supabase
      .from('lists')
      .select('*, owner:profiles!user_id (id,name,username)')

    if (error) return []

    return data as List[]
  },
  getListById: async (id: number) => {
    const { data: list } = await supabase
      .from('lists')
      .select('*, todos (*), owner:profiles!user_id (*)')
      .eq('id', id)
      .single()

    if (!list) return null

    const { data: collaborators } = await supabase
      .from('list_collaborators')
      .select(
        `
        collaborator:profiles!collaborator_id (
          id, name, username
        )
      `
      )
      .eq('list_id', list.id)

    return { ...list, collaborators } as ListWithTodos
  },
  createList: async (name: string, description?: string) => {
    const user = await getUserAsync()

    if (!user) return false

    const { error } = await supabase.from('lists').insert({ name, description, user_id: user.id })

    return error === null
  },
  addCollaborator: async (username: string, listId: number) => {
    const { data, status } = await supabase.rpc('add_list_collaborator', {
      username,
      list_id: listId,
    })

    return { data, status, success: status === 204 }
  },
  removeCollaborator: async (userId: string, listId: number) => {
    const { data, status } = await supabase.rpc('remove_list_collaborator', {
      userid: userId,
      listid: listId,
    })

    return { data, status, success: status === 204 }
  },
}

export default ListService
