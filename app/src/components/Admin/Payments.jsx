import { CheckCircle, Clock } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const verifiedPayments = [
  { id: 101, crm: "SalesFlow", manager: "Alice Johnson", amount: "$250", status: "Verified", date: "2025-02-25" },
  { id: 102, crm: "LeadMaster", manager: "Bob Smith", amount: "$250", status: "Verified", date: "2025-02-26" },
  { id: 103, crm: "PipeSync", manager: "Charlie Davis", amount: "$250", status: "Verified", date: "2025-02-27" },
  { id: 104, crm: "CRM Pro", manager: "David White", amount: "$250", status: "Verified", date: "2025-02-28" },
  { id: 105, crm: "TrackHub", manager: "Eve Adams", amount: "$250", status: "Verified", date: "2025-02-29" }
];

const recentPayments = [
  { id: 201, crm: "FlowSync", manager: "George Harris", amount: "$250", status: "Pending", date: "2025-03-01" },
  { id: 202, crm: "ClientTrack", manager: "Ivy Carter", amount: "$250", status: "Pending", date: "2025-03-02" }
];

const Payments = () => {
  const [search, setSearch] = useState('');

  const filteredVerified = verifiedPayments.filter(payment =>
    payment.crm.toLowerCase().includes(search.toLowerCase()) ||
    payment.manager.toLowerCase().includes(search.toLowerCase())
  );

  const filteredRecent = recentPayments.filter(payment =>
    payment.crm.toLowerCase().includes(search.toLowerCase()) ||
    payment.manager.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full p-6 min-h-screen text-white rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Search payments..."
        className="w-full p-2 mb-4 text-black rounded-md"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Recent Payments Section */}
      <h2 className="text-xl font-semibold mb-4 text-blue-300">Recent Payments</h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredRecent.length > 0 ? filteredRecent.map((payment) => (
          <motion.div key={payment.id} className="bg-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-700 transition">
            <h3 className="text-lg font-semibold text-blue-200">{payment.crm}</h3>
            <p className="text-blue-300">Managed By: <span className="font-bold text-white">{payment.manager}</span></p>
            <p className="text-blue-300">Amount: <span className="font-bold text-white">{payment.amount}</span></p>
            <p className="flex items-center">Status:
              <Clock className="text-yellow-400 ml-2" size={18} />
              <span className="ml-1">{payment.status}</span>
            </p>
            <p className="text-blue-300">Date: {payment.date}</p>
          </motion.div>
        )) : (
          <p className="text-center text-blue-400">No recent payments found!</p>
        )}
      </motion.div>

      {/* Verified Payments Section */}
      <h2 className="text-xl font-semibold mt-6 mb-4 text-blue-300">Verified Payments</h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredVerified.length > 0 ? filteredVerified.map((payment) => (
          <motion.div key={payment.id} className="bg-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-700 transition">
            <h3 className="text-lg font-semibold text-blue-200">{payment.crm}</h3>
            <p className="text-blue-300">Managed By: <span className="font-bold text-white">{payment.manager}</span></p>
            <p className="text-blue-300">Amount: <span className="font-bold text-white">{payment.amount}</span></p>
            <p className="flex items-center">Status:
              <CheckCircle className="text-green-400 ml-2" size={18} />
              <span className="ml-1">{payment.status}</span>
            </p>
            <p className="text-blue-300">Date: {payment.date}</p>
          </motion.div>
        )) : (
          <p className="text-center text-blue-400">No verified payments found!</p>
        )}
      </motion.div>
    </div>
  );
};

export default Payments;
