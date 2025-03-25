import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    crmId: { type: mongoose.Schema.Types.ObjectId, ref: "crms", required: true }, // Link to CRM
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    senderName: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const announcements = mongoose.model("announcements", announcementSchema);
