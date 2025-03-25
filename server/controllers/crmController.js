const crm = require("../models/crmModel")
const leads = require("../models/leadModel")
const notes = require("../models/noteModel")
const tasks = require("../models/taskModel")
const users = require("../models/userModel")

// create CRM
exports.createCrmController = async (req, res) => {
    const { name, type, workflows, layout, theme, createdBy } = req.body
    try {
        const newCRM = new crm({
            name, type, workflows, layout, theme, createdBy
        })
        if (newCRM) {
            await newCRM.save()
            res.status(201).json(newCRM)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside createCrmController", error)
    }
}

// get CRM
exports.getCrmController = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(406).json("Invalid Request!!")
    try {
        const crmDetails = await crm.findById(id).populate("createdBy")
        if (!crmDetails) return res.status(406).json("Invalid Request!!")
        res.status(200).json(crmDetails)
    } catch (error) {
        res.status(500).json("Unauthorized")
        console.log("Error inside getCrmController", error)
    }
}

// get all CRMs
exports.getAllCrmController = async (req, res) => {
    try {
        const allCrms = await crm.find().populate("createdBy")
        const crmList = await Promise.all(allCrms.map(async (value) => {
            const crmUsers = await users.find({ crmId: value._id })
            return { ...value.toObject(), users: crmUsers }
        }))
        // if (crmList) console.log(crmList)
        res.status(200).json(crmList)
    } catch (error) {
        res.status(500).json("Unauthorized")
        console.log("Error inside getAllCrmController", error)
    }
}

// update Crm controller
exports.updateCrmController = async (req, res) => {
    const { _id: id, name, type, workflows, layout, theme, createdBy } = req.body;
    try {
        const updateCrm = await crm.findByIdAndUpdate(id, {
            name, type, workflows, layout, theme, createdBy
        }, { new: true })
        if (updateCrm) {
            res.status(200).json(updateCrm)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside updateCrmController", error)
    }
}

// update Crm controller
exports.updateCrmActivateController = async (req, res) => {
    const { id } = req.body;
    try {
        let updateCrm;
        const uCrm = await crm.findOne({ createdBy: id })
        if (uCrm.deactivated) {
            updateCrm = await crm.findByIdAndUpdate(uCrm._id, {
                deactivated: false
            }, { new: true })
        }
        if (updateCrm) {
            res.status(200).json(updateCrm)
            console.log("activated")
        } else {
            res.status(200).json("good")
            console.log(uCrm.deactivated)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside updateCrmActivateController", error)
    }
}

// deactivate CRM
exports.deactivateCrmController = async (req, res) => {
    const { crmId } = req.params;

    try {
        const updatedCrm = await crm.findByIdAndUpdate(crmId, {
            deactivated: true,
            deactivationDate: new Date()
        }, { new: true });

        if (!updatedCrm) {
            return res.status(404).json({ message: "CRM not found" });
        }

        res.status(200).json({
            message: "Your CRM is deactivated and will be deleted in 3 days unless reactivated."
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        console.error("Error inside deactivateCrmController", error);
    }
};

// delete CRM
exports.deleteCrmController = async (req, res) => {
    const { crmId } = req.params;
    try {
        await Promise.all([
            users.deleteMany({ crmId }),
            leads.deleteMany({ crmId }),
            tasks.deleteMany({ crmId }),
            notes.deleteMany({ crmId }),
            crm.findByIdAndDelete(crmId)
        ])
        res.status(200).json({ message: "CRM and all related data deleted successfully" })
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside deleteCrmController", error)
    }
}

// crm growth over time
exports.getCrmGrowthController = async (req, res) => {
    try {
        const crmGrowth = await crm.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    activeCount: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        const formattedData = crmGrowth.map(item => ({
            month: new Date(item._id.year, item._id.month - 1).toLocaleString('en-US', { month: 'short', year: 'numeric' }),
            activeCount: item.activeCount
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error fetching CRM growth data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};