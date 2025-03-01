import React from 'react'
import StatCard from '../../utils/common/StatCard'
import { BadgeIndianRupee, Boxes, Coins, FileSliders, Users } from 'lucide-react'
import LineChartC from '../../utils/charts/LineChart'

const stats = [
  {
    title: "Total CRMs",
    content: 20,
    icon: Boxes,
  },
  {
    title: "Active Users",
    content: 56,
    icon: Users
  },
  {
    title: "Pending Requests",
    content: 15,
    icon: FileSliders
  },
  {
    title: "Revenue",
    content: "₹ 7843",
    icon: Coins
  },
]

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 2000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 }
];

const AdminDashboard = () => {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <div className="flex flex-wrap md:flex-nowrap justify-evenly mt-3">
        {
          stats?.map((stat, i) => (
            <StatCard title={stat.title} Icon={stat.icon} content={stat.content} color={"#ffffff"} bgColor={"#3e78ce93"} />
          ))
        }
      </div>
      <div className="flex">
        <LineChartC data={data}/>
      </div>
    </div>
  )
}


export default AdminDashboard
