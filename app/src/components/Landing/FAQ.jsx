import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
    { question: "What is FlowCRM?", answer: "FlowCRM is a customer relationship management tool designed to help businesses streamline their operations, track leads, and enhance customer interactions." },
    { question: "Is there a free trial available?", answer: "Yes, we offer a 14-day free trial with access to all premium features so you can explore the full potential of FlowCRM before committing." },
    { question: "Can I change my plan later?", answer: "Absolutely! You can upgrade or downgrade your plan anytime from your account settings without losing data." },
    { question: "Is my data secure with FlowCRM?", answer: "Yes, we prioritize security by using end-to-end encryption and secure cloud storage to keep your business data safe." },
    { question: "Do you offer customer support?", answer: "Yes, our support team is available 24/7 to assist you with any queries or issues you may have." }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-gray-900 py-24 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>
                <p className="mt-5 text-xl text-gray-400 max-w-3xl mx-auto">
                    Have questions? We've got answers! Here are some of the most common queries about FlowCRM.
                </p>

                <div className="mt-24 space-y-6 text-left">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-lg">
                            <button
                                className="w-full flex justify-between items-center text-xl font-semibold text-white focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <span>{activeIndex === index ? "−" : "+"}</span>
                            </button>
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: activeIndex === index ? "auto" : 0, opacity: activeIndex === index ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden text-gray-400 mt-2"
                            >
                                {activeIndex === index && <p> {faq.answer}</p>}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
