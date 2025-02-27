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