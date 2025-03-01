import { motion } from "framer-motion";
import { Computer, DollarSign, GraduationCap, Hospital, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { nextSetupStep, setName, setType } from "../../../redux/slices/setupSlice";
import { useState } from "react";
import { formValidator } from "../../../utils/FormValidator";

const BusinessType = () => {
  const { type, name } = useSelector((state) => state.setup);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const businessTypes = [
    { name: "Retail", icon: <ShoppingBag size={50} /> },
    { name: "IT Services", icon: <Computer size={50} /> },
    { name: "Healthcare", icon: <Hospital size={50} /> },
    { name: "Finance", icon: <DollarSign size={50} /> },
    { name: "Education", icon: <GraduationCap size={50} /> },
  ];

  const handleNameChange = (e) => {
    const value = e.target.value;
    const validation = formValidator("name", value);
    setError(validation.message);
    dispatch(setName(value));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-white w-full"
    >
      <h1 className="md:text-5xl font-bold my-3 text-center">Follow These Step by Step Process</h1>
      <h2 className="my-2 md:text-4xl text-center">To create your own platform.</h2>

      {/* Business Name Input */}
      <div className="my-10 w-[90%] md:text-2xl">
        <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-7 justify-center">
          <p>Company Name:</p>
          <input
            type="text"
            placeholder="Enter your company name"
            value={name}
            onChange={handleNameChange}
            className="input input-bordered w-full max-w-xs bg-white text-black px-3 py-2 rounded-lg"
          />
        </div>
          {error && <p className="text-yellow-300 text-sm mt-1 text-center font-bold">*{error}</p>}
      </div>

      {/* Step Title */}
      <h2 className="text-3xl font-semibold mb-6">Select Your Business Type</h2>

      {/* Business Type Options */}
      <div className="flex flex-wrap justify-center gap-5">
        {businessTypes.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center p-5 w-40 h-40 rounded-lg cursor-pointer transition-all ${type === item.name ? "bg-blue-600" : "hover:bg-blue-600 bg-gray-700"
              }`}
            onClick={() => dispatch(setType(item.name))}
          >
            <span className="text-3xl">{item.icon}</span>
            <p className="mt-2 text-lg">{item.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-10">
        <button
          onClick={() => dispatch(nextSetupStep())}
          disabled={!type || !name || error}
          className={`btn text-2xl px-4 py-2 border-none shadow-xl text-white transition-all ${type && name && !error ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"
            }`}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default BusinessType;
