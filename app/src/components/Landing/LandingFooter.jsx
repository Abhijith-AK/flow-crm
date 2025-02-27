import { Facebook, Twitter, Linkedin } from "lucide-react";

const LandingFooter = () => {
    return (
        <footer className="w-full bg-gradient-to-t from-black to-gray-900 text-white py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap md:flex-nowrap justify-between items-start text-center md:text-left">
                {/* Company Info */}
                <div className="max-w-48">
                    <h3 className="text-3xl font-bold">FlowCRM</h3>
                    <p className="mt-3 text-gray-400">Simplifying your business operations with intuitive CRM solutions.</p>
                </div>

                {/* Navigation */}
                <div>
                    <h4 className="text-xl font-semibold">Quick Links</h4>
                    <ul className="mt-3 space-y-2 text-gray-400">
                        <li><a href="#h" className="hover:text-white">Get Started</a></li>
                        <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                        <li><a href="#features" className="hover:text-white">Features</a></li>
                        <li><a href="#contact" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h4 className="text-xl font-semibold">Follow Us</h4>
                    <div className="mt-3 flex justify-center md:justify-start space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white"><Facebook className="w-6 h-6" /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><Twitter className="w-6 h-6" /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><Linkedin className="w-6 h-6" /></a>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} FlowCRM. All rights reserved.
            </div>
        </footer>
    );
};

export default LandingFooter;
