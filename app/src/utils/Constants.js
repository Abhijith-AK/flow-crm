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

export const themes = [
    {
        name: "Corporate Blue",
        background: "#E3E8EF", // Softer blue-gray instead of bright white
        navbar: {
            background: "#1E3A8A",
            text: "#FFFFFF",
            accent: "#2563EB",
            links: {
                background: "#233E94", // Slightly darker shade for contrast
                hover: "#2563EB"
            }
        },
        card: {
            background: "#FFFFFF",
            text: "#1E293B",
            border: "#CBD5E1",
            textColor: "#334155"
        },
        text: {
            primary: "#1E293B",
            secondary: "#64748B"
        }
    },
    {
        name: "Elegant Dark",
        background: "#121417", // Darker background for better depth
        navbar: {
            background: "#1F2937",
            text: "#FFFFFF",
            accent: "#4F46E5",
            links: {
                background: "#2C3B55", // Darker shade for contrast
                hover: "#4F46E5"
            }
        },
        card: {
            background: "#1C1E22", // Darker than navbar for distinction
            text: "#FFFFFF",
            border: "#4F46E5",
            textColor: "#E5E7EB"
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#D1D5DB"
        }
    },
    {
        name: "Neutral Gray",
        background: "#E8ECEF", // Slight gray tint for card contrast
        navbar: {
            background: "#475569",
            text: "#F8FAFC",
            accent: "#2563EB",
            links: {
                background: "#5A6875", // Slight contrast for better readability
                hover: "#2563EB"
            }
        },
        card: {
            background: "#FFFFFF",
            text: "#1E293B",
            border: "#D1D5DB",
            textColor: "#334155"
        },
        text: {
            primary: "#1E293B",
            secondary: "#64748B"
        }
    },
    {
        name: "Modern Slate",
        background: "#DADFE5", // Subtle slate gray for contrast
        navbar: {
            background: "#334155",
            text: "#FFFFFF",
            accent: "#64748B",
            links: {
                background: "#3F4E64", // Muted slate tone for balance
                hover: "#64748B"
            }
        },
        card: {
            background: "#F4F6F9", // Softer than pure white for distinction
            text: "#1E293B",
            border: "#B0B7C3",
            textColor: "#334155"
        },
        text: {
            primary: "#1E293B",
            secondary: "#64748B"
        }
    }
];

