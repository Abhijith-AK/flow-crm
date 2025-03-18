const crm = require("../models/crmModel")

// create CRM
exports.createCrmController = async (req, res) => {
    const { name, type, workflows, layout, theme, createdBy  } = req.body
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
        const allCrms = await crm.find()
        if (!allCrms) return res.status(406).json("Invalid Request!!")
        res.status(200).json(allCrms)
    } catch (error) {
        res.status(500).json("Unauthorized")
        console.log("Error inside getAllCrmController", error)
    }
}