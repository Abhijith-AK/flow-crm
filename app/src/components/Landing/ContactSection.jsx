import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
    return (
        <section id="contact" className="w-full py-24 text-white bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-5xl font-bold">Let's Connect</h2>
                        <p className="mt-5 text-xl text-gray-400">
                            Have questions or need support? Reach out and we'll assist you promptly.
                        </p>
                        <div className="mt-8 space-y-6">
                            <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6 text-blue-400" />
                                <span className="text-lg text-gray-300">support@flowcrm.com</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6 text-blue-400" />
                                <span className="text-lg text-gray-300">+1 (234) 567-890</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="w-6 h-6 text-blue-400" />
                                <span className="text-lg text-gray-300">123 FlowCRM Street, Business City</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        className="bg-gray-800 p-8 rounded-xl shadow-lg"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-semibold text-white">Send Us a Message</h3>
                        <form className="mt-6 space-y-5">
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Name"
                            />
                            <input
                                type="email"
                                className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Email"
                            />
                            <textarea
                                rows="4"
                                className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Message"
                            ></textarea>
                            <motion.button
                                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
