const express = require("express")
const cors = require("cors")
const userRouter = require("./routers/userRoutes")
const crmRouter = require("./routers/crmRoutes")
const deleteExpiredCrms = require("./cronJobs/deleteExpiredCrms")
require("dotenv").config()
require("./config/dbConnection")

const server = express()
const PORT = 5000

server.use(cors())
server.use(express.json())

server.use("/api", userRouter)
server.use("/api", crmRouter)

try {
    deleteExpiredCrms();
    console.log("Cron job for deleting expired CRMs started.");
} catch (error) {
    console.error("Error starting the CRM deletion cron job:", error);
}

server.listen(PORT, () => {
    console.log(`Server started running on PORT: ${PORT}`)
})