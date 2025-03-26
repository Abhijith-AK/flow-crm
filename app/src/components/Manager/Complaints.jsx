import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Hourglass, MessageCircle, PlusCircle, Share, Trash } from 'lucide-react';
import { deleteComplaints, getCrmComplaints, postComplaint } from '../../services/allAPI';

const Complaints = ({ crm }) => {
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [reply, setReply] = useState('');
    const [complaintsData, setComplaintsData] = useState([])
    const [view, setView] = useState(false)

    const reqHeader = {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    }

    const getComplaints = async () => {
        const id = crm._id
        try {
            const response = await getCrmComplaints(id, reqHeader)
            if (response.status == 200) setComplaintsData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getComplaints() }, [])

    const sendYComplaint = async () => {
        const reqBody = {
            managerId: crm.createdBy._id,
            complaint: reply,
            crmId: crm._id
        }
        try {
            const response = await postComplaint(reqBody, reqHeader)
            if (response.status === 201) {
                alert("Complaint Sended")
                closeComplaint()
                getComplaints()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const openComplaint = (complaint) => {
        setSelectedComplaint(complaint);
        console.log(complaint)
    };

    const viewComplaint = () => {
        setSelectedComplaint(true);
        setView(true)
    };

    const closeComplaint = () => {
        setSelectedComplaint(null);
        setReply('');
        setView(false)
    };

    const deleteComplaint = async (id) => {
        if (selectedComplaint) {
            const confirm = window.confirm("Are You sure you want to remove this complaint!")
            if (confirm) {
                try {
                    const response = await deleteComplaints(id, reqHeader)
                    if (response.status == 200) {
                        alert("Complaint Deleted");
                        closeComplaint()
                        getComplaints()
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    };
    return (
        <div className='mt-5'>
            {/* Open Complaints Section */}
            <div className='flex gap-10 items-center my-3 mb-5'>
                <h2 className="text-xl font-semibold ">Open Complaints</h2>
                <button
                    onClick={viewComplaint}
                    className='px-3 py-1 rounded flex gap-5 items-center text-xl me-5 shadow-xl'
                    style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
                >
                    <PlusCircle /> New Complaint
                </button>
            </div>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {complaintsData.length > 0 ? complaintsData.filter(c => c.resolved === false).map((complaint) => (
                    <motion.div
                        onClick={() => openComplaint(complaint)}
                        style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
                        key={complaint._id} className="p-4 rounded-lg shadow-md">
                        <h3 className="text-sm font-semibold">Date: {new Date(complaint.createdAt).toLocaleString()}</h3>
                        <p className="">Issue: {complaint.complaint}</p>
                        <p className="flex items-center">Status:
                            <Hourglass className="text-blue-400 ml-2" size={18} />
                            <span className="ml-1">Pending</span>
                        </p>
                    </motion.div>
                )) : <div>No Open Complaints</div>}
            </motion.div>

            {/* Resolved Complaints Section */}
            <h2 className="text-xl font-semibold mt-6 mb-4 ">Resolved Complaints</h2>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {complaintsData.length > 0 ? complaintsData.filter(c => c.resolved === true).map((complaint) => (
                    <motion.div
                        onClick={() => openComplaint(complaint)}
                        style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
                        key={complaint._id} className="p-4 rounded-lg shadow-md">
                        <h3 className="text-sm font-semibold">Date: {new Date(complaint.createdAt).toLocaleString()}</h3>
                        <p className="">Issue: {complaint.complaint}</p>
                        <p className=''>Reply: {complaint.reply}</p>
                        <p className="flex items-center">Status:
                            <CheckCircle className="text-green-400 ml-2" size={18} />
                            <span className="ml-1">Resolved</span>
                        </p>
                    </motion.div>
                )) : <div>No resolved Complaints</div>}
            </motion.div>

            {/* Complaint Modal */}
            {selectedComplaint && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {view ? <div
                        style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
                        className="p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold">New Complaint</h3>
                        <textarea
                            className="w-full mt-3 p-2 text-black rounded-md"
                            placeholder="Write a complaint..."
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                        />
                        <div className="flex justify-between mt-4">
                            <button className="bg-gray-500 hover:bg-gray-400 font-bold py-1 px-4 rounded" onClick={closeComplaint}>Close</button>
                            {reply.length > 3 && <button style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }} className="font-bold py-1 px-4 rounded flex gap-3" onClick={sendYComplaint}>Send <Share /></button>}
                        </div>
                    </div>
                        :
                        <div
                            style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
                            className="p-6 rounded-lg shadow-lg w-96">
                            <h3 className="text-lg font-semibold">View Complaint</h3>
                            <div className='my-3 p-3 text-xl'>
                                <h3 className="text-xl font-semibold">Date: {new Date(selectedComplaint.createdAt).toLocaleString()}</h3>
                                <p className="text-xl my-2">Issue: {selectedComplaint.complaint}</p>
                                {selectedComplaint.reply && <p className="text-xl my-2">Reply: {selectedComplaint.reply}</p>}
                                {selectedComplaint.resolved ?
                                    <p className="flex items-center">Status:
                                        <CheckCircle className="text-green-400 ml-2" size={18} />
                                        <span className="ml-1">Resolved</span>
                                    </p>
                                    :
                                    <p className="flex items-center">Status:
                                        <Hourglass className="text-blue-400 ml-2" size={18} />
                                        <span className="ml-1">Pending</span>
                                    </p>
                                }
                            </div>
                            <div className="flex justify-between mt-4">
                                <button className="bg-gray-500 hover:bg-gray-400 font-bold py-1 px-4 rounded" onClick={closeComplaint}>Close</button>
                                <button style={{ backgroundColor: "red", color: "white" }} className="font-bold py-1 px-4 rounded flex gap-3" onClick={() => deleteComplaint(selectedComplaint._id)}>Delete <Trash /></button>
                            </div>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}

export default Complaints