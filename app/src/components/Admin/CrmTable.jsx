import { Eye } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CrmTable = ({search, crms}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter CRMs based on search input
    const filteredData = crms?.filter(item =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.managedBy?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedData = filteredData?.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="w-full p-6 bg-blue-600 text-white rounded-lg shadow-lg">

            <motion.div
                className="overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <table className="w-full border border-gray-50">
                    <thead>
                        <tr className="bg-blue-800 text-gray-300">
                            <th className="p-3 text-left">CRM</th>
                            <th className="p-3 text-left">Managed By</th>
                            <th className="p-3 text-left">Total Users</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedData?.length > 0 ? selectedData.map((item) => (
                            <motion.tr
                                key={item._id}
                                className="border-b border-gray-50 hover:bg-blue-500 transition"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.createdBy?.name}</td>
                                <td className="p-3">{item.users?.length}</td>
                                <td className="p-3">{item.type}</td>
                                <td className="p-3">
                                    <Link
                                        to={item._id}
                                        className="flex items-center text-blue-50 hover:underline"
                                    >
                                        <Eye size={20} className="mr-2" />
                                        View
                                    </Link>
                                </td>
                            </motion.tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="text-center p-4 text-gray-400">No CRM found!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-700 rounded-md disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500' : 'bg-gray-700'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-700 rounded-md disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default CrmTable;
