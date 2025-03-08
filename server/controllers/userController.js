const users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// verify email
exports.registerVerifyEmailController = async (req, res) => {
    const {email} =req.body
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) return res.status(401).json("User already Exists!! Try another email address or Go to Login!")
        res.status(200).json("Not an existing user proceed")
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside registerVerifyUserController", error)
    }
}

// register user
exports.registerManagerController = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) return res.status(401).json("User already Exists!! Try another email address or Go to Login!")
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new users({
            name, email, password: encryptedPassword, role: 'manager'
        })
        if (newUser) {
            await newUser.save()
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside registerManagerController", error)
    }
}

// updateCrmId manager
exports.updateManagerCrmController = async (req, res) => {
    const { crmId, managerId } = req.body
    try {
        const manager = await users.findOne({_id:managerId})
        manager.crmId = crmId
        const updateManager = await users.findByIdAndUpdate(managerId, { crmId }, {new: true});
        if (updateManager) {
            console.log(updateManager)
            res.status(201).json(updateManager)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside updateManagerCrmController", error)
    }
}


// login user
exports.loginUserController = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) return res.send(406).json("All fields are required")
    try {
        const existingUser = await users.findOne({email})
        if(!existingUser) return res.status(401).json("Invalid Credentials")
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if (isPasswordValid || password === existingUser.password) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASS)
            res.status(200).json({ user: existingUser, token });
        } else {
            res.status(401).json("Invalid Credentials!!")
        }
    } catch (error) {
        res.status(401).json(error)
        console.log(error);
    }
}


// register employee
exports.registerEmployeeController = async (req, res) => {
    const { name, email, password, phoneno, crmId } = req.body
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) return res.status(401).json("An account with this email already exists! Please try a different email address.")
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new users({
            name, email, password: encryptedPassword, phoneno, crmId, role: 'employee'
        })
        if (newUser) {
            await newUser.save()
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside registerEmployeeController", error)
    }
}

// get all employee
exports.getAllEmployeeController = async (req, res) => {
    const { id } = req.params
    try {
        const allEmployee = await users.find({ crmId: id, role: "employee" })
        if (allEmployee) res.status(200).json(allEmployee)
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside getAllEmployeeController", error)
    }
}

// get employee
exports.getEmployeeController = async (req, res) => {
    const { id } = req.params
    try {
        const employee = await users.findById(id)
        if (employee) {
            res.status(200).json(employee)
        } else {
            res.status(404).json("Not Found!!")
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside getEmployeeController", error)
    }
}

// update employee
exports.updateEmployeeController = async (req, res) => {
    const {id} = req.params
    const { crmId, name, email, phoneno, role } = req.body
    try {
        const updateManager = await users.findByIdAndUpdate(id, { crmId, name, email, phoneno, role }, { new: true });
        if (updateManager) {
            res.status(201).json(updateManager)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside updateEmployeeController", error)
    }
}

// delete employee
exports.deleteEmployeeController = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEmployee = await users.findByIdAndDelete(id)
        if (deletedEmployee) res.status(200).json(deletedEmployee);
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside deleteEmployeeController", error)
    }
}