import { Todo } from '../../../../types'
import TodoItem from '../TodoItem/TodoItem'
import './TodoList.css'

interface TodoListProps {
  todos: Todo[]
}

export default function TodoList({ todos }: TodoListProps) {
  return (
    <ul id="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
