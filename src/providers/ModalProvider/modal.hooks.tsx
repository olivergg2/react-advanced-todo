import { ReactNode, useCallback, useContext, useRef } from 'react'
import { ModalContext } from './ModalProvider'
import Modal from './Modal/Modal'

export interface UseModalProps {
  title?: string
  element?: ReactNode
  id: string
  closeable?: boolean
  centered?: boolean
}

export function useModal({ element, ...rest }: UseModalProps) {
  const { setModalAsActive } = useContext(ModalContext)!

  const close = useCallback(() => setModalAsActive(null), [setModalAsActive])

  const actual = useRef(() => (
    <Modal {...rest} close={close}>
      {element}
    </Modal>
  ))

  const show = useCallback(() => {
    setModalAsActive(actual.current())
  }, [actual, setModalAsActive])

  return { show, close }
}

export function useModalManager() {
  const { setModalAsActive } = useContext(ModalContext)!

  const close = () => setModalAsActive(null)

  return { close }
}
