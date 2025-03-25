import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StatCard from '../../utils/common/StatCard'
import { Boxes, Coins, FileSliders, Users } from 'lucide-react'
import LineChartC from '../../utils/charts/LineChart'
import BarChartC from '../../utils/charts/BarChartC'
import AreaChartC from '../../utils/charts/AreaChartC'
import RadarChartC from '../../utils/charts/RadarChartC'
import { areaData, barData, lineData, radarData } from '../../utils/Constants'
import RecentActivityTable from './RecentActivityTable'
import { getAllComplaints, getAllUserAPI, getCrmgrowthAPI } from '../../services/allAPI'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCrm } from '../../redux/slices/crmSlice'


const AdminDashboard = () => {
  const dispatch = useDispatch()
  const token = sessionStorage.getItem("token")
  const [users, setUsers] = useState([])
  const [req, setReq] = useState([])
  // console.log(users)
  const { crms} = useSelector((state) => state.crm)
  const getAllUsers = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const response = await getAllUserAPI(reqHeader)
      const requests = await getAllComplaints(reqHeader)
      
      if (response.status == 200) setUsers(response.data)
      if (requests.status == 200) setReq(requests.data.filter((val) => val.resolved === false))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => { getAllUsers(); dispatch(getAllCrm()) }, [])

  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchCrmGrowth = async () => {
      try {
        const response = await getCrmgrowthAPI({
          "Authorization": `Bearer ${token}`
        });
        setBarData(response.data);
      } catch (error) {
        console.error("Error fetching CRM growth data:", error);
      }
    };

    fetchCrmGrowth();
  }, []);

  const [radarData, setRadarData] = useState([
    { category: "Retail", CRMs: 0 },
    { category: "IT Services", CRMs: 0 },
    { category: "Healthcare", CRMs: 0 },
    { category: "Finance", CRMs: 0 },
    { category: "Education", CRMs: 0 },
    { category: "Real Estate", CRMs: 0 }
  ]);

  useEffect(() => {
    if (crms?.length > 0) {
      const grouped = crms.reduce((acc, crm) => {
        acc[crm.type] = (acc[crm.type] || 0) + 1;
        return acc;
      }, {});

      const formattedData = radarData.map((item) => ({
        category: item.category,
        CRMs: grouped[item.category] || 0 
      }));

      setRadarData(formattedData);
    }
  }, [crms]);

  const stats = [
    { title: "Total CRMs", content: crms?.length, icon: Boxes },
    { title: "Active Users", content: users.length, icon: Users },
    { title: "Pending Requests", content: req.length, icon: FileSliders },
  ]
  return (
    <motion.div
      className='w-full min-h-screen flex flex-col'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stats Section */}
      <div className="flex flex-wrap lg:flex-nowrap justify-evenly mt-3">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="transition-all duration-300"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <StatCard title={stat.title} Icon={stat.icon} content={stat.content} color="#ffffff" bgColor="#3366CC" />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="flex flex-wrap lg:flex-nowrap">
        {/* Area Chart - Active Users Over Time */}
        {/* <motion.div
          className='p-4 m-3 flex flex-col justify-evenly rounded-lg w-full bg-[#3a6fb4] transition-all duration-300'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-xl text-white mb-2'>Active Users Over Time</h1>
          <AreaChartC
            data={areaData}
            label="month"
            fillColor="#5a85bd"
            value="activeUsers"
            contentBackground="#2a4b7c"
            contentColor="#ffffff"
            fontColor="#ffffff"
            gridColor="#c7caceb6"
            lineColor="#ffffff"
            strokeColor="#629df5"
          />
        </motion.div> */}

        <div className="w-full m-3 flex flex-col space-y-4">
          {/* Bar Chart - CRM Growth Over Time */}
          <motion.div
            className='p-4 rounded-lg w-full bg-[#3a6fb4] transition-all duration-300'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className='text-xl text-white mb-4'>CRM Growth Over Time</h1>
            <BarChartC
              data={barData}
              label="month"
              value="activeCount"
              contentBackground="#2a4b7c"
              contentColor="#ffffff"
              fontColor="#ffffff"
              gridColor="#c7caceb6"
              lineColor="#ffffff"
              strokeColor="#629df5"
            />
          </motion.div>

          {/* Line Chart (Title Placeholder) */}
          {/* <motion.div
            className='p-4 rounded-lg w-full bg-[#3a6fb4] transition-all duration-300'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className='text-xl text-white'>[Line Chart Title TBD]</h1>
            <LineChartC
              data={lineData}
              value="activeUsers"
              contentBackground="#2a4b7c"
              contentColor="#ffffff"
              fontColor="#ffffff"
              gridColor="#c7caceb6"
              lineColor="#ffffff"
              strokeColor="#629df5"
            />
          </motion.div> */}
        </div>

        {/* Radar Chart - CRM by Category */}
        <motion.div
          className='p-4 m-3 rounded-lg w-full flex flex-col justify-evenly bg-[#3a6fb4] transition-all duration-300'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className='text-xl text-white mb-2'>CRM by Category</h1>
          <RadarChartC
            data={radarData}
            label="category"
            fillColor="#5a85bd"
            value="CRMs"
            contentBackground="#2a4b7c"
            contentColor="#ffffff"
            fontColor="#ffffff"
            gridColor="#c7caceb6"
            lineColor="#ffffff"
            strokeColor="#629df5"
          />
        </motion.div>
      </div>

      {/* Recent Activity */}
      {/* <RecentActivityTable /> */}
    </motion.div>
  )
}

export default AdminDashboard
