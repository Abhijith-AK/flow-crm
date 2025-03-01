import React, { useEffect, useState } from 'react'

import SidebarAdmin from '../components/Admin/SidebarAdmin'
import { Outlet } from 'react-router'

const Admin = () => {
  const [open, setOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setOpen(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`flex bg-blue-800 ${open ? 'md:ml-64' : 'md:ml-20'}`}>
      <SidebarAdmin open={open} setOpen={setOpen} />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin