import { Edit, Eye } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from "react-redux";
import { socket } from '../../../App'

const EmployeesTable = ({ search, employees, setView, setUpdate, setFormData }) => {
    // console.log(employees)
    const { crm } = useSelector((state) => state.crm);
    const [currentPage, setCurrentPage] = useState(1);
    const [onlineUsers, setOnlineUsers] = useState(null);
    const itemsPerPage = 8;

    useEffect(() => {   
        socket.emit("join", JSON.parse(sessionStorage.getItem("user"))._id);
        socket.on("online", (users) => {
          setOnlineUsers(users);
        });
      }, [onlineUsers]);
    

    // Filter Employees based on search input
    const filteredEmployees = employees?.filter(employee =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase()) ||
        employee.status?.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredEmployees?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedEmployees = filteredEmployees?.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div
            style={{ backgroundColor: crm?.theme?.card.background }}
            className="w-full p-6 rounded-lg shadow-lg">
            <motion.div
                className="overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <table
                    style={{ border: `2px solid ${crm?.theme?.card.border}` }}
                    className="w-full border">
                    <thead>
                        <tr
                            style={{ backgroundColor: crm?.theme?.card.border }}
                            className="">
                            <th className="p-3 text-left">Employee Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Last Login</th>
                            <th className="p-3 text-left">Tasks</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedEmployees?.length > 0 ? selectedEmployees.map((employee, i) => (
                            <motion.tr
                                style={{ border: `2px solid ${crm?.theme?.card.border}` }}
                                key={i}
                                className="border-b border-gray-50 transition"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="p-3">{employee.name}</td>
                                <td className="p-3">{employee.email}</td>
                                <td className="p-3">{onlineUsers?.find((value) => value === employee._id) ? <h1 className='text-green-500'>Online</h1> : <h1 className='text-red-300'>Offline</h1>}</td>
                                <td className="p-3">{new Date(employee.updatedAt).toDateString()}</td>
                                <td className="p-3">{employee.taskCount}</td>
                                <td className="p-3 flex gap-5">
                                    <button
                                        onClick={() => {
                                            document.getElementById('my_modal_5').showModal()
                                            setView(true)
                                            setFormData({...employee})
                                        }}
                                        className="flex items-center hover:underline">
                                        <Eye size={20} className="mr-2" />
                                        View
                                    </button>
                                    <button
                                        onClick={() => {
                                            document.getElementById('my_modal_5').showModal()
                                            setUpdate(true)
                                            setFormData({ ...employee })
                                        }}    className="flex items-center hover:underline">
                                        <Edit size={20} className="mr-2" />
                                        Update
                                    </button>
                                </td>
                            </motion.tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="text-center p-4">No employees found!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    <button
                        style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-md disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            style={{
                                backgroundColor: currentPage === index + 1 ? crm?.theme?.navbar.accent : crm?.theme?.navbar.background,
                                color: crm?.theme?.navbar.text
                            }}
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className="px-3 py-1 rounded-md"
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-md disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default EmployeesTable;
