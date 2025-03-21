import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { socket } from '../../../App';
import { getAllAnnouncements, postAnnouncement } from '../../../services/allAPI';
import AnnouncementInput from './AnnouncementInput';
import { AlertTriangle, Annoyed, Megaphone, MegaphoneIcon } from 'lucide-react';

const Announcements = () => {
    const [messages, setMessages] = useState([]);
    const location = useLocation();
    const { isManager, crmId } = location.state || {};
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");
    const messagesEndRef = useRef(null); // Ref for auto-scroll

    useEffect(() => {
        if (crmId) {
            socket.emit("joinCRM", crmId); // Join the CRM-specific room
            fetchAnnouncements();

            socket.on("announcement", (newAnnouncement) => {
                setMessages((prev) => [...prev, newAnnouncement]);
                scrollToBottom(); // Scroll on new message
            });

            return () => {
                socket.emit("leaveCRM", crmId);
                socket.off("announcement");
            };
        }
    }, [crmId]);

    const fetchAnnouncements = async () => {
        try {
            const result = await getAllAnnouncements(crmId, {
                "Authorization": `Bearer ${token}`
            });
            if (result.status === 200) {
                setMessages(result.data);
                scrollToBottom(); // Scroll after fetching messages
            } else {
                setMessages([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendMessage = async (message) => {
        if (!isManager) return; // Employees can't send messages

        const newMessage = {
            crmId, // Attach CRM ID
            senderId: currentUser._id,
            senderName: currentUser.name,
            message,
            createdAt: Date.now()
        };

        socket.emit("announcement", newMessage); // Send announcement in CRM room
        await postAnnouncement(newMessage, { "Authorization": `Bearer ${token}` });

        scrollToBottom(); // Scroll after sending message
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <div className="p-3 min-h-[90vh] flex flex-col">
            <h1 className="text-4xl mb-2 p-3 font-bold flex items-center"><AlertTriangle size={35}  className='me-2'/> Announcements</h1>
            <div className="flex-1 max-h-[70vh] overflow-y-auto bg-gray-200 p-4 rounded-lg">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className="mt-4">
                            <span className="text-xs text-gray-600 mb-1">{msg.senderName}</span>
                            <div className="p-3 bg-blue-500 w-fit text-xl text-white rounded-lg shadow-md">
                                {msg.message}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No announcements yet...</p>
                )}
                {/* Empty div for auto-scroll */}
                <div ref={messagesEndRef} />
            </div>
            {isManager && (
                <div className="px-6">
                    <AnnouncementInput setOnAnnouncementSent={handleSendMessage} />
                </div>
            )}
        </div>
    );
};

export default Announcements;
