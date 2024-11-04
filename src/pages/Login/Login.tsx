import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import View from '../../components/View/View'
import useLoginModal from '../../modals/Login/Login'
import useRegisterModal from '../../modals/Register/Register'
import './Login.css'

export default function Login() {
  const { show: showLogin } = useLoginModal()
  const { show: showRegister } = useRegisterModal()

  return (
    <View id="login-view">
      <section id="login-container">
        <Button title="Logga in" onClick={showLogin} />
        <Text value="eller" />
        <Button title="Registrera dig" onClick={showRegister} />
      </section>
    </View>
  )
}
