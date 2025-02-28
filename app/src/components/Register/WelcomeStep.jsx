import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setUserInfo } from "../../redux/slices/registerSlice";
import { motion } from "framer-motion";
import AuthImagePattern from "../../utils/Patterns/AuthImagePattern";
import { formValidator } from "../../utils/FormValidator";
import { registerVerifyEmailAPI } from "../../services/allAPI";
import { LoaderCircle } from "lucide-react"

const WelcomeStep = () => {
    const dispatch = useDispatch();
    const { name, email } = useSelector((state) => state.register)
    const [error, setError] = useState({
        name: "",
        email: ""
    })
    const [loading, setLoading] = useState(false)

    console.log(name, email)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validateName = formValidator("name", name);
        const validateEmail = formValidator("email", email);
        if (!validateName.validation || !validateEmail.validation) {
            setError({
                name: validateName.message,
                email: validateEmail.message
            })
            return
        }
        setLoading(true)
        const response = await registerVerifyEmailAPI({email})
        setLoading(false)
        if (response.status == 200) {
            dispatch(nextStep())
        } else if (response.status == 401) {
            alert(response.response.data)
            console.log(response)
            return
        } 
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-evenly w-full min-h-screen bg-gray-900 text-white"
        >
            {/* Animated Image Pattern */}
            <AuthImagePattern
                title="Welcome To The Team"
                subtitle="We are pleased to have you. Start your journey"
            />
            {/* Form Container */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gray-800 rounded-lg shadow-xl flex flex-col w-full m-3 md:m-0 md:max-w-[500px] space-y-6 px-6 py-8"
            >
                <h1 className="text-2xl font-bold">Register</h1>
                {/* Name Input */}
                <motion.label
                    className="input input-bordered flex items-center gap-2 text-gray-300"
                    whileFocus={{ scale: 1.05 }}
                    whileHover={{ scale: 1.02 }}
                >
                    Name
                    <input
                        type="text"
                        className="grow bg-gray-700 p-3 rounded-lg outline-none "
                        placeholder="Daisy"
                        value={name}
                        onChange={(e) => dispatch(setUserInfo({ name: e.target.value }))}
                    />
                </motion.label>
                {error.name && <div className="text-red-500">{error.name}</div>}
                {/* Email Input */}
                <motion.label
                    className="input input-bordered flex items-center gap-2 text-gray-300"
                    whileFocus={{ scale: 1.05 }}
                    whileHover={{ scale: 1.02 }}
                >
                    Email
                    <input
                        type="text"
                        className="grow bg-gray-700 p-3 rounded-lg outline-none"
                        placeholder="daisy@site.com"
                        name={email}
                        onChange={(e) => dispatch(setUserInfo({ email: e.target.value }))}
                    />
                </motion.label>
                {error.email && <div className="text-red-500">{error.email}</div>}
                {/* Get Started Button */}
                <motion.button
                    type="submit"
                    className="py-3 text-lg font-medium bg-blue-700 hover:bg-blue-800 rounded-lg shadow-md flex gap-4 justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    Get Started {
                        loading ? <LoaderCircle className="animate-spin" size={30} /> : null
                    }
                </motion.button>
            </motion.form>
        </motion.div>
    );
};

export default WelcomeStep;
