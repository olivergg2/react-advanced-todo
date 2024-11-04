import Button from '../../components/Button/Button'
import { useAuth } from '../../hooks/useAuth.hook'
import useUser from '../../hooks/useUser.hook'
import { useModal, useModalManager } from '../../providers/ModalProvider/modal.hooks'
import './Profile.css'

function Profile() {
  const { logout } = useAuth()
  const { close } = useModalManager()

  async function handleLogout() {
    await logout()
    close()
  }

  return (
    <>
      <Button bold id="logout" title="Logga ut" onClick={handleLogout} />
    </>
  )
}

export default function useProfileModal() {
  const { user } = useUser()

  return useModal({
    id: 'profile',
    title: `Hej, ${user?.user_metadata.username}`,
    element: <Profile />,
  })
}
