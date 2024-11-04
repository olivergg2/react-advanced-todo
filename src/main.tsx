import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TodoProvider from './providers/TodoProvider.tsx'
import ModalProvider from './providers/ModalProvider/ModalProvider.tsx'
import { AuthProvider } from './providers/AuthProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TodoProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </TodoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
