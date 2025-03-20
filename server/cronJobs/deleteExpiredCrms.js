const cron = require("node-cron");
const users = require("../models/userModel");
const leads = require("../models/leadModel");
const tasks = require("../models/taskModel");
const notes = require("../models/noteModel");
const crm = require("../models/crmModel");

const deleteExpiredCrms = async () => {
    console.log("Checking for CRMs to delete on startup...");

    const threeDaysAgo = new Date(Date.now() - 259200000); // 3 days in milliseconds

    try {
        const expiredCrms = await crm.find({
            deactivated: true,
            deactivationDate: { $lte: threeDaysAgo },
        });

        for (const crmItem of expiredCrms) {
            await Promise.all([
                users.deleteMany({ crmId: crmItem._id }),
                leads.deleteMany({ crmId: crmItem._id }),
                tasks.deleteMany({ crmId: crmItem._id }),
                notes.deleteMany({ crmId: crmItem._id }),
                crm.findByIdAndDelete(crmItem._id),
            ]);
            console.log(`Deleted CRM: ${crmItem._id}`);
        }
    } catch (error) {
        console.error("Error deleting expired CRMs:", error);
    }

    // Schedule the cron job to run every 6 hours
    cron.schedule("0 */6 * * *", async () => {
        console.log("Checking for CRMs to delete...");

        try {
            const expiredCrms = await crm.find({
                deactivated: true,
                deactivationDate: { $lte: new Date(Date.now() - 259200000) },
            });

            for (const crmItem of expiredCrms) {
                await Promise.all([
                    users.deleteMany({ crmId: crmItem._id }),
                    leads.deleteMany({ crmId: crmItem._id }),
                    tasks.deleteMany({ crmId: crmItem._id }),
                    notes.deleteMany({ crmId: crmItem._id }),
                    crm.findByIdAndDelete(crmItem._id),
                ]);
                console.log(`Deleted CRM: ${crmItem._id}`);
            }
        } catch (error) {
            console.error("Error deleting expired CRMs:", error);
        }
    });
};

module.exports = deleteExpiredCrms;
