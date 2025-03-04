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