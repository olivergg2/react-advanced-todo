import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/Dashboard/Dashboard'
import Header from './layout/Header/Header'
import Login from './pages/Login/Login'
import Footer from './layout/Footer/Footer'
import Todos from './pages/Todos/Todos'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer position="top-center" theme="dark" toastClassName={'todo-toasts'} />
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<Todos />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
