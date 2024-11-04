import Button from '../../components/Button/Button'
import useUser from '../../hooks/useUser.hook'
import './Header.css'
import useProfileModal from '../../modals/Profile/Profile'

export default function Header() {
  const { user, isAuthenticated } = useUser()
  const { show } = useProfileModal()

  return (
    <nav>
      <h3>OG</h3>
      {isAuthenticated && <Button bold title={user?.user_metadata.username} onClick={show} />}
    </nav>
  )
}
