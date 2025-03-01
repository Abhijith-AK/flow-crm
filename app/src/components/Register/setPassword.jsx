import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { nextStep, setUserInfo } from "../../redux/slices/registerSlice";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { formValidator } from "../../utils/FormValidator";

const SetPassword = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

    const validateFields = () => {
        const passwordValidation = formValidator("password", password);
        const confirmPasswordValidation =
            password === confirmPassword
                ? { validation: true, message: "" }
                : { validation: false, message: "Passwords do not match" };

        setErrors({
            password: passwordValidation.message,
            confirmPassword: confirmPasswordValidation.message,
        });

        return passwordValidation.validation && confirmPasswordValidation.validation;
    };

    useEffect(() => {
        validateFields()
    }, [confirmPassword])

    const handleNext = () => {
        if (validateFields()) {
            dispatch(setUserInfo({ password }));
            dispatch(nextStep());
        }
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
                Set Your Password
            </motion.h1>

            {/* Password Input */}
            <motion.div className="relative w-full mt-6">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:border-blue-500"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div className="relative w-full mt-4">
                <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:border-blue-500"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 text-gray-400 hover:text-gray-200"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </motion.div>

            {/* Confirm Button */}
            <motion.button
                onClick={handleNext}
                className={`mt-6 w-full py-3 text-lg font-medium rounded-lg 
                ${password && confirmPassword && errors.password === "" && errors.confirmPassword === ""
                        ? "bg-blue-700 hover:bg-blue-800"
                        : "bg-gray-600 cursor-not-allowed"}`}
                disabled={!password || !confirmPassword || errors.password || errors.confirmPassword}
                whileHover={password && confirmPassword && !errors.password && !errors.confirmPassword ? { scale: 1.05 } : {}}
                transition={{ duration: 0.2 }}
            >
                Confirm
            </motion.button>
        </motion.div>
    );
};

export default SetPassword;
