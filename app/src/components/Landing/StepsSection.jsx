import { motion } from "framer-motion";
import { steps } from "../../utils/Constants";

const StepsSection = () => {
    return (
        <section className="w-full bg-gray-900 py-24 text-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-5xl font-bold">Getting Started with FlowCRM</h2>
                <p className="mt-5 text-xl text-gray-400 max-w-3xl mx-auto">
                    Follow these simple steps to set up FlowCRM and streamline your workflow.
                </p>

                <div className="mt-16 relative flex flex-col items-center">
                    <div className="w-1 bg-gray-500 absolute left-1/2 transform -translate-x-1/2 h-full"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className={`relative mt-16 flex w-full max-w-2xl items-center ${index % 2 === 0 ? "justify-start pr-10 text-right" : "justify-end pl-10 text-left"}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-500 rounded-full border-4 border-gray-900"></div>
                            <div className="w-5/12">
                                <div className="text-xl font-bold text-white">Step {index + 1}</div>
                                <h3 className="text-2xl font-semibold hover:text-blue-300 mt-2">{step.title}</h3>
                                <p className="text-gray-400 mt-2 hover:text-gray-300">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StepsSection;
