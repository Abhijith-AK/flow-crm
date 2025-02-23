import { motion } from "framer-motion";
import { pricingFeatures, pricingPlans } from "../../utils/Constants";
import { Link } from "react-router";

const PricingSection = () => {
    return (
        <section id="pricing" className="w-full bg-gray-900 py-24 text-white">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-5xl font-bold">Choose the Perfect FlowCRM Plan</h2>
                <p className="mt-5 text-xl text-gray-400 max-w-3xl mx-auto">
                    Flexible pricing designed for businesses of all sizes. Get the best out of FlowCRM today.
                </p>

                <div className="mt-24 grid md:grid-cols-3 gap-12 relative xl:w-10/12 xl:mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`p-8 relative bg-gray-800 border rounded-xl shadow-xl md:p-10 text-left hover:shadow-2xl transition-transform duration-300 ${plan.title === "Gold" ? "scale-110 border-yellow-400" : "hover:scale-105"}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            {plan.title === "Gold" && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                    Popular
                                </div>
                            )}
                            <h3 className="text-3xl font-bold text-blue-400">{plan.title}</h3>
                            <p className="text-lg text-gray-400 mt-2">{plan.description}</p>
                            <div className="mt-5">
                                <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                                <span className="ms-3 text-lg text-gray-400">INR / monthly</span>
                            </div>
                            <div className="mt-5">
                                <ul className="space-y-3 text-lg">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-x-3 text-green-400">
                                            ✔ {feature}
                                        </li>
                                    ))}
                                    {plan.excluded.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-x-3 text-gray-500">
                                            ✖ {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link to="/register">
                                <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all w-full">
                                    Get Started
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Table */}
                <div className="mt-16 max-w-6xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-bold text-white text-center mb-6">Compare FlowCRM Plans</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-white overflow-hidden">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="py-4 px-6">Features</th>
                                    <th className="py-4 px-6 text-center">Free</th>
                                    <th className="py-4 px-6 text-center">Gold</th>
                                    <th className="py-4 px-6 text-center">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pricingFeatures.map((row, index) => (
                                    <motion.tr
                                        key={index}
                                        className="border-b border-gray-700 hover:bg-gray-700/40 transition-colors duration-200"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <td className="py-4 px-6 text-gray-300">{row.feature}</td>
                                        <td className="py-4 px-6 text-center">{row.free}</td>
                                        <td className="py-4 px-6 text-center">{row.gold}</td>
                                        <td className="py-4 px-6 text-center">{row.enterprise}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
