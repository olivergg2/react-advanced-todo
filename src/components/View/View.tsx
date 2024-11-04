import { HTMLAttributes } from 'react'
import useClassName from '../../hooks/useClassName.hook'
import useUser from '../../hooks/useUser.hook'
import { Navigate, useNavigate } from 'react-router-dom'
import './View.css'
import { useAuth } from '../../hooks/useAuth.hook'
import Button from '../Button/Button'
import Text from '../Text/Text'
import BsError from '../../icons/Error.icon'

interface ViewProps extends HTMLAttributes<HTMLDivElement> {
  authorized?: boolean
  title?: string
}

export default function View({ authorized, title, className, children, ...rest }: ViewProps) {
  const { isAuthenticated } = useUser()
  const { loading } = useAuth()

  if (authorized && loading) return <main>Laddar...</main>

  if (authorized && !isAuthenticated) return <Navigate to={'/login'} />

  const classNames = useClassName('view-content', className)

  return (
    <main className="view">
      <section {...rest} className={classNames}>
        {title && <h1>{title}</h1>}
        {children}
      </section>
    </main>
  )
}

interface ErrorViewProps {
  error: string
  reason?: string
}

export function ErrorView({ error, reason }: ErrorViewProps) {
  const navigate = useNavigate()

  return (
    <View id="error-view">
      <section id="error-message-container">
        <BsError height="3rem" width="3rem" />
        <h2 id="error-error">{error}</h2>
        {reason && <Text>{reason}</Text>}
        <Button title="Gå till hem" onClick={() => navigate('/')} />
      </section>
    </View>
  )
}
