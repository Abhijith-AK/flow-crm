const express = require("express")
const crmController = require("../controllers/crmController")
const leadsController = require("../controllers/leadsController")
const jwtMiddleware = require("../middlewares/jwtMiddleware")

const crmRouter = new express.Router()

// get crm
crmRouter.get("/crm/:id", jwtMiddleware, crmController.getCrmController)

// get all crm
crmRouter.get("/all-crm", jwtMiddleware, crmController.getAllCrmController)

// add lead
crmRouter.post("/crm/lead/add", jwtMiddleware, leadsController.addLeadController)

// get lead
crmRouter.get("/crm/lead/:id", jwtMiddleware, leadsController.getALeadController)

// get all leads
crmRouter.get("/crm/leads-all/:id", jwtMiddleware, leadsController.getAllLeadsController)

// update lead
crmRouter.put("/crm/lead/update", jwtMiddleware, leadsController.updateLeadController)

// delete lead
crmRouter.delete("/crm/lead/delete/:id", jwtMiddleware, leadsController.deleteLeadController)


module.exports = crmRouter