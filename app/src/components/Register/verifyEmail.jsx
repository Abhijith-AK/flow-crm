import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../../redux/slices/registerSlice";
import { motion } from "framer-motion";

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.register);
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [resendDisabled, setResendDisabled] = useState(false);

    // Handle OTP Input
    const handleChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
        }
    };

    // Handle Resend
    const handleResend = () => {
        setResendDisabled(true);
        setTimeout(() => setResendDisabled(false), 30000); // Re-enable in 30s
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center text-center bg-gray-800 p-8 rounded-lg shadow-lg w-[450px]"
        >
            <motion.h1
                className="text-2xl font-semibold text-gray-100"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Verify Your Email
            </motion.h1>
            <motion.p
                className="text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                We’ve sent a code to <span className="font-semibold text-gray-300">{email}</span>
            </motion.p>

            {/* OTP Input */}
            <motion.div
                className="flex justify-center space-x-3 mt-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {code.map((digit, index) => (
                    <motion.input
                        key={index}
                        type="text"
                        value={digit}
                        maxLength="1"
                        onChange={(e) => handleChange(index, e.target.value)}
                        className="w-12 h-12 text-center text-lg font-semibold bg-gray-700 border border-gray-600 rounded-lg outline-none focus:border-blue-500"
                        whileFocus={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                ))}
            </motion.div>

            {/* Verify Button */}
            <motion.button
                onClick={() => dispatch(nextStep())}
                className="mt-6 w-full py-3 bg-blue-700 hover:bg-blue-800 text-lg font-medium rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                Verify
            </motion.button>

            {/* Resend Code */}
            <motion.button
                onClick={handleResend}
                disabled={resendDisabled}
                className={`mt-3 text-sm ${resendDisabled ? "text-gray-500 cursor-not-allowed" : "text-blue-400 hover:underline"}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                {resendDisabled ? "Wait 30s to Resend" : "Resend Code"}
            </motion.button>

            {/* Go Back */}
            <motion.button
                onClick={() => dispatch(prevStep())}
                className="mt-4 text-sm text-gray-300 hover:underline"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                Go Back
            </motion.button>
        </motion.div>
    );
};

export default VerifyEmail;
