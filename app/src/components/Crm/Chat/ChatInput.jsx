import React, { useState } from 'react';
import { sendMessage } from '../../../services/allAPI';
import { socket } from '../../../App';

const ChatInput = ({ selectedUser, setOnMessageSent }) => {
    const [message, setMessage] = useState('');
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");

    const handleSendMessage = async () => {
        if (!message.trim()) return; // Prevent empty messages

        try {
            const reqBody = {
                senderId: currentUser._id,
                recieverId: selectedUser._id,
                message: message,
            };
            const result = await sendMessage(reqBody, {
                "Authorization": `Bearer ${token}`
            });

            if (result.status === 201) {
                setMessage('');
                setOnMessageSent(result.data);
                socket.emit("send", reqBody);
            } else {
                alert('Failed to send message');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mt-4 flex">
            <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSendMessage}
                className="py-2 px-4 rounded-xl text-amber-50 bg-blue-400 ms-2"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;