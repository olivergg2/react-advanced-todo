import { FlatButton } from '../../../../components/Button/Button'
import { Checkbox } from '../../../../components/Input/Input'
import useClassName from '../../../../hooks/useClassName.hook'
import { useTodo } from '../../../../hooks/useTodos.hook'
import { Todo } from '../../../../types'
import './TodoItem.css'

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggle, remove } = useTodo(todo)

  const classNames = useClassName('todo-item', todo.complete && 'complete')
  const isRemoveAllowed = todo.complete === true

  return (
    <li className={classNames}>
      <Checkbox checked={todo.complete} update={toggle} />
      <p className="todo-title">{todo.title}</p>
      {isRemoveAllowed && <FlatButton className="remove-todo" title="x" onClick={remove} />}
    </li>
  )
}
