import { ChevronFirstIcon, CircleUser, LayoutDashboard, ListTodo, LogOut, MessageCircle, Settings, Users } from 'lucide-react';
import { Link, useLocation } from "react-router-dom"
import "./manager.css"

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

const SideNavBar = ({ open, setOpen, theme, id, name }) => {
    const navBackground = theme?.background
    const textColor = theme?.text
    const hoverColor = theme?.links.hover
    const activeColor = theme?.links.hover
    const linkBackground = theme?.links.background
    return (
        <aside style={{ backgroundColor: navBackground, color: textColor }} className={`flex flex-col justify-between h-screen fixed z-10 top-0 left-0 ${open ? 'w-64' : 'w-20'}`}>
            <div className="p-3 my-3 flex justify-between items-center border-b">
                {open && <h1 className="text-3xl">{name}</h1>}
                <button className="p-3 border rounded bg-blue-800 text-white" onClick={() => setOpen(!open)}>
                    <ChevronFirstIcon size={30} className={`${!open && 'rotate-180'}`} />
                </button>
            </div>
            <div className='flex-1 mt-10'>
                <SidebarItem
                    hoverColor={hoverColor}
                    activeColor={activeColor}
                    linkBackground={linkBackground}
                    textColor={textColor}
                    Icon={LayoutDashboard}
                    path={`/crm/${id}/manager`}
                    label={open ? "Dashboard" : ""}
                />
                <SidebarItem
                    hoverColor={hoverColor}
                    activeColor={activeColor}
                    linkBackground={linkBackground}
                    Icon={CircleUser}
                    path={`/crm/${id}/manager/leads`}
                    label={open ? "Leads" : ""}
                />
                <SidebarItem
                    hoverColor={hoverColor}
                    activeColor={activeColor}
                    linkBackground={linkBackground}
                    Icon={ListTodo}
                    path={`/crm/${id}/manager/tasks`}
                    label={open ? "Tasks" : ""}
                />
                <SidebarItem
                    hoverColor={hoverColor}
                    activeColor={activeColor}
                    linkBackground={linkBackground}
                    Icon={Users}
                    path={`/crm/${id}/manager/team`}
                    label={open ? "Employees" : ""}
                />
                <SidebarItem
                    hoverColor={hoverColor}
                    activeColor={activeColor}
                    linkBackground={linkBackground}
                    Icon={MessageCircle}
                    path={`/crm/${id}/manager/chat`}
                    label={open ? "Chat" : ""}
                />
            </div>
            <SidebarItem
                hoverColor={hoverColor}
                activeColor={activeColor}
                linkBackground={linkBackground}
                Icon={Settings}
                path={`/crm/${id}/manager/settings`}
                label={open ? "Settings" : ""}
            />
            <Link to={'/login'} className="p-3 m-2 text-2xl flex gap-5 items-center font-bold bg-red-400 rounded-lg hover:bg-red-500 cursor-pointer">
                <LogOut size={40} /> {open && "Logout"}
            </Link>
        </aside>
    );
};

export default SideNavBar;
