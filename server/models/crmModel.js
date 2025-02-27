const mongoose = require("mongoose")

const crmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    workflows: {
        type: Array,
        required: true
    },
    layout: {
        type: String,
        required: true
    },
    theme: {
        type: Object,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
}, {timestamps: true})

const crm = mongoose.model("crms", crmSchema)

module.exports = crm