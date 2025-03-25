import { CircleUser, LayoutDashboard, ListTodo, MessageCircle, Settings, Users } from 'lucide-react'
import { NavLink } from 'react-router'

const EmployeeTopNav = ({ theme, id, name }) => {
  const navBackground = theme?.background
  const textColor = theme?.text
  const hoverColor = theme?.links.hover
  const activeColor = theme?.links.hover
  const linkBackground = theme?.links.background
  return (
    <nav style={{ backgroundColor: navBackground, color: textColor }} className={`flex justify-between h-20 fixed z-10 top-0 left-0 right-0`}>
      <div className="p-3 my-3 flex justify-between items-center">
        <h1 className="text-3xl">{name}</h1>
      </div>
      <div className='flex-1 flex justify-center items-center'>
        {/* <NavLink
          to={`/crm/${id}/employee`}
          end
          className="flex  nav-link p-3 rounded-lg items-center mx-2"
          style={({ isActive }) => ({
            "--link-bg": isActive ? activeColor : linkBackground,
            "--hover-bg": hoverColor,
            "--text-color": textColor,
          })}
        >
          <LayoutDashboard />
          <p className='hidden ms-2 md:flex'>Dashboard</p>
        </NavLink> */}
        <NavLink
          style={({ isActive }) => ({
            backgroundColor: isActive ? activeColor : linkBackground,
            "--link-bg": linkBackground,
            "--hover-bg": hoverColor,
          })}
          className="flex nav-link p-3 rounded-lg items-center mx-2" to={`/crm/${id}/employee/leads`} >
          <CircleUser />
          <p className='hidden ms-2 md:flex'>Leads</p>
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            backgroundColor: isActive ? activeColor : linkBackground,
            "--link-bg": linkBackground,
            "--hover-bg": hoverColor,
          })}
          className="flex  nav-link p-3 rounded-lg items-center mx-2" to={`/crm/${id}/employee/tasks`} >
          <ListTodo />
          <p className='hidden ms-2 md:flex'>Tasks</p>
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            backgroundColor: isActive ? activeColor : linkBackground,
            "--link-bg": linkBackground,
            "--hover-bg": hoverColor,
          })}
          className="flex  nav-link p-3 rounded-lg items-center mx-2" to={`/crm/${id}/employee/chat`} >
          <MessageCircle />
          <p className='hidden ms-2 md:flex'>Chat</p>
        </NavLink>
      </div>
    </nav>
  )
}


export default EmployeeTopNav