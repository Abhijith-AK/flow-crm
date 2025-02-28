import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { assignManagerAPI, createCRMAPI, registerManagerAPI } from "../../../services/allAPI";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, PartyPopperIcon, Slash } from "lucide-react";

const SetupComplete = () => {
  const hasRun = useRef(false);
  const { name, email, password } = useSelector((state) => state.register);
  const { name: buisnessName, type, workflow, layout, theme } = useSelector((state) => state.setup);
  const [loadingMessage, setLoadingMessage] = useState("Initializing Registration Process");
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const setUp = async () => {
    const id = await registerManager();
    if (id) {
      const crmId = await createCRM(id);
      if (crmId) {
        await assigningCRM(crmId, id);
      }
    }
  };

  const registerManager = async () => {
    if (name && email && password) {
      const reqBody = { name, email, password };
      try {
        const response = await registerManagerAPI(reqBody);
        if (response.status == 201) {
          console.log("Registration done");
          setLoadingMessage("Registered Successfully");
          return response.data._id;
        } else {
          setLoadingMessage("An Unexpected Error occurred while Registering.. Try Again");
          console.log(response);
          setTimeout(() => navigate(0), 2000);
        }
      } catch (error) {
        console.error("Error:", error.message);
        setLoadingMessage("An error occurred. Please try again.");
        setTimeout(() => navigate(0), 2000);
      }
    } else {
      alert("Unauthorized: Please fill all the data");
    }
  };

  const createCRM = async (id) => {
    setLoadingMessage("Creating Your CRM...");
    if (buisnessName && type && workflow && layout && theme) {
      const reqBody = { name: buisnessName, type, workflows: workflow, layout: layout.name, theme, createdBy: id };
      try {
        const response = await createCRMAPI(reqBody);
        if (response.status == 201) {
          console.log("CRM creation done");
          setLoadingMessage("CRM Created Successfully");
          return response.data._id;
        } else {
          setLoadingMessage("An Unexpected Error occurred while Creating.. Try Again!");
          console.log(response);
          setTimeout(() => navigate(0), 2000);
        }
      } catch (error) {
        console.error("Error:", error.message);
        setLoadingMessage("An error occurred. Please try again.");
        setTimeout(() => navigate(0), 2000);
      }
    } else {
      alert("Unauthorized: Please fill all the data");
    }
  };

  const assigningCRM = async (crmId, managerId) => {
    setLoadingMessage("Assigning Your CRM...");
    const reqBody = { crmId, managerId };
    try {
      const response = await assignManagerAPI(reqBody);
      if (response.status == 201) {
        console.log("CRM assigned successfully");
        setLoadingMessage("CRM Assigned Successfully");
        setTimeout(() => setLoaded(true), 1500);
      } else {
        setLoadingMessage("An Unexpected Error occurred while Assigning.. Try Again!");
        console.log(response);
        setTimeout(() => navigate(0), 2000);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setLoadingMessage("An error occurred. Please try again.");
      setTimeout(() => navigate(0), 2000);
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      setUp();
      hasRun.current = true;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      {loaded ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-10 rounded-lg shadow-lg text-center"
        >
          <h1 className="text-4xl font-bold flex gap-2 text-green-400"><CheckCircle size={40} /> Registration Completed!</h1>
          <p className="text-lg text-gray-300 mt-4">Your CRM has been successfully created.</p>
          <p className="text-gray-400">Kindly login to proceed to your dashboard.</p>
          <Link
            to="/login"
            className="mt-6 inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Go to Login
          </Link>
        </motion.div>
      ) : (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="text-3xl text-blue-300 flex items-center gap-3"
        >
          {loadingMessage} <Slash className="animate-spin" size={35} />
        </motion.h1>
      )}
    </div>
  );
};

export default SetupComplete;
