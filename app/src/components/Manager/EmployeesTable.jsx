import { Edit, Eye } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from "react-redux";

const employeesData = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Active", lastLogin: "2025-03-03", tasks: 5 },
    { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Inactive", lastLogin: "2025-02-28", tasks: 2 },
    { id: 3, name: "Charlie Davis", email: "charlie@example.com", status: "Active", lastLogin: "2025-03-01", tasks: 8 },
    { id: 4, name: "David White", email: "david@example.com", status: "Active", lastLogin: "2025-03-02", tasks: 3 },
    { id: 5, name: "Eve Adams", email: "eve@example.com", status: "Inactive", lastLogin: "2025-02-25", tasks: 0 },
    { id: 6, name: "Alice Johnson", email: "alice@example.com", status: "Active", lastLogin: "2025-03-03", tasks: 5 },
    { id: 7, name: "Bob Smith", email: "bob@example.com", status: "Inactive", lastLogin: "2025-02-28", tasks: 2 },
    { id: 8, name: "Charlie Davis", email: "charlie@example.com", status: "Active", lastLogin: "2025-03-01", tasks: 8 },
    { id: 9, name: "David White", email: "david@example.com", status: "Active", lastLogin: "2025-03-02", tasks: 3 },
    { id: 10, name: "Eve Adams", email: "eve@example.com", status: "Inactive", lastLogin: "2025-02-25", tasks: 0 },
];

const EmployeesTable = ({ search, employees, setView, setUpdate, setFormData }) => {
    const { crm } = useSelector((state) => state.crm);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filter Employees based on search input
    const filteredEmployees = employees?.filter(employee =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase()) ||
        employee.status.toLowerCase().includes(search.toLowerCase())
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
                                <td className="p-3">{employee.status}</td>
                                <td className="p-3">{employee.lastLogin}</td>
                                <td className="p-3">{employee.tasks}</td>
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
