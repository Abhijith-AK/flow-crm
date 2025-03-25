const express = require("express")
const messageController = require("../controllers/messageController")
const protectRoute = require("../middlewares/jwtMiddleware")
const messageRouter = new express.Router()

messageRouter.post('/send', protectRoute, messageController.sendMessage)
messageRouter.post('/all', protectRoute, messageController.getAllMessages)
messageRouter.post('/announcements', protectRoute, messageController.postAnnouncement)
messageRouter.get('/announcements/:id', protectRoute, messageController.getAnnouncements)
messageRouter.post('/complaint', protectRoute, messageController.sendComplaint)
messageRouter.get('/complaints', protectRoute, messageController.getAllComplaints)
messageRouter.get('/complaints/:id', protectRoute, messageController.getCrmComplaints)
messageRouter.put('/complaint', protectRoute, messageController.replyComplaint)
messageRouter.delete('/complaints/:id', protectRoute, messageController.deleteComplaint)

module.exports = messageRouter