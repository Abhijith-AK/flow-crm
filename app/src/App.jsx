import React, { useEffect, useState } from 'react'
import Landing from './pages/Landing'
import { Route, Routes, useLocation } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import Pnf from './pages/Pnf'
import Admin from './pages/Admin'
import Manager from './pages/Manager'
import Employee from './pages/Employee'
import AdminDashboard from './components/Admin/AdminDashboard'
import CrmManagement from './components/Admin/crmManagement'
import Payments from './components/Admin/Payments'
import Complaints from './components/Admin/Complaints'
import CrmView from './components/Admin/CrmView'
import ManagerDasboard from './components/Manager/ManagerDasboard'
import ManagerLeads from './components/Manager/ManagerLeads'
import ManagerEmployees from './components/Manager/ManagerEmployees'
import ManagerTasks from './components/Manager/ManagerTasks'
import ManagerSettings from './components/Manager/ManagerSettings'
import ManagerChat from './components/Manager/ManagerChat'
import { useSelector } from 'react-redux'

const App = () => {
  const location = useLocation()
  const { crm } = useSelector((state) => state.crm)
  const [title, setTitle] = useState("")
  useEffect(() => {
    if (crm?.name) {
      setTitle(crm.name)
    }
  }, [crm])
  useEffect(() => {
    const titles = {
      '/': 'FlowCRM',
      '/login': 'FlowCRM - Login',
      '/register': 'FlowCRM - Register',
      '/admin': 'Admin',
      '/admin/crm': 'CRM Management',
      '/admin/bills': 'Payments',
      '/admin/requests': 'Complaints',
    };

    const path = location.pathname;

    let dynamicTitle = titles[path] || 'FlowCRM';

    if (location.pathname.includes('/manager')) {
      dynamicTitle = `${title}`
    }
    if (location.pathname.includes('manager/leads')) {
      dynamicTitle = `${title} - Leads`
    } else if (location.pathname.includes('manager/team')) {
      dynamicTitle = `${title} - Team`
    } else if (location.pathname.includes('manager/tasks')) {
      dynamicTitle = `${title} - Tasks`
    } else if (location.pathname.includes('manager/settings')) {
      dynamicTitle = `${title} - Settings`
    } else if (location.pathname.includes('manager/chat')) {
      dynamicTitle = `${title} - Chat`
    }

    document.title = dynamicTitle;
  }, [location, title])
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {/* ADMIN */}
      <Route path='/admin' element={<Admin />}>
        <Route index element={<AdminDashboard />} />
        <Route path='crm' element={<CrmManagement />} />
        <Route path='crm/:id' element={<CrmView />} />
        <Route path='bills' element={<Payments />} />
        <Route path='requests' element={<Complaints />} />
      </Route>
      {/* MANAGER */}
      <Route path='/crm/:id/manager' element={<Manager />}>
        <Route index element={<ManagerDasboard />} />
        <Route path='leads' element={<ManagerLeads />} />
        <Route path='team' element={<ManagerEmployees />} />
        <Route path='tasks' element={<ManagerTasks />} />
        <Route path='settings' element={<ManagerSettings />} />
        <Route path='chat' element={<ManagerChat />} />
      </Route>
      {/* EMPLOYEE */}
      <Route path='/crm/:id/employee' element={<Employee />}>

      </Route>
      <Route path='*' element={<Pnf />} />
    </Routes>
  )
}

export default App