import { Edit, Eye } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from "react-redux"

const leadsData = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "New", assignedTo: "Alice Johnson" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "In Progress", assignedTo: "Bob Smith" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", status: "Converted", assignedTo: "Charlie Davis" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", status: "New", assignedTo: "David White" },
    { id: 5, name: "Chris Wilson", email: "chris@example.com", status: "Follow-up", assignedTo: "Eve Adams" },
    { id: 6, name: "Olivia Taylor", email: "olivia@example.com", status: "In Progress", assignedTo: "Frank Miller" },
    { id: 7, name: "Daniel Lee", email: "daniel@example.com", status: "New", assignedTo: "Grace Hall" },
    { id: 8, name: "Sophia Martinez", email: "sophia@example.com", status: "Converted", assignedTo: "Hank Green" },
    { id: 9, name: "Liam Anderson", email: "liam@example.com", status: "Follow-up", assignedTo: "Ivy Carter" },
    { id: 10, name: "Emma Thomas", email: "emma@example.com", status: "New", assignedTo: "Jack Wilson" },
];

const LeadsTable = ({ search, setSearch }) => {
    const { crm } = useSelector((state) => state.crm)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filter Leads based on search input
    const filteredLeads = leadsData.filter(lead =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.status.toLowerCase().includes(search.toLowerCase()) ||
        lead.assignedTo.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

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
                            <th className="p-3 text-left">Lead Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Assigned To</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedLeads.length > 0 ? selectedLeads.map((lead) => (
                            <motion.tr
                                style={{ border: `2px solid ${crm?.theme?.card.border}` }}
                                key={lead.id}
                                className="border-b border-gray-50 transition"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="p-3">{lead.name}</td>
                                <td className="p-3">{lead.email}</td>
                                <td className="p-3">{lead.status}</td>
                                <td className="p-3">{lead.assignedTo}</td>
                                <td className="p-3 flex gap-5">
                                    <button
                                        className="flex items-center hover:underline"
                                    >
                                        <Eye size={20} className="mr-2" />
                                        View
                                    </button>
                                    <button
                                        className="flex items-center hover:underline"
                                    >
                                        <Edit size={20} className="mr-2" />
                                        Update
                                    </button>
                                </td>
                            </motion.tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="text-center p-4">No leads found!</td>
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
            {/* TODO: modal for actions */}
            
        </div>
    );
};

export default LeadsTable;
