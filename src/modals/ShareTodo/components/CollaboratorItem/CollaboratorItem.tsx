import { useState } from 'react'
import { List, User } from '../../../../types'
import ListService from '../../../../services/list.service'
import useClassName from '../../../../hooks/useClassName.hook'
import { FlatButton } from '../../../../components/Button/Button'
import BsErase from '../../../../icons/Erase.icon'
import './CollaboratorItem.css'
import { toast } from 'react-toastify'

interface CollaboratorItemProps {
  collaborator: User
  list: List
}

export default function Collaborator({ collaborator, list }: CollaboratorItemProps) {
  const [removed, setRemoved] = useState(false)

  const remove = async () => {
    const { success } = await ListService.removeCollaborator(collaborator.id, list.id)

    if (!success) return toast('Något gick fel', { type: 'warning' })

    setRemoved(true)
    toast(`Tog bort ${collaborator.username} som medarbetare`, { type: 'success' })
  }

  const classNames = useClassName('collaborator-item', removed && 'removed')

  return (
    <li className={classNames}>
      <h3>{collaborator.username}</h3>
      <FlatButton className="remove-collaborator" onClick={remove} disabled={removed}>
        <BsErase />
      </FlatButton>
    </li>
  )
}
