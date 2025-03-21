import React, { useState } from 'react';
import { socket } from '../../../App';
import { postAnnouncement } from '../../../services/allAPI';
import { useSelector } from 'react-redux';

const AnnouncementInput = ({ setOnAnnouncementSent }) => {
    const [message, setMessage] = useState('');
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    console.log(currentUser)
    const token = sessionStorage.getItem("token");
    const { role } = currentUser; // Assuming role is stored in session
    const { crm } = useSelector((state) => state.crm);
    const crmId = crm._id;

    const handleSendAnnouncement = () => {
        if (message) setOnAnnouncementSent(message);
        setMessage("")
    };

    return (
        <div className="mt-4 flex">
            {role === 'manager' ? (
                <>
                    <input
                        type="text"
                        placeholder="Type an announcement..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSendAnnouncement}
                        className="py-2 px-4 rounded-xl text-white bg-blue-500 ms-2"
                    >
                        Send
                    </button>
                </>
            ) : (
                <p className="text-gray-500">Only managers can send announcements.</p>
            )}
        </div>
    );
};

export default AnnouncementInput;
