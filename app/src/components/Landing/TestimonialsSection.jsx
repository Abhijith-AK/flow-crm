import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "../../utils/Constants";

const TestimonialsSection = () => {
    return (
        <section className="w-full bg-gray-900 py-24 text-white">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-5xl font-bold">What Our Users Say</h2>
                <p className="mt-5 text-xl text-gray-400 max-w-3xl mx-auto">
                    See how FlowCRM is helping businesses streamline their workflow and increase productivity.
                </p>

                <div className="mt-24 grid md:grid-cols-3 gap-12">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="relative bg-gray-800 p-10 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-lg mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Quote className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-blue-500 size-12" />
                            <p className="text-xl italic text-gray-300 mt-6">"{testimonial.quote}"</p>
                            <h4 className="mt-6 text-2xl font-semibold text-blue-400">{testimonial.name}</h4>
                            <p className="text-lg text-gray-400">{testimonial.company}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
