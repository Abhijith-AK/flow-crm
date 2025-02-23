import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { features } from "../../utils/Constants";
import { ArrowBigUpDash } from "lucide-react";


const FeaturesSection = () => {
    const handleMouseMove = (e, ref) => {
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        ref.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(59, 130, 246, 0.3), transparent 70%)`;
    };

    const handleMouseLeave = (ref) => {
        ref.current.style.background = "";
    };
    return (
        <section id="features" className="w-full bg-gray-900 py-16 text-white">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">Why Choose FlowCRM?</h2>
                    <p className="mt-3 text-lg text-gray-400">
                        Powerful features to streamline your business workflow.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Features List */}
                    <div className="grid gap-8">
                        {
                           features.map(
                                (feature, index) => {
                                    const cardRef = useRef(null);
                                    return (
                                        <motion.div
                                            key={index}
                                            ref={cardRef}
                                            className="p-6 bg-gray-800 rounded-lg flex items-center gap-4 relative overflow-hidden transition-all duration-300 hover:scale-105"
                                            onMouseMove={(e) => handleMouseMove(e, cardRef)}
                                            onMouseLeave={() => handleMouseLeave(cardRef)}
                                        >
                                            <feature.icon className="text-blue-500 size-10" />
                                            <div>
                                                <h3 className="text-2xl font-semibold text-blue-500">{feature.title}</h3>
                                                <p className="mt-2 text-gray-400">{feature.desc}</p>
                                            </div>
                                        </motion.div>
                                    );
                                }
                            )
                        }
                    </div>

                    {/* Dashboard Image Preview */}
                    <div className="relative">
                        <img
                            src="/images/dashboard-preview.webp"
                            alt="FlowCRM Dashboard Preview"
                            className="rounded-lg shadow-lg border border-gray-700"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;