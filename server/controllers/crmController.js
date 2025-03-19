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
