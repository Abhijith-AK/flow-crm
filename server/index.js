const express = require("express")
const cors = require("cors")
const userRouter = require("./routers/userRoutes")
const http = require("http")
const socket = require("socket.io")
const crmRouter = require("./routers/crmRoutes")
const deleteExpiredCrms = require("./cronJobs/deleteExpiredCrms")
const messageRouter = require("./routers/messageRoutes")
require("dotenv").config()
require("./config/dbConnection")

const app = express()
const server = http.createServer(app)

const PORT = 5000

app.use(cors())
app.use(express.json())

app.use("/api", userRouter)
app.use("/api", crmRouter)
app.use("/api/message", messageRouter)

const io = new socket.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


const onlineUsers = new Map()

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} is online`);
        io.emit("online", Array.from(onlineUsers.keys()));
    });

    socket.on("send", ({ senderId, recieverId, message }) => {
        const receiverSocketId = onlineUsers.get(recieverId);
        console.log(receiverSocketId, onlineUsers, recieverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receive", { senderId, message });
            console.log(recieverId, message)
        }
    });

    socket.on("joinCRM", (crmId) => {
        socket.join(crmId);
    });

    socket.on("announcement", (data) => {
        const { crmId } = data;
        io.to(crmId).emit("announcement", data); // Send only to users in that CRM
    });


    socket.on("disconnect", () => {
        for (let [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                io.emit("online", Array.from(onlineUsers.keys()));
                console.log(`User ${userId} disconnected`);
                break;
            }
        }
    });
});


try {
    deleteExpiredCrms();
    console.log("Cron job for deleting expired CRMs started.");
} catch (error) {
    console.error("Error starting the CRM deletion cron job:", error);
}

server.listen(PORT, () => {
    console.log(`Server started running on PORT: ${PORT}`)
})