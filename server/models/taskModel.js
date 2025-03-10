const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    crmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "crm",
        required: true,
        index: true
    },
}, { timestamps: true })

const tasks = mongoose.model("tasks", taskSchema)

module.exports = tasks