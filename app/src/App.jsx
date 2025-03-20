import { useEffect, useState } from 'react'
import Landing from './pages/Landing'
import { Route, Routes, useLocation } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import Pnf from './pages/Pnf'
import Admin from './pages/Admin'
import Manager from './pages/Manager'
import Employee from './pages/Employee'
import AdminDashboard from './components/Admin/AdminDashboard'
import Payments from './components/Admin/Payments'
import Complaints from './components/Admin/Complaints'
import CrmView from './components/Admin/CrmView'
import ManagerDasboard from './components/Manager/ManagerDasboard'
import ManagerEmployees from './components/Manager/Employee/ManagerEmployees'
import ManagerSettings from './components/Manager/ManagerSettings'
import { useSelector } from 'react-redux'
import LeadView from './components/Crm/Lead/LeadView'
import EmployeeDashboard from './components/Employee/EmployeeDashboard'
import Leads from './components/Crm/Lead/Leads'
import Tasks from './components/Crm/Tasks'
import Chat from './components/Crm/Chat/Chat'
import io from "socket.io-client"
import Unauthorized from './pages/Unauthorized'
import CrmManagement from './components/Admin/CrmManagement'
import ChatView from './components/Crm/Chat/ChatView'

export const socket = io("/")

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
      '/pnf': "Page Not Found - 404",
      '/unauth': "UnAuthorized - 403"
    };

    const path = location.pathname;

    let dynamicTitle = titles[path] || 'FlowCRM';

    if (location.pathname.includes('/manager') || location.pathname.includes('/employee')) {
      dynamicTitle = `${title}`
    }
    if (location.pathname.includes('manager/leads') || location.pathname.includes('/employee/leads')) {
      dynamicTitle = `${title} - Leads`
    } else if (location.pathname.includes('manager/team')) {
      dynamicTitle = `${title} - Team`
    } else if (location.pathname.includes('manager/tasks') || location.pathname.includes('/employee/tasks')) {
      dynamicTitle = `${title} - Tasks`
    } else if (location.pathname.includes('manager/settings')) {
      dynamicTitle = `${title} - Settings`
    } else if (location.pathname.includes('manager/chat') || location.pathname.includes('/employee/chat')) {
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
        <Route path='crm/:crmId' element={<CrmView />} />
        <Route path='bills' element={<Payments />} />
        <Route path='requests' element={<Complaints />} />
      </Route>
      {/* MANAGER */}
      <Route path='/crm/:id/manager' element={<Manager />}>
        <Route index element={<ManagerDasboard />} />
        <Route path='leads' element={<Leads manager={true} />} />
        <Route path='team' element={<ManagerEmployees />} />
        <Route path='tasks' element={<Tasks manager={true} />} />
        <Route path='settings' element={<ManagerSettings />} />
        <Route path='chat' element={<Chat manager={true} />} />
        <Route path='chat/:chatId' element={<ChatView manager={true} />} />
        <Route path='leads/:leadId' element={<LeadView manager={true} />} />
      </Route>
      {/* EMPLOYEE */}
      <Route path='/crm/:id/employee' element={<Employee />}>
        <Route index element={<EmployeeDashboard />} />
        <Route path='leads' element={<Leads manager={false} />} />
        <Route path='tasks' element={<Tasks manager={false} />} />
        <Route path='chat' element={<Chat manager={false} />} />
        <Route path='chat/:chatId' element={<ChatView manager={false} />} />
        <Route path='leads/:leadId' element={<LeadView manager={false} />} />
      </Route>
      <Route path='/unauth' element={<Unauthorized />} />
      <Route path='*' element={<Pnf />} />
    </Routes>
  )
}

export default App