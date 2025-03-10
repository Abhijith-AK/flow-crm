const tasks = require("../models/taskModel");

// add task
exports.addTaskController = async (req, res) => {
    const { crmId, title, description, status, priority, dueDate, assignedTo } = req.body;
    try {
        const newTask = new tasks({
            crmId, title, description, status, priority, dueDate, assignedTo
        })
        if (newTask) {
            await newTask.save()
            res.status(201).json(newTask)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside addTaskController", error)
    }
}

// get task
exports.getATaskController = async (req, res) => {
    const { id } = req.params
    try {
        const task = await tasks.findById(id).populate("assignedTo")
        if (task) {
            res.status(200).json(task)
        } else {
            res.status(404).json("Not Found!!")
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside getATaskController", error)
    }
}

// get all task
exports.getAllTasksController = async (req, res) => {
    const { id } = req.params
    try {
        const allTasks = await tasks.find({ crmId: id }).populate("assignedTo")
        if (allTasks) res.status(200).json(allTasks)
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside getAllTasksController", error)
    }
}

// delete task
exports.deleteTaskController = async (req, res) => {
    const  {id} = req.params;
    try {
        const deleteTask = await tasks.findByIdAndDelete(id);
        if (deleteTask) {
            res.status(200).json(deleteTask)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside deleteTaskController", error)
    }
}
