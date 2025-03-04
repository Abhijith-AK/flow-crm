import DataTable from "./CrmTable"

const CrmManagement = () => {
  return (
    <div className='w-full min-h-screen  text-white'>
      <div className="flex gap-4 justify-around p-3 m-3">
        <h1 className="text-3xl flex-1">CRM Management</h1>
        <input type="search" className="input input-bordered w-full max-w-96" placeholder="Search CRMs" />
      </div>
     <div className="w-full p-3"> <DataTable /></div>
    </div>
  )
}

export default CrmManagement