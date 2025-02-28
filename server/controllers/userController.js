const users = require("../models/userModel")
const bcrypt = require("bcrypt")

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
exports.registerUserController = async (req, res) => {
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
        console.log("Error inside registerUserController", error)
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
const loginUserController = async (req, res) => {

}