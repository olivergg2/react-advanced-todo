import Text from '../../components/Text/Text'
import View from '../../components/View/View'
import useUser from '../../hooks/useUser.hook'
import TodoLists from './components/TodoLists/TodoLists'
import './Dashboard.css'
import ListService from '../../services/list.service'
import Button from '../../components/Button/Button'
import useCreateListModal from '../../modals/CreateList/CreateList'
import { useApi } from '../../hooks/useApi.hook'

export function Dashboard() {
  const { user } = useUser()
  const { result: lists, loading, refetch } = useApi(async () => ListService.getUserLists())
  const { show } = useCreateListModal(refetch)

  if (loading) return <Text>Laddar...</Text>

  const own = lists?.filter(list => list.user_id === user?.id) ?? []
  const shared = lists?.filter(list => list.user_id !== user?.id) ?? []

  return (
    <View authorized>
      <header id="dashboard-header">
        <h1>Dashboard</h1>
        <Button title="Ny lista" onClick={show} />
      </header>
      <Text>Välkommen, {user?.user_metadata.name}!</Text>
      {lists?.length === 0 && <h3>Skapa en lista</h3>}

      {own.length !== 0 && (
        <section>
          <h3>Dina listor</h3>
          {lists && <TodoLists lists={own} />}
        </section>
      )}

      {shared.length !== 0 && (
        <section>
          <h3>Delas med dig</h3>
          {lists && <TodoLists lists={shared} />}
        </section>
      )}
    </View>
  )
}
