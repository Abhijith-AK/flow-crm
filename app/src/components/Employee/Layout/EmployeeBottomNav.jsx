import { CircleUser, LayoutDashboard, ListTodo, MessageCircle } from 'lucide-react'
import { NavLink } from 'react-router'
import "../../Manager/manager.css"


const EmployeeBottomNav = ({ theme, id }) => {
  const navBackground = theme?.background
  const textColor = theme?.text
  const hoverColor = theme?.links.hover
  const activeColor = theme?.links.hover
  const linkBackground = theme?.links.background
  return (
    <footer style={{ backgroundColor: navBackground, color: textColor }} className={`flex justify-between text-center fixed z-10 bottom-2 p-1 py-2 rounded-xl left-0 right-0 w-fit mx-auto`}>
      <div className='flex-1 flex items-center'>
        <NavLink
          to={`/crm/${id}/employee`}
          end
          className="flex flex-col nav-link p-3 rounded-lg items-center mx-2"
          style={({ isActive }) => ({
            "--link-bg": isActive ? activeColor : linkBackground,
            "--hover-bg": hoverColor,
            "--text-color": textColor,
          })}
        >
          <LayoutDashboard />
          <p className='hidden md:flex'>Dashboard</p>
        </NavLink>

        <NavLink
          style={({ isActive }) => ({
            backgroundColor: isActive ? activeColor : linkBackground,
            "--link-bg": linkBackground,
            "--hover-bg": hoverColor,
          })}
          className="flex flex-col nav-link p-3 md:px-5 rounded-lg items-center mx-2" to={`/crm/${id}/employee/leads`} >
          <CircleUser />
          <p className='hidden md:flex'>Leads</p>
        </NavLink>

        <NavLink
          style={({ isActive }) => ({
            backgroundColor: isActive ? activeColor : linkBackground,
            "--link-bg": linkBackground,
            "--hover-bg": hoverColor,
          })}
          className="flex flex-col nav-link p-3 md:px-5 rounded-lg items-center mx-2" to={`/crm/${id}/employee/tasks`} >
          <ListTodo />
          <p className='hidden md:flex'>Tasks</p>
        </NavLink>

        <NavLink
          style={({ isActive }) => ({
            backgroundColor: isActive ? activeColor : linkBackground,
            "--link-bg": linkBackground,
            "--hover-bg": hoverColor,
          })}
          className="flex flex-col nav-link p-3 md:px-5 rounded-lg items-center mx-2" to={`/crm/${id}/employee/chat`} >
          <MessageCircle />
          <p className='hidden md:flex'>Chat</p>
        </NavLink>

      </div>
    </footer>
  )
}

export default EmployeeBottomNav