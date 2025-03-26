const users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendMail = require("../services/emailService")
const crypto = require("crypto");
const crm = require("../models/crmModel");
const tasks = require("../models/taskModel");

// verify email
exports.registerVerifyEmailController = async (req, res) => {
    const { email } = req.body
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) return res.status(401).json("User already Exists!! Try another email address or Go to Login!")
        const otp = crypto.randomInt(100000, 1000000);
        console.log(otp);
        await sendMail(email, "Verify Your Email Address", `
            <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #f4f8ff; border-radius: 10px; border: 1px solid #dce7ff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center; padding-bottom: 20px;">
                    <h1 style="color: #004085; font-size: 24px; margin-bottom: 5px;">Flow CRM</h1>
                    <p style="color: #007BFF; font-size: 14px; font-weight: bold;">Secure & Streamline Your Business</p>
                </div>
                <div style="background: #ffffff; padding: 25px; border-radius: 8px; text-align: center; border: 1px solid #cce5ff;">
                    <h2 style="color: #0056b3; font-size: 22px; margin-bottom: 15px;">🔒 Email Verification</h2>
                    <p style="color: #333; font-size: 16px; font-weight: bold; margin-bottom: 10px;">Use the OTP below to verify your email address:</p>
                    <div style="font-size: 32px; font-weight: bold; color: #ffffff; background: #007BFF; padding: 15px 30px; border-radius: 8px; display: inline-block; margin: 15px auto; letter-spacing: 2px;">
                        ${otp}
                    </div>
                    <p style="color: #0056b3; font-size: 14px; font-weight: bold;">This OTP is valid for only <span style="color: #d9534f;">10 minutes</span>.</p>
                </div>
                <p style="text-align: center; font-size: 14px; color: #333; font-weight: bold; padding-top: 15px;">
                    If you didn’t request this, you can safely ignore this email.
                </p>
                <hr style="border: none; border-top: 1px solid #cce5ff; margin: 20px 0;">
                <p style="text-align: center; font-size: 13px; color: #004085; font-weight: bold;">Flow CRM | Your Business, Simplified.</p>
            </div>
        `);
        res.status(200).json({ message: "Not an existing user, proceed", otp });
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
        const manager = await users.findOne({ _id: managerId })
        manager.crmId = crmId
        const updateManager = await users.findByIdAndUpdate(managerId, { crmId }, { new: true });
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
    if (!email || !password) return res.send(406).json("All fields are required")
    try {
        const existingUser = await users.findOne({ email })
        console.log(req.body)
        if (!existingUser) return res.status(401).json("Invalid Credentials")
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        console.log(isPasswordValid)
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
    console.log(req.body)
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) return res.status(401).json("An account with this email already exists! Please try a different email address.")
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new users({
            name, email, password: encryptedPassword, phoneno, crmId, role: 'employee'
        })
        const crmDetails = await crm.findById(crmId)
        if (newUser) {
            await newUser.save()
            await sendMail(email, `Welcome to ${crmDetails.name} CRM!`, `
                <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #f4f8ff; border-radius: 10px; border: 1px solid #dce7ff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; padding-bottom: 20px;">
                        <h1 style="color: #004085; font-size: 24px; margin-bottom: 5px;">Hi ${name}, Welcome to ${crmDetails.name} CRM!</h1>
                        <p style="color: #007BFF; font-size: 14px; font-weight: bold;">Empowering You to Work Smarter</p>
                    </div>
                    <div style="background: #ffffff; padding: 25px; border-radius: 8px; text-align: center; border: 1px solid #cce5ff;">
                        <h2 style="color: #0056b3; font-size: 22px; margin-bottom: 15px;">👋 Welcome Aboard!</h2>
                        <p style="color: #333; font-size: 16px; font-weight: bold; margin-bottom: 10px;">We are thrilled to have you on our team.</p>
                        <p style="color: #333; font-size: 16px; font-weight: bold; margin-bottom: 10px;">Here are your login credentials:</p>
            
                        <div style="background: #f4f8ff; padding: 15px; border-radius: 8px; text-align: left; border: 1px solid #cce5ff; font-size: 16px; color: #333;">
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Password:</strong> ${password}</p>
                            <div style="text-align: center; margin-top: 15px;">
                                <a href="http://localhost:5173/login" style="background: #007BFF; color: #ffffff; padding: 12px 20px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 5px; display: inline-block;">
                                    Login Now
                                </a>
                            </div>
                        </div>

                        <p style="color: #d9534f; font-size: 14px; font-weight: bold; margin-top: 10px;">Please Don't Share Your Password!.</p>
                    </div>
        
                    <p style="text-align: center; font-size: 14px; color: #333; font-weight: bold; padding-top: 15px;">
                        If you need any help, feel free to reach out to our support team.
                    </p>

                    <hr style="border: none; border-top: 1px solid #cce5ff; margin: 20px 0;">
                    <p style="text-align: center; font-size: 13px; color: #004085; font-weight: bold;">&copy; Flow CRM | Your Business, Simplified.</p>
                </div>
            `);
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
        if (allEmployee) {
            const data = await Promise.all(
                allEmployee.map(async (employee) => {
                    const allTasks = await tasks.find({ assignedTo: employee._id });
                    return {
                        ...employee.toObject(),
                        taskCount: allTasks.length,
                        tasks: allTasks
                    };
                })
            );

            res.status(200).json(data);
        }
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
    const { id } = req.params
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

// get all users
exports.getAllUserController = async (req, res) => {
    try {
        const allUser = await users.find()
        if (allUser) {
            res.status(200).json(allUser);
        }
    } catch (error) {
        res.status(500).json(error)
        console.log("Error inside getAllEmployeeController", error)
    }
}