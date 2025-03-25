import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { getAllComplaints, replyComplaint } from '../../services/allAPI';

const Complaints = () => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [reply, setReply] = useState('');
  const [complaintsData, setComplaintsData] = useState([])

  const reqHeader = {
    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
  }

  const getComplaints = async () => {
    try {
      const response = await getAllComplaints(reqHeader)
      console.log(response)
      if (response.status == 200) setComplaintsData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getComplaints() }, [])

  const openComplaint = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeComplaint = () => {
    setSelectedComplaint(null);
    setReply('');
  };

  const resolveComplaint = async () => {
    if (selectedComplaint) {
      const reqBody = {
        ...selectedComplaint,
        resolved: true,
        reply,
        crmId: selectedComplaint.crmId._id,
        managerId: selectedComplaint.managerId._id,
        id: selectedComplaint._id
      }
      try {
        const response = await replyComplaint(reqBody, reqHeader)
        if (response.status === 201) {
          alert("Replied And Resolved!")
          closeComplaint();
          getComplaints()
        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <div className="w-full p-6 min-h-screen text-white rounded-lg shadow-lg">
      {/* Open Complaints Section */}
      <h2 className="text-xl font-semibold mb-4 text-blue-300">Open Complaints</h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {complaintsData.filter(c => c.resolved === false).map((complaint) => (
          <motion.div key={complaint._id} className="bg-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-600 transition">
            <h3 className="text-lg font-semibold text-blue-200">{complaint.crmId.name}</h3>
            <p className="text-blue-300">Manager: <span className="font-bold text-white">{complaint.managerId.name}</span></p>
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
        {complaintsData.filter(c => c.resolved === true).map((complaint) => (
          <motion.div key={complaint.id} className="bg-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-600 transition">
            <h3 className="text-lg font-semibold text-blue-200">{complaint.crmId.name}</h3>
            <p className="text-blue-300">Manager: <span className="font-bold text-white">{complaint.managerId.name}</span></p>
            <p className="text-blue-300">Issue: {complaint.complaint}</p>
            <p className="flex items-center">Status:
              <CheckCircle className="text-green-400 ml-2" size={18} />
              <span className="ml-1">Resolved</span>
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Complaint Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-blue-900 p-6 rounded-lg shadow-lg text-white w-96">
            <h3 className="text-lg font-semibold">{selectedComplaint.crmId.name} - {selectedComplaint.managerId.name}</h3>
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
