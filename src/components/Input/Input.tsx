import { FormEvent, HTMLAttributes } from 'react'
import useClassName from '../../hooks/useClassName.hook'
import './Input.css'

/* TEXT INPUT */
interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'email'
  placeholder?: string
  value?: string
  update: (value: string) => void
  filled?: boolean
}

export function TextInput({
  type = 'text',
  className,
  update,
  filled,
  value,
  ...rest
}: TextInputProps) {
  const classNames = useClassName('input', filled && 'filled', className)

  const handleInput = (e: FormEvent<HTMLInputElement>) => update(e.currentTarget.value)

  return <input {...rest} className={classNames} type={type} value={value} onInput={handleInput} />
}

/* CHECKBOX */
interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  checked?: boolean
  update: (value: boolean) => void
}

export function Checkbox({ checked, update, ...rest }: CheckboxProps) {
  const handleInput = () => update(!checked)

  return <input {...rest} checked={checked} type="checkbox" onChange={handleInput} />
}
