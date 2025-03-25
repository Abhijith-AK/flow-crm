import { motion } from 'framer-motion'
import StatCard from '../../utils/common/StatCard'
import { Coins, ListTodo, Trophy, UserCircle, Users } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import PieChartC from '../../utils/charts/PieChartC'
import AreaChartC from '../../utils/charts/AreaChartC'
import { useEffect, useState } from 'react'
import { getLeads } from '../../redux/slices/leadSlice'
import { getTasks } from '../../redux/slices/taskSlice'
import { getEmployees } from '../../redux/slices/employeeSlice'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const employeePerformanceData = [
  { rank: 1, name: "John Doe", completedTasks: 120, revenue: 50000 },
  { rank: 2, name: "Jane Smith", completedTasks: 110, revenue: 48000 },
  { rank: 3, name: "Alice Johnson", completedTasks: 105, revenue: 46000 },
  { rank: 4, name: "Michael Brown", completedTasks: 100, revenue: 45000 },
  { rank: 5, name: "Emily White", completedTasks: 95, revenue: 42000 },
  { rank: 6, name: "David Green", completedTasks: 90, revenue: 40000 },
  { rank: 7, name: "Sarah Lee", completedTasks: 85, revenue: 38000 },
  { rank: 8, name: "Chris Wilson", completedTasks: 80, revenue: 35000 },
  { rank: 9, name: "Emma Taylor", completedTasks: 75, revenue: 33000 },
  { rank: 10, name: "Daniel Martinez", completedTasks: 70, revenue: 31000 },
];

// const recentActivities = [
//   { id: 1, type: "login", user: "John Doe", time: "2 hours ago" },
//   { id: 2, type: "task", user: "Jane Smith", action: "completed", task: "Client follow-up", time: "3 hours ago" },
//   { id: 3, type: "change", user: "Alice Johnson", action: "updated", field: "Lead Status", time: "5 hours ago" },
//   { id: 4, type: "task", user: "Michael Brown", action: "assigned", task: "Proposal drafting", time: "6 hours ago" },
//   { id: 5, type: "login", user: "Emily White", time: "8 hours ago" },
//   { id: 6, type: "change", user: "David Green", action: "edited", field: "Company Profile", time: "1 day ago" },
// ];

const ManagerDasboard = () => {
  const { crm } = useSelector((state) => state.crm)
  const { leads } = useSelector((state) => state.lead);
  const { tasks } = useSelector((state) => state.task);
  const { employees } = useSelector((state) => state.employee);
  const [leadsData, setLeadsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLeads(crm._id))
    dispatch(getTasks(crm._id))
    dispatch(getEmployees(crm._id))
  }, [dispatch])

  useEffect(() => {
    if (leads?.length > 0) {
      const groupedLeads = leads.reduce((acc, lead) => {
        if (lead.status === "won") {
          const month = new Date(lead.updatedAt).getMonth(); // Get month index (0-11)
          acc[month] = (acc[month] || 0) + 1; // Count leads per month
        }
        return acc;
      }, {});

      const formattedData = monthNames.map((month, index) => ({
        month,
        conversionRate: groupedLeads[index] || 0 // Default to 0 if no leads for that month
      }));

      setLeadsData(formattedData);
    }
  }, [leads]);
  const employeePerformanceData = employees
    .map((employee) => {
      const completedTasks = employee.tasks?.filter(
        (task) => task.status === crm?.workflows[crm?.workflows.length - 1]
      )?.length;

      const totalRevenue = leads
        .filter((lead) => lead.assignedTo._id === employee?._id && lead.status === "won")
        .reduce((sum, lead) => sum + Number(lead.revenue || 0), 0);

      return {
        name: employee.name,
        completedTasks,
        revenue: totalRevenue,
      };
    })
    .sort((a, b) => b.revenue - a.revenue) // Sort by revenue (highest first)
    .map((employee, index) => ({ ...employee, rank: index + 1 }));
  const topEmployee = employeePerformanceData[0]
  console.log(employeePerformanceData, employees, leads);
  
  const pieData = [
    { name: "Completed", value: tasks?.filter((value) => value.status == crm?.workflows[crm?.workflows.length - 1])?.length || 0, color: crm?.theme?.text.secondary },
    { name: "In Progress", value: tasks?.filter((value) => crm?.workflows.slice(1, -1).includes(value.status)).length || 0, color: crm?.theme?.card.border },
    { name: "Pending", value: tasks?.filter((value) => value.status == crm?.workflows[0])?.length || 0, color: crm?.theme?.text.primary },
  ];

  const stats = [
    { title: "Total No of Leads", content: leads?.length || 0, icon: UserCircle },
    { title: "Tasks", content: tasks?.length || 0, icon: ListTodo },
    { title: "Total Revenue", content: "₹" + leads?.filter((value) => value.status === "won").reduce((a, b) => a + Number(b.revenue || 0), 0) || 0, icon: Coins },
    { title: "Total Employees", content: employees?.length || 0, icon: Users }
  ]

  return (
    <div className='w-full h-full'>
      <div className="flex flex-wrap lg:flex-nowrap justify-evenly mt-3">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="transition-all duration-300"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <StatCard title={stat.title} Icon={stat.icon} content={stat.content} color={crm?.theme?.card.text} bgColor={crm?.theme?.card.background} />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap lg:flex-nowrap">
        <motion.div
          style={{ backgroundColor: crm?.theme?.card.background }}
          className='p-4 m-3 flex flex-col justify-evenly rounded-lg w-full transition-all duration-300'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-xl mb-2'>Lead Conversion Rate</h1>
          <AreaChartC
            data={leadsData}
            label="month"
            fillColor={crm?.theme?.card.textColor}
            value="conversionRate"
            contentBackground={crm?.theme?.card.background}
            contentColor={crm?.theme?.card.text}
            fontColor={crm?.theme?.card.text}
            gridColor={crm?.theme?.text.secondary}
            lineColor={crm?.theme?.card.text}
            strokeColor={crm?.theme?.text.secondary}
          />
        </motion.div>
        <motion.div
          style={{ backgroundColor: crm?.theme?.card.background }}
          className='p-4 m-3 flex flex-col justify-evenly rounded-lg w-full transition-all duration-300'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-xl mb-2'>Tasks</h1>
          <PieChartC
            data={pieData}
            label="tasks"
            strokeColor={crm?.theme?.card.text}
            contentBackground={crm?.theme?.card.background}
            contentColor={crm?.theme?.card.text}
          />
        </motion.div>
        <motion.div
          style={{ backgroundColor: crm?.theme?.card.background }}
          className='p-4 m-3 flex flex-col justify-evenly rounded-lg w-full text-center transition-all duration-300'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <h1 className='text-xl mb-2 text-left'>Team Perfomance</h1>
          <Trophy size={50} className="text-yellow-500 mx-auto mb-3" />
          <h2 className="text-2xl font-bold">🏆 Top Employee</h2>
          <p className="text-3xl mt-2 font-semibold">{topEmployee.name}</p>
          <p className="text-lg">Completed Tasks: {topEmployee.completedTasks}</p>
          <p className="text-lg">Revenue: ₹{topEmployee.revenue.toLocaleString()}</p>
          <button
            style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
            onClick={() => setIsOpen(true)}
            className="mt-4 px-4 py-2 rounded-lg hover:opacity-75"
          >
            View Rankings
          </button>

          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div
                style={{ backgroundColor: crm?.theme?.card.background }}
                className="p-5 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold text-center">🏅 Top 10 Employees</h2>
                <ul className="mt-3">
                  {employeePerformanceData.map((emp) => (
                    <li
                      key={emp.rank}
                      className="flex justify-between p-2 border-b"
                    >
                      <span>#{emp.rank} {emp.name}</span>
                      <span className="font-bold">
                        {emp.completedTasks} tasks | ₹{emp.revenue.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-4 py-2 w-full rounded-lg hover:opacity-75"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      {/* <motion.div
  style={{ backgroundColor: crm?.theme?.card.background }}
  className="p-4 m-3 rounded-lg transition-all duration-300"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h1 className="text-xl mb-2">Recent Activity</h1>
  <div className="p-3 rounded-md">
    {recentActivities.length > 0 ? (
      <table style={{ border: `2px solid ${crm?.theme?.card.border}` }} className="w-full border-collapse border text-left">
        <thead>
          <tr style={{ backgroundColor: crm?.theme?.card.border}}>
            <th className="p-2 border " style={{border: `2px solid ${crm?.theme?.card.border}`}}>User</th>
            <th className="p-2 border " style={{border: `2px solid ${crm?.theme?.card.border}`}}>Action</th>
            <th className="p-2 border " style={{border: `2px solid ${crm?.theme?.card.border}`}}>Details</th>
            <th className="p-2 border " style={{border: `2px solid ${crm?.theme?.card.border}`}}>Time</th>
          </tr>
        </thead>
        <tbody>
          {recentActivities.map((activity, index) => (
            <tr key={index} className="border   style={{border: `2px solid ${crm?.theme?.card.border}`}}text-gray-300">
              <td className="p-2 border " style={{border: `2px solid ${crm?.theme?.card.border}`}}>{activity.user}</td>
              <td className="p-2 border " style={{border: `2px solid ${crm?.theme?.card.border}`}}>{activity.action || "Logged in"}</td>
              <td className="p-2 border " style={{border: `2px solid ${crm?.theme?.card.border}`}}>
                {activity.task ? `Task: "${activity.task}"` : activity.field ? `Field: "${activity.field}"` : "-"}
              </td>
              <td className="p-2 border " style={{border: `2px solid ${crm?.theme?.card.border}`}}>{activity.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-gray-500">No recent activity</p>
    )}
  </div>

          </motion.div> */}
    </div>
  )
}

export default ManagerDasboard