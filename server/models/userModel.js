const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    crmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "crm",
        default: null
    },
})

const users = mongoose.model("users", userSchema);

module.exports = users