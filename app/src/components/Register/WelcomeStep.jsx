import React from "react";
import { useDispatch } from "react-redux";
import { nextStep } from "../../redux/slices/registerSlice";
import { motion } from "framer-motion";
import AuthImagePattern from "../../utils/Patterns/AuthImagePattern";

const WelcomeStep = () => {
    const dispatch = useDispatch();

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
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gray-800 rounded-lg shadow-xl flex flex-col w-[50vh] space-y-6 px-6 py-8"
            >
                {/* Name Input */}
                <motion.label
                    className="input input-bordered flex items-center gap-2 text-gray-300"
                    whileFocus={{ scale: 1.05 }}
                    whileHover={{ scale: 1.02 }}
                >
                    Name
                    <input
                        type="text"
                        className="grow bg-gray-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Daisy"
                    />
                </motion.label>

                {/* Email Input */}
                <motion.label
                    className="input input-bordered flex items-center gap-2 text-gray-300"
                    whileFocus={{ scale: 1.05 }}
                    whileHover={{ scale: 1.02 }}
                >
                    Email
                    <input
                        type="text"
                        className="grow bg-gray-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="daisy@site.com"
                    />
                </motion.label>

                {/* Get Started Button */}
                <motion.button
                    onClick={() => dispatch(nextStep())}
                    className="py-3 text-lg font-medium bg-blue-700 hover:bg-blue-800 rounded-lg shadow-md"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    Get Started
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default WelcomeStep;
