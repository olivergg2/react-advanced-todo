import { FormEvent, useState } from 'react'
import { TextInput } from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import './TodoForm.css'

interface TodoFormProps {
  add: (title: string) => void
}

export default function TodoForm({ add }: TodoFormProps) {
  const [title, setTitle] = useState('')

  const isSubmitAllowed = title.length >= 3

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    add(title)

    setTitle('')
  }

  return (
    <form id="add-todo-form" onSubmit={handleSubmit}>
      <TextInput placeholder="En superviktig todo..." value={title} update={setTitle} />
      <Button title="Lägg till" disabled={!isSubmitAllowed} />
    </form>
  )
}
