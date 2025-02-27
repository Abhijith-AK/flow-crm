const express = require("express")
const cors = require("cors")
const userRouter = require("./routers/userRoutes")
require("dotenv").config()
require("./config/dbConnection")

const server = express()
const PORT = 5000

server.use(cors())
server.use(express.json())

server.use("/api", userRouter)

server.listen(PORT, () => {
    console.log(`Server started running on PORT: ${PORT}`)
})