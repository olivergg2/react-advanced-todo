import { FormEvent, useState } from 'react'
import { useModal, useModalManager } from '../../providers/ModalProvider/modal.hooks'
import { TextInput } from '../../components/Input/Input'
import ListService from '../../services/list.service'
import Button from '../../components/Button/Button'

interface CreateListProps {
  onCreate: () => void
}

function CreateList({ onCreate }: CreateListProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { close } = useModalManager()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const success = await ListService.createList(name, description)

    if (!success) return

    onCreate()
    close()
  }

  const isSubmitAllowed = name.trim().length >= 3

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <TextInput filled placeholder="Namn..." value={name} update={setName} />
      <TextInput filled placeholder="Beskrivning..." value={description} update={setDescription} />

      <Button bold id="create-new-list" title="Skapa" disabled={!isSubmitAllowed} />
    </form>
  )
}

export default function useCreateListModal(onCreate: () => void) {
  return useModal({
    id: 'create-modal',
    title: 'Skapa ny lista',
    element: <CreateList onCreate={onCreate} />,
  })
}
