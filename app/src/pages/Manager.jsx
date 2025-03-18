import React, { useEffect, useState } from 'react'
import TopNavBar from '../components/Manager/Layout/TopNavBar'
import SideNavBar from '../components/Manager/Layout/SideNavBar'
import { Outlet, useNavigate, useParams } from 'react-router'
import BottomNavBar from '../components/Manager/Layout/BottomNavBar'
import { getCRMAPI } from '../services/allAPI'
import { useDispatch } from "react-redux"
import { setCrm } from '../redux/slices/crmSlice'
import {motion} from "framer-motion"
import { Slash } from 'lucide-react'

const Manager = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const [open, setOpen] = useState(window.innerWidth > 768);
  const [crmDetails, setCrmDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const token = sessionStorage.getItem("token")
  const navigate = useNavigate()
  const getCRMDetails = async () => {
    if (token) {
      setIsLoading(true)
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const response = await getCRMAPI(id, reqHeader)
        if (response.status == 200) {
          const details = response.data
          setCrmDetails(details)
          dispatch(setCrm(details))
          setIsLoading(false)
        } else {
          alert(response.response.data)
          console.log(response)
          navigate('/pnf')
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
        navigate('/pnf')
        setIsLoading(false)
      }
    } else {
      navigate('/pnf')
      setIsLoading(false)
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

  return isLoading ? (
   <div className='flex justify-center items-center bg-gray-800 min-h-screen'>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-3xl text-blue-300 flex items-center gap-3"
      >
        Loading Your Page.. <Slash className="animate-spin" size={20} />
      </motion.h1>
   </div>
  ) : (
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