import { FormEvent, useState } from 'react'
import { useModal, useModalManager } from '../../providers/ModalProvider/modal.hooks'
import { TextInput } from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import ListService from '../../services/list.service'
import { useApi } from '../../hooks/useApi.hook'
import './ShareTodo.css'
import Text from '../../components/Text/Text'
import Collaborator from './components/CollaboratorItem/CollaboratorItem'
import { toast } from 'react-toastify'

interface ShareTodoProps {
  listId: number
}

function ShareTodo({ listId }: ShareTodoProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { close } = useModalManager()
  const { result: list, loading } = useApi(async () => await ListService.getListById(listId))

  if (loading) return 'loading...'
  if (!list) return 'failed to load list'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const { success, status } = await ListService.addCollaborator(name, list!.id)

    if (success) {
      toast(`Lade till ${name} som medarbetare`, { type: 'info' })
      return close()
    }

    if (status === 409) return setError('Delar redan med denna användare')
    if (status === 400) return setError('Hittade inte användare')
  }

  function handleInput(s: string) {
    setName(s)
    setError('')
  }

  const isSubmitAllowed = name.trim().length >= 3

  return (
    <>
      <form id="login-form" onSubmit={handleSubmit}>
        <TextInput
          id="username-input"
          filled
          placeholder="Användarnamn..."
          value={name}
          update={handleInput}
          data-error={!!error}
        />
        {error && <Text id="share-error">{error}</Text>}
        <Button bold id="create-new-todo" title="Lägg till" disabled={!isSubmitAllowed} />
      </form>
      <ul id="collaborators">
        {list.collaborators.map(c => (
          <Collaborator key={c.collaborator.id} collaborator={c.collaborator} list={list} />
        ))}
      </ul>
    </>
  )
}

export default function useShareTodoModal(listId: number) {
  return useModal({
    id: 'share-todo-modal',
    title: 'Dela din todo-lista',
    element: <ShareTodo listId={listId} />,
  })
}
