import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import AuthImagePattern from "../utils/Patterns/AuthImagePattern";
import { Link } from "react-router";

const Login = () => {
  


    return (
        <div
            className="relative flex items-center px-8 justify-evenly min-h-screen bg-gray-900 text-white overflow-hidden"
        >
            <AuthImagePattern
                title={"Welcome back!"}
                subtitle={"Sign in to continue to your dashboard and catch up with your tasks."}
            />

            {/* Login Content */}
            <div className="relative z-10 p-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl text-center mb-4">Welcome Back!</h1>
                <input
                    type="email"
                    className="w-full p-3 bg-gray-700 rounded-lg text-white mb-4"
                    placeholder="Email"
                />
                <input
                    type="password"
                    className="w-full p-3 bg-gray-700 rounded-lg text-white mb-4"
                    placeholder="Password"
                />
                <button className="w-full p-3 bg-blue-600 rounded-lg text-lg hover:bg-blue-700">
                    Login
                </button>
                <p className="mt-4 text-gray-300 text-center">Don't have an account? <br className="md:hidden" /> <Link className="text-blue-300 hover:text-blue-400" to="/register">Register Your Company Now!!</Link></p>
            </div>
        </div>
    );
};

export default Login;
