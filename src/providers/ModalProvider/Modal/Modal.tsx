import { HTMLAttributes, useEffect } from 'react'
import styles from './Modal.module.css'
import { FlatButton } from '../../../components/Button/Button'
import BsErase from '../../../icons/Erase.icon'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  closeable?: boolean
  centered?: boolean
  close: () => void
}

export default function Modal({
  title,
  children,
  closeable,
  centered,
  close,
  ...rest
}: ModalProps) {
  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (closeable !== false && e.key === 'Escape') close()
    }

    document.addEventListener('keyup', handleKeyUp)

    return () => document.removeEventListener('keyup', handleKeyUp)
  }, [close, closeable])

  return (
    <article className={styles.modal} {...rest}>
      <section data-centered={centered} className={styles['modal-header']}>
        {title && <h3>{title}</h3>}

        {closeable !== false && (
          <FlatButton className={styles['modal-close']} onClick={close}>
            <BsErase />
          </FlatButton>
        )}
      </section>

      {children}
    </article>
  )
}
