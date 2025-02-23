import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

const BusinessType = () => {
  const dispatch = useDispatch();
  const businessTypes = [
    { name: "Retail", icon: "🛍️" },
    { name: "IT Services", icon: "💻" },
    { name: "Healthcare", icon: "🏥" },
    { name: "Finance", icon: "💰" },
    { name: "Education", icon: "🎓" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-white"
    >
      {/* Step Title */}
      <h2 className="text-3xl font-semibold mb-6">Select Your Business Type</h2>

      {/* Business Type Options */}
      <div className="flex gap-5">
        {businessTypes.map((type, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center p-5 w-40 h-40 bg-gray-800 hover:bg-blue-600 transition-all rounded-lg cursor-pointer"
          >
            <span className="text-3xl">{type.icon}</span>
            <p className="mt-2 text-lg">{type.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        onClick={() => dispatch(nextStep())}
        whileHover={{ scale: 1.05 }}
        className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-800 rounded-lg text-lg font-medium shadow-md"
      >
        Next →
      </motion.button>
    </motion.div>
  );
};

export default BusinessType;
