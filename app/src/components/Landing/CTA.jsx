import { motion } from "framer-motion";
import { Link } from "react-router";

const CTA = () => {
    return (
        <section className="w-full py-24 text-white bg-gradient-to-t from-gray-900 to-gray-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-5xl font-bold">Get Started with FlowCRM Today!</h2>
                <p className="mt-5 text-xl text-gray-200 max-w-3xl mx-auto">
                    Take your business to the next level with our powerful CRM solutions. Sign up now and boost your productivity!
                </p>
                <Link to="/register">
                    <motion.button
                        className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started Now
                    </motion.button>
                </Link>
            </div>
        </section>
    );
};

export default CTA;
