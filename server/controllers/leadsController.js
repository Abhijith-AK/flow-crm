const leads = require("../models/leadModel");

// add lead controller
exports.addLeadController = async (req, res) => {
    const { crmId, name, email, phoneno, status, revenue, assignedTo } = req.body;
    try {
        const existingCustomer = await leads.findOne({ crmId, email })
        if (existingCustomer) return res.status(406).json("Already Existing Customer with same Email!!")
        const newLead = new leads({
            name, email, phoneno, status, crmId, revenue, assignedTo: assignedTo ? assignedTo : null
        })
        if (newLead) {
            await newLead.save()
            res.status(201).json(newLead)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside addLeadController", error)
    }
}

// get all leads
exports.getAllLeadsController = async (req, res) => {
    const { id } = req.params
    try {
        const allLeads = await leads.find({ crmId: id }).populate("assignedTo")
        if(allLeads) res.status(200).json(allLeads)
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside getAllLeadsController", error)
    }
}

// get a lead
exports.getALeadController = async (req, res) => {
    const { id } = req.params
    try {
        const lead = await leads.findById(id).populate("assignedTo")
        if (lead) {
            res.status(200).json(lead)
        } else {
            res.status(404).json("Not Found!!")
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside getALeadController", error)
    }
}

// update lead controller
exports.updateLeadController = async (req, res) => {
    const { id, crmId, name, email, status, revenue, assignedTo } = req.body;
    try {
        const updateLead = await leads.findByIdAndUpdate(id, {
            name, email, status, crmId, revenue, assignedTo
        }, { new : true })
        if (updateLead) {
            res.status(200).json(updateLead)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside updateLeadController", error)
    }
}

// update lead Status 
exports.updateLeadStatusController = async (req, res) => {
    const { id, status } = req.body;
    try {
        const updateLead = await leads.findByIdAndUpdate(id, {
            status
        }, { new : true })
        if (updateLead) {
            res.status(200).json(updateLead)
            // console.log(updateLead)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside updateTaskController", error)
    }
}

// delete lead controller
exports.deleteLeadController = async (req, res) => {
    const  {id} = req.params;
    try {
        const deleteLead = await leads.findByIdAndDelete(id);
        if (deleteLead) {
            res.status(200).json(deleteLead)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside deleteLeadController", error)
    }
}
