import React from 'react'
import Sidebar2, { SidebarItem } from '../components/common/SideBar2'
import { LayoutDashboardIcon } from 'lucide-react'

const Admin = () => {
  return (
    <div className='flex'>
      <Sidebar2 >
        <SidebarItem icon={<LayoutDashboardIcon />} text={'Dashboard'} />
      </Sidebar2>
      <div className="flex-1">

      </div>
    </div>
  )
}

export default Admin