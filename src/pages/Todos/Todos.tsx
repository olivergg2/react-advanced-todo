import { useParams } from 'react-router-dom'
import Text from '../../components/Text/Text'
import View, { ErrorView } from '../../components/View/View'
import TodoList from './components/TodoList/TodoList'
import useTodos from '../../hooks/useTodos.hook'
import TodoForm from './components/TodoForm/TodoForm'
import useUser from '../../hooks/useUser.hook'
import { FlatButton } from '../../components/Button/Button'
import useShareTodoModal from '../../modals/ShareTodo/ShareTodo'
import './Todos.css'
import BsShare from '../../icons/Share.icon'

export default function Todos() {
  const { id } = useParams()
  const { user } = useUser()
  const acutalId = Number(id)

  const { list, todos, loading, add } = useTodos(acutalId)
  const { show } = useShareTodoModal(acutalId)

  if (loading) return <Text>Laddar todos...</Text>

  if (!list)
    return (
      <ErrorView
        error="Listan hittades inte"
        reason="Listan finns inte, eller så saknar du behörighet."
      />
    )

  const isOwner = list.user_id === user?.id
  const isEmpty = todos.length === 0

  return (
    <View authorized>
      <header id="todos-page-header">
        <h1>{list.name}</h1>
        {isOwner && (
          <FlatButton onClick={show}>
            <BsShare />
          </FlatButton>
        )}
      </header>
      <section>
        <TodoForm add={add} />
      </section>
      {isEmpty && <Text style={{ textAlign: 'center' }}>Inga todos, lägg till en!</Text>}
      {!isEmpty && <TodoList todos={todos} />}
      <footer>{isOwner || <Text>{list.owner.name} delar denna lista med dig</Text>}</footer>
    </View>
  )
}
