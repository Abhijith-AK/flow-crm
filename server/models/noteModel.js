const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "leads",
        required: true
    },
    crmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "crms",
        required: true
    },
}, { timestamps: true })

const notes = mongoose.model("notes", noteSchema)

module.exports = notes