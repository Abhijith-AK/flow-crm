import { Briefcase, Users, BarChart3 } from "lucide-react";

export const testimonials = [
    { name: "Alice Johnson", company: "TechCorp", quote: "FlowCRM made our processes seamless and efficient!" },
    { name: "Mark Lee", company: "FinSolutions", quote: "An indispensable tool for our sales and support teams." },
    { name: "Sophia Patel", company: "BizGrow", quote: "Real-time collaboration has never been easier!" }
]

export const features = [
    { icon: Briefcase, title: "Custom Workflows", desc: "Automate tasks and optimize your processes with ease." },
    { icon: Users, title: "Real-time Collaboration", desc: "Enhance team communication with built-in messaging tools." },
    { icon: BarChart3, title: "Advanced Analytics", desc: "Gain insights with powerful reports and dashboards." }
]

export const pricingPlans = [
    { title: "Free", price: "₹0", description: "Great for freelancers & individuals.", features: ["Up to 5 User", "Custom Workflows", "Basic CRM Features", "Email Support"], excluded: ["Advanced Analytics"] },
    { title: "Gold", price: "₹1499.99", description: "Ideal for growing teams.", features: ["Up to 18 Users", "Custom Workflows", "Priority Email Support"], excluded: ["API Access", "Dedicated Account Manager"] },
    { title: "Enterprise", price: "₹4999.99", description: "For enterprises that need full control.", features: ["Unlimited Users", "Full API Access", "24/7 Dedicated Support", "Custom Workflows"], excluded: [] }
]

export const pricingFeatures = [
    { feature: "Users", free: "5", gold: "10", enterprise: "Unlimited" },
    { feature: "Custom Workflows", free: "✔", gold: "✔", enterprise: "✔" },
    { feature: "API Access", free: "✖", gold: "✖", enterprise: "✔" },
    { feature: "24/7 Support", free: "Email", gold: "Priority Email", enterprise: "Dedicated" }
]

export const steps = [
    { title: "Sign Up & Create Account", description: "Register for FlowCRM and set up your business profile in minutes." },
    { title: "Customize Your Dashboard", description: "Tailor your CRM experience by selecting widgets and preferred layout." },
    { title: "Set Up Custom Workflows", description: "Automate tasks, create pipelines, and define your workflow stages." },
    { title: "Invite Team Members", description: "Collaborate by adding team members and assigning roles & permissions." },
    { title: "Track Leads & Manage Tasks", description: "Monitor leads, close deals, and manage tasks efficiently." }
];

export const faqs = [
    { question: "What is FlowCRM?", answer: "FlowCRM is a customer relationship management tool designed to help businesses streamline their operations, track leads, and enhance customer interactions." },
    { question: "Is there a free trial available?", answer: "Yes, we offer a 14-day free trial with access to all premium features so you can explore the full potential of FlowCRM before committing." },
    { question: "Can I change my plan later?", answer: "Absolutely! You can upgrade or downgrade your plan anytime from your account settings without losing data." },
    { question: "Is my data secure with FlowCRM?", answer: "Yes, we prioritize security by using end-to-end encryption and secure cloud storage to keep your business data safe." },
    { question: "Do you offer customer support?", answer: "Yes, our support team is available 24/7 to assist you with any queries or issues you may have." }
];