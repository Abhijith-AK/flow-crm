import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialActivities = [
    { id: 1, type: "CRM Created", crm: "CRM Alpha", date: "2025-02-29", user: "Admin" },
    { id: 2, type: "Payment Made", crm: "CRM Beta", date: "2025-02-28", user: "User1" },
    { id: 3, type: "Employee Added", crm: "CRM Gamma", date: "2025-02-27", user: "Manager" },
    { id: 4, type: "CRM Updated", crm: "CRM Delta", date: "2025-02-26", user: "Admin" },
    { id: 5, type: "Payment Made", crm: "CRM Omega", date: "2025-02-25", user: "User2" },
];

const activityTypes = ["All", "CRM Created", "Payment Made", "Employee Added", "CRM Updated"];

const RecentActivityTable = () => {
    const [activities, setActivities] = useState(initialActivities);
    const [filter, setFilter] = useState("All");

    // Simulate real-time new activity
    useEffect(() => {
        const interval = setInterval(() => {
            const newActivity = {
                id: activities.length + 1,
                type: ["CRM Created", "Payment Made", "Employee Added", "CRM Updated"][Math.floor(Math.random() * 4)],
                crm: `CRM ${["Alpha", "Beta", "Gamma", "Delta", "Omega"][Math.floor(Math.random() * 5)]}`,
                date: new Date().toISOString().split("T")[0],
                user: ["Admin", "User1", "User2", "Manager"][Math.floor(Math.random() * 4)],
            };
            setActivities((prev) => [newActivity, ...prev].slice(0, 5)); // Keep only 5 latest
        }, 10000);

        return () => clearInterval(interval);
    }, [activities]);

    const filteredActivities = filter === "All" ? activities : activities.filter(a => a.type === filter);

    return (
        <motion.div
            className='w-full p-5 rounded-lg'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-2xl text-white mb-4">Recent Activity</h1>

            {/* Filter Dropdown */}
            <select
                className="p-2 mb-3 rounded bg-blue-500 text-white border-none"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
            >
                {activityTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            {/* Activity Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-[#0068cc] text-white rounded-lg shadow-md">
                    <thead>
                        <tr className="border-b border-gray-50">
                            <th className="py-2 px-4">Activity</th>
                            <th className="py-2 px-4">CRM</th>
                            <th className="py-2 px-4">Date</th>
                            <th className="py-2 px-4">User</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {filteredActivities.map(activity => (
                                <motion.tr
                                    key={activity.id}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-b border-gray-50 text-center hover:bg-[#3b86ff]"
                                >
                                    <td className="py-2 px-4">{activity.type}</td>
                                    <td className="py-2 px-4">{activity.crm}</td>
                                    <td className="py-2 px-4">{activity.date}</td>
                                    <td className="py-2 px-4">{activity.user}</td>
                                </motion.tr>
                            ))
                            }
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default RecentActivityTable;
