import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useState,
} from 'react'
import styles from './ModalProvider.module.css'

interface IModalContext {
  setModalAsActive: (modal: ReactNode) => unknown
}

export const ModalContext = createContext<IModalContext | null>(null)

export default function ModalProvider({ children }: PropsWithChildren) {
  const [current, setCurrent] = useState<ReactNode>(null)

  const isActiveClass = current !== null ? styles.active : ''

  const setModalAsActive = useCallback((modal: ReactNode) => {
    setCurrent(modal)
  }, [])

  return (
    <ModalContext.Provider value={{ setModalAsActive }}>
      <div id={styles['modal-portal']} className={isActiveClass}>
        {current}
      </div>
      {children}
    </ModalContext.Provider>
  )
}
