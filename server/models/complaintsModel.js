const mongoose = require("mongoose")

const complaintschema = new mongoose.Schema({
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
    resolved: {
        type: Boolean,
        default: false,
        required: true
    },
    reply: {
        type: String,
    },
    crmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "crms",
        required: true
    },
}, { timestamps: true })

const complaints = mongoose.model("complaints", complaintschema);

module.exports = complaints