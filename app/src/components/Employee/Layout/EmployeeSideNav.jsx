import { ChevronFirstIcon, CircleUser, LayoutDashboard, ListTodo, LogOut, MessageCircle, Settings, User, Users } from 'lucide-react';
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../../Manager/manager.css"

const SidebarItem = ({ Icon, label, path, hoverColor, linkBackground, activeColor, textColor }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  return (
    <Link to={path}>
      <div
        style={{
          "--link-bg": isActive ? activeColor : linkBackground,
          "--hover-bg": hoverColor,
          "--text-color": textColor,
        }}
        className="p-3 m-2 text-2xl nav-link flex gap-5 items-center font-bold rounded-lg cursor-pointer"
      >
        <Icon size={40} />
        {label}
      </div>
    </Link>)
};

const EmployeeSideNav = ({ open, setOpen, theme, id, name }) => {
  const navigate = useNavigate();
  const navBackground = theme?.background
  const textColor = theme?.text
  const hoverColor = theme?.links.hover
  const activeColor = theme?.links.hover
  const linkBackground = theme?.links.background
  const logout = () => {
    sessionStorage.clear();
    navigate("/login", { replace: true });
  }
  return (
    <aside style={{ backgroundColor: navBackground, color: textColor }} className={`flex flex-col justify-between h-screen fixed z-10 top-0 left-0 ${open ? 'w-64' : 'w-20'}`}>
      <div className="p-3 my-3 flex justify-between items-center border-b">
        {open && <h1 className="text-3xl">{name}</h1>}
        <button
          style={{background: theme?.accent}}
          className="p-3 border rounded bg-blue-800 text-white" onClick={() => setOpen(!open)}>
          <ChevronFirstIcon size={30} className={`${!open && 'rotate-180'}`} />
        </button>
      </div>
      <div className='flex-1 mt-10'>
        {/* <SidebarItem
          hoverColor={hoverColor}
          activeColor={activeColor}
          linkBackground={linkBackground}
          textColor={textColor}
          Icon={LayoutDashboard}
          path={`/crm/${id}/employee`}
          label={open ? "Dashboard" : ""}
        /> */}
        <SidebarItem
          hoverColor={hoverColor}
          activeColor={activeColor}
          linkBackground={linkBackground}
          Icon={CircleUser}
          path={`/crm/${id}/employee/leads`}
          label={open ? "Leads" : ""}
        />
        <SidebarItem
          hoverColor={hoverColor}
          activeColor={activeColor}
          linkBackground={linkBackground}
          Icon={ListTodo}
          path={`/crm/${id}/employee/tasks`}
          label={open ? "Tasks" : ""}
        />
        <SidebarItem
          hoverColor={hoverColor}
          activeColor={activeColor}
          linkBackground={linkBackground}
          Icon={MessageCircle}
          path={`/crm/${id}/employee/chat`}
          label={open ? "Chat" : ""}
        />
      </div>
      <h1 className='p-3 m-2 text-2xl flex gap-5 items-center font-bold'><User size={35} /> {open && JSON.parse(sessionStorage.getItem("user")).name}</h1>
      <div className='underline h-1 w-full'></div>
      <Link onClick={logout} to={'/login'} className="p-3 m-2 text-2xl flex gap-5 items-center font-bold bg-red-400 rounded-lg hover:bg-red-500 cursor-pointer">
        <LogOut size={40} /> {open && "Logout"}
      </Link>
    </aside>
  );
};


export default EmployeeSideNav