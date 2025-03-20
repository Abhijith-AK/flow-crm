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