import { FormEvent, useState } from 'react'
import { useAuth } from '../../hooks/useAuth.hook'
import { useModal, useModalManager } from '../../providers/ModalProvider/modal.hooks'
import AuthService from '../../services/auth.service'
import { TextInput } from '../../components/Input/Input'
import Button from '../../components/Button/Button'

function Register() {
  const { close } = useModalManager()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    console.log(name)

    const registerSuccess = await AuthService.register(name, email, username, password)

    console.log(registerSuccess)

    if (!registerSuccess) return

    const success = await login(email, password)

    console.log(success)

    if (success) close()
  }

  const isSubmitAllowed = username.trim().length >= 3 && password.trim().length >= 6

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <TextInput filled placeholder="Användarnamn..." value={username} update={setUsername} />
      <TextInput filled placeholder="Namn..." value={name} update={setName} />
      <TextInput filled placeholder="Email..." value={email} update={setEmail} type="email" />
      <TextInput
        filled
        placeholder="Lösenord..."
        value={password}
        update={setPassword}
        type="password"
      />
      <Button bold id="create" title="Skapa" disabled={!isSubmitAllowed} />
    </form>
  )
}

export default function useRegisterModal() {
  return useModal({ id: 'register-modal', title: 'Skapa ett konto', element: <Register /> })
}
