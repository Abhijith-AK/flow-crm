const mongoose = require("mongoose")

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    revenue: {
        type: Number,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null
    },
    crmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "crm",
        required: true
    },
})

const leads = mongoose.model("leads", leadSchema)

module.exports = leads