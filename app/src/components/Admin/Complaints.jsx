import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle } from 'lucide-react';

const complaintsData = [
  { id: 1, crm: "SalesFlow", manager: "Alice Johnson", complaint: "Issue with premium upgrade", status: "Open", date: "2025-02-25" },
  { id: 2, crm: "LeadMaster", manager: "Bob Smith", complaint: "Payment not reflecting", status: "Open", date: "2025-02-26" },
  { id: 3, crm: "PipeSync", manager: "Charlie Davis", complaint: "Login issues", status: "Resolved", date: "2025-02-27" }
];

const Complaints = () => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [reply, setReply] = useState('');

  const openComplaint = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeComplaint = () => {
    setSelectedComplaint(null);
    setReply('');
  };

  const resolveComplaint = () => {
    if (selectedComplaint) {
      selectedComplaint.status = "Resolved";
      closeComplaint();
    }
  };

  return (
    <div className="w-full p-6 min-h-screen text-white rounded-lg shadow-lg">
      {/* Open Complaints Section */}
      <h2 className="text-xl font-semibold mb-4 text-blue-300">Open Complaints</h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {complaintsData.filter(c => c.status === "Open").map((complaint) => (
          <motion.div key={complaint.id} className="bg-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-600 transition">
            <h3 className="text-lg font-semibold text-blue-200">{complaint.crm}</h3>
            <p className="text-blue-300">Manager: <span className="font-bold text-white">{complaint.manager}</span></p>
            <p className="text-blue-300">Issue: {complaint.complaint}</p>
            <button
              className="mt-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 rounded"
              onClick={() => openComplaint(complaint)}
            >
              View & Reply
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Resolved Complaints Section */}
      <h2 className="text-xl font-semibold mt-6 mb-4 text-blue-300">Resolved Complaints</h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {complaintsData.filter(c => c.status === "Resolved").map((complaint) => (
          <motion.div key={complaint.id} className="bg-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-600 transition">
            <h3 className="text-lg font-semibold text-blue-200">{complaint.crm}</h3>
            <p className="text-blue-300">Manager: <span className="font-bold text-white">{complaint.manager}</span></p>
            <p className="text-blue-300">Issue: {complaint.complaint}</p>
            <p className="flex items-center">Status:
              <CheckCircle className="text-green-400 ml-2" size={18} />
              <span className="ml-1">{complaint.status}</span>
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Complaint Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-blue-900 p-6 rounded-lg shadow-lg text-white w-96">
            <h3 className="text-lg font-semibold">{selectedComplaint.crm} - {selectedComplaint.manager}</h3>
            <p className="mt-2">{selectedComplaint.complaint}</p>
            <textarea
              className="w-full mt-3 p-2 text-black rounded-md"
              placeholder="Write a reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div className="flex justify-between mt-4">
              <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-1 px-4 rounded" onClick={closeComplaint}>Close</button>
              <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 rounded" onClick={resolveComplaint}>Mark as Resolved</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;
