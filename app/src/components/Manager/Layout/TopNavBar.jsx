import { CircleUser, LayoutDashboard, ListTodo, MessageCircle, Settings, Users } from 'lucide-react'
import { NavLink } from 'react-router'

const TopNavBar = ({ theme, id, name }) => {
    const navBackground = theme?.background
    const textColor = theme?.text
    const hoverColor = theme?.links.hover
    const activeColor = theme?.links.hover
    const linkBackground = theme?.links.background
    return (
        <nav style={{ backgroundColor: navBackground, color: textColor }} className={`flex justify-between h-20 fixed z-10 top-0 left-0 right-0`}>
            <div className="p-3 my-3 flex justify-between items-center">
                <h1 className="text-3xl">{ name }</h1>
            </div>
            <div className='flex-1 flex justify-center items-center'>
                <NavLink
                    to={`/crm/${id}/manager`}
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
                </NavLink>
                <NavLink

                    style={({ isActive }) => ({
                        backgroundColor: isActive ? activeColor : linkBackground,
                        "--link-bg": linkBackground,
                        "--hover-bg": hoverColor,
                    })}
                    className="flex nav-link p-3 rounded-lg items-center mx-2" to={`/crm/${id}/manager/leads`} >
                    <CircleUser />
                    <p className='hidden ms-2 md:flex'>Leads</p>
                </NavLink>
                <NavLink

                    style={({ isActive }) => ({
                        backgroundColor: isActive ? activeColor : linkBackground,
                        "--link-bg": linkBackground,
                        "--hover-bg": hoverColor,
                    })}
                    className="flex  nav-link p-3 rounded-lg items-center mx-2" to={`/crm/${id}/manager/tasks`} >
                    <ListTodo />
                    <p className='hidden ms-2 md:flex'>Tasks</p>
                </NavLink>
                <NavLink

                    style={({ isActive }) => ({
                        backgroundColor: isActive ? activeColor : linkBackground,
                        "--link-bg": linkBackground,
                        "--hover-bg": hoverColor,
                    })}
                    className="flex  nav-link p-3 rounded-lg items-center mx-2" to={`/crm/${id}/manager/team`} >
                    <Users />
                    <p className='hidden ms-2 md:flex'>Employees</p>
                </NavLink>
                <NavLink

                    style={({ isActive }) => ({
                        backgroundColor: isActive ? activeColor : linkBackground,
                        "--link-bg": linkBackground,
                        "--hover-bg": hoverColor,
                    })}
                    className="flex  nav-link p-3 rounded-lg items-center mx-2" to={`/crm/${id}/manager/chat`} >
                    <MessageCircle />
                    <p className='hidden ms-2 md:flex'>Chat</p>
                </NavLink>
                <NavLink

                    style={({ isActive }) => ({
                        backgroundColor: isActive ? activeColor : linkBackground,
                        "--link-bg": linkBackground,
                        "--hover-bg": hoverColor,
                    })}
                    className="flex  nav-link p-3 rounded-lg items-center mx-2" to={`/crm/${id}/manager/settings`} >
                    <Settings />
                    <p className='hidden ms-2 md:flex'>Settings</p>
                </NavLink>
            </div>
        </nav>
    )
}

export default TopNavBar