import React from 'react'
import StatCard from '../common/StatCard'
import { BadgeIndianRupee, Boxes, Coins, FileSliders, Users } from 'lucide-react'

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
    </div>
  )
}


export default AdminDashboard
