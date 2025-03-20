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

try {
    deleteExpiredCrms();
    console.log("Cron job for deleting expired CRMs started.");
} catch (error) {
    console.error("Error starting the CRM deletion cron job:", error);
}

server.listen(PORT, () => {
    console.log(`Server started running on PORT: ${PORT}`)
})