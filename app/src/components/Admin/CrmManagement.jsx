import { useState } from "react";
import CrmTable from "./CrmTable";

const CrmManagement = () => {
  const [search, setSearch] = useState('');
  return (
    <div className='w-full min-h-screen  text-white'>
      <div className="flex gap-4 justify-around p-3 m-3">
        <h1 className="text-3xl flex-1 flex-wrap md:flex-nowrap">CRM Management</h1>
        <input value={search} onChange={e => setSearch(e.target.value)} type="search" className="input input-bordered w-full max-w-96" placeholder="Search CRMs" />
      </div>
      <div className="w-full p-3"> <CrmTable search={search}/></div>
    </div>
  )
}

export default CrmManagement