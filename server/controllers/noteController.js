const notes = require("../models/noteModel")

// get all notes
exports.getAllNotesController = async (req, res) => {
    const { id, leadId } = req.params
    try {
        const allNotes = await notes.find({ crmId: id, assignedTo: leadId})
        if (allNotes) res.status(200).json(allNotes)
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside getAllNotesController", error)
    }
}

// add Note controller
exports.addNoteController = async (req, res) => {
    const { note, assignedTo, crmId } = req.body;
    try {
        const newNote = new notes({
            note, assignedTo, crmId 
        })
        if (newNote) {
            await newNote.save()
            res.status(201).json(newNote)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside addNoteController", error)
    }
}

// delete Note controller
exports.deleteNoteController = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteNote = await notes.findByIdAndDelete(id);
        if (deleteNote) {
            res.status(200).json(deleteNote)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside deleteNoteController", error)
    }
}
