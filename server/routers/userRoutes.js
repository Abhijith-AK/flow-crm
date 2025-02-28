const express = require("express")
const userController = require("../controllers/userController")
const crmController = require("../controllers/crmController")

const userRouter = new express.Router()

// verify email
userRouter.post("/verify", userController.registerVerifyEmailController)
// register manager
userRouter.post("/register", userController.registerUserController)
// create crm
userRouter.post("/create", crmController.createCrmController)
// assign crm
userRouter.put("/assign", userController.updateManagerCrmController)

module.exports = userRouter