import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
            {/* Glowing Fog Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(72,0,128,0.2) 10%,rgba(0,0,0,0.9) 90%)] pointer-events-none"></div>

            {/* Floating Error Code */}
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="text-6xl font-extrabold text-red-600 drop-shadow-lg tracking-wider"
            >
                403
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="mt-4 text-lg text-gray-400 max-w-lg text-center"
            >
                Access denied. You do not have the necessary permissions to view this page.  
                If you believe this is an error, please log in or contact an administrator.
            </motion.p>

            {/* Call to Action Button */}
            <Link to="/login">
                <motion.button
                    whileHover={{ scale: 1.1, textShadow: "0px 0px 8px #ff0000" }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-6 px-6 py-3 rounded-lg bg-transparent border border-red-600 text-red-600 font-semibold shadow-md transition-all hover:bg-red-600 hover:text-white"
                >
                    Return to Login
                </motion.button>
            </Link>

            {/* Flickering Neon Glows */}
            <motion.div
                className="absolute top-10 left-10 w-32 h-32 bg-purple-500 opacity-10 blur-2xl rounded-full"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-40 h-40 bg-red-500 opacity-10 blur-2xl rounded-full"
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
            />

            {/* Floating Particles for Atmospheric Effect */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-red-500 rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `floatAnimation ${2 + Math.random() * 3}s infinite alternate ease-in-out`,
                    }}
                />
            ))}

            <style>
                {`
                @keyframes floatAnimation {
                    from { transform: translateY(0px); opacity: 0.3; }
                    to { transform: translateY(-20px); opacity: 0.7; }
                }
                `}
            </style>
        </div>
    );
};

export default Unauthorized;
