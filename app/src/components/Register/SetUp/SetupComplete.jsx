import { motion } from "framer-motion";

const SetupComplete = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-center w-24 h-24 bg-green-500 rounded-full"
      >
        ✅
      </motion.div>

      {/* Completion Text */}
      <h1 className="text-3xl font-bold mt-6">Setup Complete!</h1>
      <p className="text-gray-400 mt-2">Your CRM is now ready to use.</p>

      {/* Summary Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md w-96 text-left"
      >
        <h2 className="text-lg font-semibold text-white">🚀 Your Selections:</h2>
        <ul className="mt-3 text-gray-300 space-y-2">
          <li>✅ <b>Layout:</b> Sidebar Navigation</li>
          <li>🎨 <b>Theme:</b> Modern</li>
          <li>📊 <b>Workflow:</b> Custom Sales Funnel</li>
        </ul>
      </motion.div>

      {/* Finish Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-3 bg-blue-600 rounded-lg text-lg"
      >
        Go to Dashboard →
      </motion.button>
    </div>
  );
};

export default SetupComplete;
