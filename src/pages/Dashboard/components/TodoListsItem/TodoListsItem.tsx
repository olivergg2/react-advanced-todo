import { useNavigate } from 'react-router-dom'
import Text from '../../../../components/Text/Text'
import { List } from '../../../../types'
import './TodoListsItem.css'
import useUser from '../../../../hooks/useUser.hook'

interface TodoListsItemProps {
  list: List
}

export default function TodoListsItem({ list }: TodoListsItemProps) {
  const navigate = useNavigate()
  const { user } = useUser()

  const isOwner = user?.id === list.user_id

  return (
    <li className="todo-lists-item" onClick={() => navigate(`/${list.id}`)}>
      <h2>{list.name}</h2>
      <p>{list.description}</p>
      {isOwner || <Text>Ägs av {list.owner.name} ⚠️</Text>}
    </li>
  )
}
