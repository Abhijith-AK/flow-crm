import { motion } from "framer-motion";
import { Link } from "react-router";

const Pnf = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900">

            {/* Subtle Noise Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10 pointer-events-none"></div>

            {/* Floating Mascot Animation */}
            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-48"
            >
            </motion.div>

            {/* Glassmorphism Card */}
            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="bg-white/80 backdrop-blur-lg shadow-xl rounded-lg p-10 max-w-lg text-center"
            >
                {/* Animated 404 */}
                <motion.h1
                    className="text-[6rem] font-extrabold tracking-wide"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1.05 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                >
                    404
                </motion.h1>
                <p className="text-lg text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>

                {/* Return Home Button */}
                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#2563eb", color: "#fff" }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold shadow-lg transition-all"
                    >
                        Go Home
                    </motion.button>
                </Link>
            </motion.div>

            {/* Floating Blobs */}
            <motion.div
                className="absolute top-20 left-20 w-32 h-32 bg-blue-400 opacity-40 rounded-full"
                animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-40 h-40 bg-pink-400 opacity-30 rounded-full"
                animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
            />
        </div>
    );
};

export default Pnf;
