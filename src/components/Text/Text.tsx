import { HTMLAttributes } from 'react'
import useClassName from '../../hooks/useClassName.hook'

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  value?: string | number
}

export default function Text({ children, value, className, ...rest }: TextProps) {
  const classNames = useClassName('paragraph', className)

  return (
    <p {...rest} className={classNames}>
      {value || children}
    </p>
  )
}
