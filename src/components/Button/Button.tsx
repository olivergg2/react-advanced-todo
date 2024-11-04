import { HTMLAttributes } from 'react'
import useClassName from '../../hooks/useClassName.hook'
import './Button.css'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  bold?: boolean
  title?: string
  disabled?: boolean
}

export default function Button({
  bold,
  title,
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const classNames = useClassName('button', bold && 'bold', className)

  return (
    <button {...rest} className={classNames} disabled={disabled}>
      {title || children}
    </button>
  )
}

interface FlatButtonProps extends ButtonProps {}

export function FlatButton({ className, ...rest }: FlatButtonProps) {
  const classNames = useClassName('flat', className)

  return <Button {...rest} className={classNames} />
}
