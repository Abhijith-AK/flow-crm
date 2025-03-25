const express = require("express")
const userController = require("../controllers/userController")
const crmController = require("../controllers/crmController")
const jwtMiddleware = require("../middlewares/jwtMiddleware")

const userRouter = new express.Router()

// verify email
userRouter.post("/verify", userController.registerVerifyEmailController)
// register manager
userRouter.post("/register", userController.registerManagerController)
// create crm
userRouter.post("/create", crmController.createCrmController)
// assign crm
userRouter.put("/assign", userController.updateManagerCrmController)
// login
userRouter.post("/login", userController.loginUserController);
// register employee
userRouter.post("/employee/register", jwtMiddleware, userController.registerEmployeeController);
// get all employee
userRouter.get("/employee/all/:id", jwtMiddleware, userController.getAllEmployeeController);
// get employee
userRouter.get("/employee/:id", jwtMiddleware, userController.getEmployeeController);
// update employee
userRouter.put("/employee/:id", jwtMiddleware, userController.updateEmployeeController);
// delete employee
userRouter.delete("/employee/:id", jwtMiddleware, userController.deleteEmployeeController);
// get all users
userRouter.get("/users", jwtMiddleware, userController.getAllUserController);


module.exports = userRouter