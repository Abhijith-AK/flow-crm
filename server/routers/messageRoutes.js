const express = require("express")
const messageController = require("../controllers/messageController")
const protectRoute = require("../middlewares/jwtMiddleware")
const messageRouter = new express.Router()

messageRouter.post('/send', protectRoute, messageController.sendMessage)
messageRouter.post('/all', protectRoute, messageController.getAllMessages)
messageRouter.post('/announcements', protectRoute, messageController.postAnnouncement)
messageRouter.get('/announcements/:id', protectRoute, messageController.getAnnouncements)

module.exports = messageRouter