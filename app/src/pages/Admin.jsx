import React, { useEffect, useState } from 'react'

import SidebarAdmin from '../components/Admin/SidebarAdmin'
import { Outlet, useNavigate } from 'react-router'
import { Slash } from 'lucide-react';
import { motion } from "framer-motion"

const Admin = () => {
  const [open, setOpen] = useState(window.innerWidth > 768);
  const token = sessionStorage.getItem("token")
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (token) {
      setIsLoading(false)
    } else {
      navigate('/unauth')
    }
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
    <div className={`flex bg-blue-800 ${open ? 'ml-20 md:ml-64' : 'ml-20'}`}>
      <SidebarAdmin open={open} setOpen={setOpen} />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin