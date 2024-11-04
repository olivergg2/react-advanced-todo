import { FormEvent, useState } from 'react'
import Button from '../../components/Button/Button'
import { TextInput } from '../../components/Input/Input'
import { useModal, useModalManager } from '../../providers/ModalProvider/modal.hooks'
import { useAuth } from '../../hooks/useAuth.hook'
import './Login.css'

function Login() {
  const { close } = useModalManager()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const success = await login(username, password)

    if (success) close()
  }

  const isSubmitAllowed = username.trim().length >= 3 && password.trim().length >= 6

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <TextInput filled placeholder="Användarnamn..." value={username} update={setUsername} />
      <TextInput
        filled
        placeholder="Super säkert lösenord..."
        value={password}
        update={setPassword}
        type="password"
      />
      <Button bold id="create" title="Logga in" disabled={!isSubmitAllowed} />
    </form>
  )
}

export default function useLoginModal() {
  return useModal({ id: 'login', title: `Logga in`, element: <Login /> })
}
