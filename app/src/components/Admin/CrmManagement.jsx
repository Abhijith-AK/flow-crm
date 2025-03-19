import { useEffect, useState } from "react";
import CrmTable from "./CrmTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllCrm } from "../../redux/slices/crmSlice";

const CrmManagement = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch()
  const { crms, loading, error } = useSelector((state) => state.crm)

  useEffect(() => {
    dispatch(getAllCrm())
  }, [dispatch])

  if (loading) return <div className="min-h-screen flex justify-center items-center text-white text-3xl font-bold">Loading..</div>

  if (error) return <p>Error during fetching : {error}</p>
  if (crms) {
    return (
      <div className='w-full min-h-screen  text-white'>
        <div className="flex gap-4 justify-around p-3 m-3">
          <h1 className="text-3xl flex-1 flex-wrap md:flex-nowrap">CRM Management</h1>
          <input value={search} onChange={e => setSearch(e.target.value)} type="search" className="input input-bordered w-full max-w-96" placeholder="Search CRMs" />
        </div>
        <div className="w-full p-3"> <CrmTable crms={crms} search={search} /></div>
      </div>
    )
  }
}

export default CrmManagement