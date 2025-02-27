import React from 'react'
import Landing from './pages/Landing'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import Pnf from './pages/Pnf'
import Admin from './pages/Admin'
import Manager from './pages/Manager'
import Employee from './pages/Employee'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {/* ADMIN */}
      <Route path='/admin' element={<Admin />}>

      </Route>
      {/* MANAGER */}
      <Route path='/manager' element={<Manager />}>

      </Route>
      {/* EMPLOYEE */}
      <Route path='/employee' element={<Employee />}>

      </Route>
      <Route path='*' element={<Pnf />} />
    </Routes>
  )
}

export default App