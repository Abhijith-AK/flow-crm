const express = require("express")
const crmController = require("../controllers/crmController")
const leadsController = require("../controllers/leadsController")
const tasksController = require("../controllers/taskController")
const noteController = require("../controllers/noteController")
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

// update lead status
crmRouter.put("/crm/lead/update-status", jwtMiddleware, leadsController.updateLeadStatusController)

// delete lead
crmRouter.delete("/crm/lead/delete/:id", jwtMiddleware, leadsController.deleteLeadController)

// add task
crmRouter.post("/crm/task/add", jwtMiddleware, tasksController.addTaskController)

// get task
crmRouter.get("/crm/task/:id", jwtMiddleware, tasksController.getATaskController)

// get all tasks
crmRouter.get("/crm/tasks-all/:id", jwtMiddleware, tasksController.getAllTasksController)

// update task
crmRouter.put("/crm/task/update", jwtMiddleware, tasksController.updateTaskController)

// delete task
crmRouter.delete("/crm/task/delete/:id", jwtMiddleware, tasksController.deleteTaskController)

// add note
crmRouter.post("/crm/note/add", jwtMiddleware, noteController.addNoteController)

// get all notes
crmRouter.get("/crm/:id/note/:leadId", jwtMiddleware, noteController.getAllNotesController)

// delete note
crmRouter.delete("/crm/note/delete/:id", jwtMiddleware, noteController.deleteNoteController)

module.exports = crmRouter