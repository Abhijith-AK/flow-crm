import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { PlusCircle } from 'lucide-react';
import EmployeesTable from './EmployeesTable';

const ManagerEmployees = () => {
  const [search, setSearch] = useState('');
  const { crm } = useSelector((state) => state.crm)
  return (
    <div>
      <div className='w-full min-h-screen'>
        <div className="flex gap-4 justify-around p-3 m-3">
          <h1 className="text-3xl flex-1">Employee Management</h1>
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded-md text-black "
          />
          <button
            style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
            className='py-2 px-4 rounded-lg shadow-lg flex items-center justify-between'
          >
            <PlusCircle size={30} className='mr-3' /> Create Employee
          </button>
        </div>
        <div className="w-full p-3"> <EmployeesTable search={search} setSearch={setSearch} /></div>
      </div>
    </div>
  )
}

export default ManagerEmployees