const { announcements } = require("../models/announcementModel")
const Messages = require("../models/messageModel")

exports.sendMessage = async (req, res) => {
    const { senderId, recieverId, message } = req.body
    if (!senderId && !recieverId && !message) return res.status(400).json("All fields are required")
    try {
        const newMessage = await Messages.create({ senderId, recieverId, message })
        await newMessage.save()
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

exports.getAllMessages = async (req, res) => {
    const { senderId, recieverId } = req.body
    console.log(req.body)
    try {
        const messages = await Messages.find({
            $or: [
                { senderId, recieverId },
                { senderId: recieverId, recieverId: senderId }
            ]
        }).sort({ createdAt: 1 })
        if (messages.length > 0) {
            res.status(200).json(messages)
        } else {
            res.status(404).json("Start a conversation")
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

exports.getAnnouncements = async (req, res) => {
    try {
        const { id } = req.params;
        const announcement = await announcements.find({ crmId: id }).sort({ createdAt: -1 });
        res.status(200).json(announcement);
    } catch (error) {
        console.error("Error fetching announcements:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.postAnnouncement = async (req, res) => {
    try {
        const { crmId, senderId, senderName, message } = req.body;

        if (!crmId || !senderId || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newAnnouncement = new announcements({ crmId, senderId, senderName, message });
        await newAnnouncement.save();

        return res.status(201).json(newAnnouncement);
    } catch (error) {
        console.error("Error posting announcement:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}