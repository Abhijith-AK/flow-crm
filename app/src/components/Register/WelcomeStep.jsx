import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setUserInfo } from "../../redux/slices/registerSlice";
import { motion } from "framer-motion";
import AuthImagePattern from "../../utils/Patterns/AuthImagePattern";
import { formValidator } from "../../utils/FormValidator";
import { registerVerifyEmailAPI } from "../../services/allAPI";
import { LoaderCircle } from "lucide-react";

const WelcomeStep = () => {
    const dispatch = useDispatch();
    const { name, email } = useSelector((state) => state.register);
    const [error, setError] = useState({
        name: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const validation = formValidator(name, value);

        setError((prev) => ({
            ...prev,
            [name]: validation.message,
        }));
        dispatch(setUserInfo({ [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validateName = formValidator("name", name);
        const validateEmail = formValidator("email", email);

        if (!validateName.validation || !validateEmail.validation) {
            setError({
                name: validateName.message,
                email: validateEmail.message,
            });
            return;
        }

        setLoading(true);
        const response = await registerVerifyEmailAPI({ email });
        setLoading(false);

        if (response.status === 200) {
            dispatch(nextStep());
        } else if (response.status === 401) {
            alert(response.response.data);
            console.log(response);
        }
    };

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
                        name="name"
                        className={`grow bg-gray-700 p-3 rounded-lg outline-none ${error.name ? "border-red-500" : ""}`}
                        placeholder="Daisy"
                        value={name}
                        onChange={handleChange}
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
                        name="email"
                        className={`grow bg-gray-700 p-3 rounded-lg outline-none ${error.email ? "border-red-500" : ""}`}
                        placeholder="daisy@site.com"
                        value={email}
                        onChange={handleChange}
                    />
                </motion.label>
                {error.email && <div className="text-red-500">{error.email}</div>}

                {/* Get Started Button */}
                <motion.button
                    type="submit"
                    disabled={loading || !name || !email || error.name || error.email}
                    className={`py-3 text-lg font-medium rounded-lg shadow-md flex gap-4 justify-center transition-all 
                    ${loading || !name || !email || error.name || error.email ? "bg-gray-500 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    Get Started {loading && <LoaderCircle className="animate-spin" size={30} />}
                </motion.button>
            </motion.form>
        </motion.div>
    );
};

export default WelcomeStep;
