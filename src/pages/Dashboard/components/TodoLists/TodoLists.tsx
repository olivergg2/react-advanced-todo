import { List } from '../../../../types'
import TodoListsItem from '../TodoListsItem/TodoListsItem'
import './TodoLists.css'

interface TodosListsListProps {
  lists: List[]
}

export default function TodosLists({ lists }: TodosListsListProps) {
  return (
    <ul id="todo-lists">
      {lists.map(list => (
        <TodoListsItem key={list.id} list={list} />
      ))}
    </ul>
  )
}
