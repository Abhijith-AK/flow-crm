import React from 'react'
import { motion } from 'framer-motion'
import StatCard from '../../utils/common/StatCard'
import { Boxes, Coins, FileSliders, Users } from 'lucide-react'
import LineChartC from '../../utils/charts/LineChart'
import BarChartC from '../../utils/charts/BarChartC'
import AreaChartC from '../../utils/charts/AreaChartC'
import RadarChartC from '../../utils/charts/RadarChartC'
import { areaData, barData, lineData, radarData } from '../../utils/Constants'
import RecentActivityTable from './RecentActivityTable'

const stats = [
  { title: "Total CRMs", content: 20, icon: Boxes },
  { title: "Active Users", content: 56, icon: Users },
  { title: "Pending Requests", content: 15, icon: FileSliders },
  { title: "Revenue", content: "₹ 7843", icon: Coins }
]

const AdminDashboard = () => {
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
        <motion.div
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
        </motion.div>

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
          <motion.div
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
          </motion.div>
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
      <RecentActivityTable />
    </motion.div>
  )
}

export default AdminDashboard
