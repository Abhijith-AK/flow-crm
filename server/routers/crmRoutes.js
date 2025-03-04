const express = require("express")
const crmController = require("../controllers/crmController")
const jwtMiddleware = require("../middlewares/jwtMiddleware")

const crmRouter = new express.Router()

// get crm
crmRouter.get("/crm/:id", jwtMiddleware, crmController.getCrmController)

module.exports = crmRouter