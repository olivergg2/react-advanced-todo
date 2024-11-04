export type Nullable<T> = T | null
export type Optional<T> = T | undefined | null

export interface Todo {
  id: number
  list_id: number
  complete: boolean
  title: string
  user_id: string
}

export interface User {
  id: string
  username: string
  name: string
}

export interface Collaborator {
  collaborator: User
}

export interface List {
  id: number
  name: string
  description?: string
  public: boolean
  created_at: string
  user_id: string
  owner: User
}

export interface ListWithTodos extends List {
  todos: Todo[]
  collaborators: Collaborator[]
}
