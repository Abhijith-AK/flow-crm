import { BoxesIcon, ChevronFirstIcon, ClipboardList, LayoutDashboard, LogOut, ReceiptIndianRupee } from 'lucide-react';
import { Link, useLocation } from "react-router-dom"
const SidebarItem = ({ Icon, label, path }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  return (
    <Link to={path}>
      <div className={`p-3 m-2 text-2xl flex gap-5 items-center font-bold rounded-lg cursor-pointer ${isActive ? 'bg-blue-800 text-white' : 'bg-blue-600 text-gray-100 hover:bg-blue-500 hover:text-white'}`}>
        <Icon size={40} />
        {label}
      </div>
    </Link>)
};

const Sidebar = ({ open, setOpen}) => {
  return (
    <aside className={`flex flex-col justify-between h-screen fixed z-10 top-0 left-0 bg-gradient-to-tr from-blue-500 to-blue-800 text-white  ${open ? 'w-64' : 'w-20'}`}>
      <div className="p-3 my-3 flex justify-between items-center border-b">
        {open && <h1 className="text-3xl">FlowCRM Admin</h1>}
        <button className="p-3 border rounded bg-blue-800 text-white" onClick={() => setOpen(!open)}>
          <ChevronFirstIcon size={30} className={`${!open && 'rotate-180'}`} />
        </button>
      </div>
      <div className='flex-1 mt-10'>
        <SidebarItem Icon={LayoutDashboard} path="/admin" label={open ? "Dashboard" : ""} />
        <SidebarItem Icon={BoxesIcon} path="/admin/crm" label={open ? "CRM Management" : ""} />
        <SidebarItem Icon={ReceiptIndianRupee} path="/admin/bills" label={open ? "Payments / Bills" : ""} />
        <SidebarItem Icon={ClipboardList} path="/admin/requests" label={open ? "Complaints / Requests" : ""} />
      </div>
      <Link to={'/login'} className="p-3 m-2 text-2xl flex gap-5 items-center font-bold bg-red-400 rounded-lg hover:bg-red-500 cursor-pointer">
        <LogOut size={40} /> {open && "Logout"}
      </Link>
    </aside>
  );
};

export default Sidebar;
