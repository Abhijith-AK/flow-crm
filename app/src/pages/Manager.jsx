import React, { useEffect, useState } from 'react'
import TopNavBar from '../components/Manager/TopNavBar'
import SideNavBar from '../components/Manager/SideNavBar'
import { Outlet, useNavigate, useParams } from 'react-router'
import BottomNavBar from '../components/Manager/BottomNavBar'
import { getCRMAPI } from '../services/allAPI'
import {useDispatch} from "react-redux"
import { setCrm } from '../redux/slices/crmSlice'

const Manager = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const [open, setOpen] = useState(window.innerWidth > 768);
  const [crmDetails, setCrmDetails] = useState(null)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const getCRMDetails = async () => {
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const response = await getCRMAPI(id, reqHeader)
        if (response.status == 200) {
          const details = response.data
          setCrmDetails(details)
          dispatch(setCrm(details))
        } else {
          alert(response.response.data)
          console.log(response)
          navigate('/pnf')
        }
      } catch (error) {
        console.log(error)
        navigate('/pnf')
      }
    } else {
      navigate('/pnf')
    }
  }

  useEffect(() => {
    getCRMDetails()
  }, [])

  useEffect(() => {
    const handleResize = () => setOpen(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: crmDetails?.theme.background, color: crmDetails?.theme.text.primary }} className='flex flex-col min-h-screen w-full'>
      {crmDetails?.layout === "Top Navigation" && <TopNavBar name={crmDetails?.name} id={id} theme={crmDetails?.theme.navbar} />}
      {crmDetails?.layout === "Sidebar Focused" && <SideNavBar name={crmDetails?.name} id={id} open={open} setOpen={setOpen} theme={crmDetails?.theme.navbar} />}
      <div className={`
        flex-1 
        ${crmDetails?.layout === "Top Navigation" && "mt-20"}
        ${crmDetails?.layout === "Sidebar Focused" ? open ? 'ml-20 md:ml-64' : 'ml-20' : null} 
        ${crmDetails?.layout === "Bottom Navigation" && "mb-20"} 
        `}><Outlet /></div>
      {crmDetails?.layout === "Bottom Navigation" && <BottomNavBar id={id} theme={crmDetails?.theme.navbar} />}
    </div>
  )
}

export default Manager