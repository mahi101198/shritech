
import {
    Bot,
    MessageSquare,
    BrainCircuit,
    ScanLine,
    Layout,
    Smartphone,
    Cpu,
    GraduationCap,
    Terminal,
    Workflow,
    LucideIcon
} from "lucide-react";

export interface ServiceData {
    id: string;
    title: string;
    subtitle: string;
    shortDescription: string;
    fullDescription: string;
    features: string[]; // Keeping for backward compatibility
    detailedFeatures: {
        title: string;
        description: string;
        icon: string; // Mapping string to icon in component
    }[];
    capabilities: {
        text: string;
        icon: string;
    }[];
    stats: { label: string; value: string }[];
    iconName: string;
    gradient: string;
    color: string;
}

export const servicesData: ServiceData[] = [
    {
        id: "ai-agents",
        title: "AI Agents",
        subtitle: "Autonomous Reasoning",
        shortDescription: "Autonomous reasoning agents that plan, execute, and adapt.",
        fullDescription: "We build autonomous AI agents capable of reasoning through complex problems, planning multi-step workflows, and executing tasks without constant human oversight. From researching market trends to autonomous code generation, our agents act as intelligent extensions of your workforce.",
        features: ["24/7 Autonomous Operation", "Complex Reasoning", "Multi-step Tasks", "Self-Correcting"],
        detailedFeatures: [
            {
                title: "Intelligent Automation",
                description: "AI agents that learn and adapt to your business processes with unprecedented accuracy.",
                icon: "Brain"
            },
            {
                title: "Natural Conversations",
                description: "Advanced NLP for human-like interactions with context and sentiment understanding.",
                icon: "MessageSquare"
            },
            {
                title: "Data Intelligence",
                description: "Seamlessly integrate and unlock insights from all your business data sources.",
                icon: "Database"
            },
            {
                title: "Custom Workflows",
                description: "Bespoke automation workflows designed for your unique business needs.",
                icon: "Workflow"
            }
        ],
        capabilities: [
            { icon: "Zap", text: "Real-time Processing" },
            { icon: "Target", text: "Goal-Oriented" },
            { icon: "TrendingUp", text: "Self-Learning" },
            { icon: "Shield", text: "Enterprise Security" }
        ],
        stats: [
            { label: "Efficiency", value: "10x" },
            { label: "Uptime", value: "24/7" },
            { label: "Autonomy", value: "100%" }
        ],
        iconName: "Bot",
        gradient: "from-emerald-500 to-cyan-600",
        color: "text-emerald-600"
    },
    {
        id: "chatbots",
        title: "Intelligent Chatbots",
        subtitle: "Conversational AI",
        shortDescription: "24/7 support with human-like understanding.",
        fullDescription: "Go beyond simple script-based bots. Our intelligent chatbots perform semantic understanding of user queries, maintain context over long conversations, and integrate directly with your CRM.",
        features: ["Natural Language", "Seamless Handoff", "Multi-channel", "CRM Integration"],
        detailedFeatures: [
            {
                title: "Contextual Memory",
                description: "Remembers extensive conversation history for personalized interactions.",
                icon: "Brain"
            },
            {
                title: "Sentiment Analysis",
                description: "Detects customer emotions and escalates urgent issues automatically.",
                icon: "MessageSquare"
            },
            {
                title: "Omnichannel Support",
                description: "Deploys consistent support across Web, WhatsApp, Telegram, and Slack.",
                icon: "Smartphone"
            },
            {
                title: "Instant Handoff",
                description: "Seamlessly transfers complex queries to human agents with full context.",
                icon: "Workflow"
            }
        ],
        capabilities: [
            { icon: "Zap", text: "Instant Replies" },
            { icon: "Target", text: "Intent Detection" },
            { icon: "TrendingUp", text: "Analytics" },
            { icon: "Shield", text: "PII Protection" }
        ],
        stats: [
            { label: "Response", value: "<1s" },
            { label: "Resolution", value: "85%" },
            { label: "CSAT", value: "4.8/5" }
        ],
        iconName: "MessageSquare",
        gradient: "from-green-500 to-emerald-600",
        color: "text-green-500"
    },
    {
        id: "nlp-rag",
        title: "NLP & RAG Systems",
        subtitle: "Context-Aware Intelligence",
        shortDescription: "Advanced text analysis & retrieval-augmented generation.",
        fullDescription: "Unlock the value in your documents. We implement Retrieval-Augmented Generation (RAG) pipelines that allow AI to answer questions based on your private enterprise data with high accuracy.",
        features: ["Semantic Search", "Document Q&A", "Summarization", "Data Security"],
        detailedFeatures: [
            {
                title: "Semantic Search",
                description: "Finds information by meaning rather than just keyword matching.",
                icon: "Brain"
            },
            {
                title: "Document Q&A",
                description: "Chat directly with your PDFs, Word docs, and wikis securely.",
                icon: "MessageSquare"
            },
            {
                title: "Auto-Summarization",
                description: "Condenses lengthy reports into executive summaries instantly.",
                icon: "Database"
            },
            {
                title: "Data Pipelines",
                description: "Automated ingestion and vectorization of your data sources.",
                icon: "Workflow"
            }
        ],
        capabilities: [
            { icon: "Zap", text: "Fast Retrieval" },
            { icon: "Target", text: "High Accuracy" },
            { icon: "TrendingUp", text: "Scalable" },
            { icon: "Shield", text: "Private Data" }
        ],
        stats: [
            { label: "Accuracy", value: "99%" },
            { label: "Retrieval", value: "ms" },
            { label: "Documents", value: "∞" }
        ],
        iconName: "BrainCircuit",
        gradient: "from-purple-500 to-pink-600",
        color: "text-purple-500"
    },
    {
        id: "ocr-extraction",
        title: "OCR & Doc Extraction",
        subtitle: "Data Digitization",
        shortDescription: "Automated data entry from files.",
        fullDescription: "Stop manual data entry. Our computer vision and OCR models extract structured data (invoices, receipts, ID cards) from unstructured PDFs and images with extremely high accuracy.",
        features: ["High-Accuracy", "Handwriting Rec", "Table Parsing", "Auto Validation"],
        detailedFeatures: [
            {
                title: "Intelligent Extraction",
                description: "Understand layout and context to extract fields accurately.",
                icon: "ScanLine"
            },
            {
                title: "Handwriting Recognition",
                description: "Deciphers handwritten notes and forms with high precision.",
                icon: "Brain"
            },
            {
                title: "Table Reconstruction",
                description: "Converts PDF tables into structured Excel or database formats.",
                icon: "Database"
            },
            {
                title: "Validation Workflows",
                description: "Automated checks to ensure data integrity before ingestion.",
                icon: "Workflow"
            }
        ],
        capabilities: [
            { icon: "Zap", text: "Real-time OCR" },
            { icon: "Target", text: "Field Mapping" },
            { icon: "TrendingUp", text: "High Volume" },
            { icon: "Shield", text: "Secure Upload" }
        ],
        stats: [
            { label: "Accuracy", value: "99.8%" },
            { label: "Speed", value: "2s/pg" },
            { label: "Savings", value: "80%" }
        ],
        iconName: "ScanLine",
        gradient: "from-orange-500 to-red-600",
        color: "text-orange-500"
    },
    {
        id: "website-dev",
        title: "Modern Web Dev",
        subtitle: "High-Performance UI/UX",
        shortDescription: "High-performance Next.js web applications.",
        fullDescription: "We build stunning, high-performance web applications using the latest tech stack (Next.js, React, Tailwind). Our focus is on speed, SEO, and converting visitors into customers.",
        features: ["Blazing Fast", "SEO Optimized", "Responsive", "Interactive 3D"],
        detailedFeatures: [
            {
                title: "Next.js Architecture",
                description: "Server-side rendering for ultra-fast load times and SEO.",
                icon: "Layout"
            },
            {
                title: "3D Visuals",
                description: "Immersive WebGL experiences using Three.js and Framer Motion.",
                icon: "Brain"
            },
            {
                title: "Modern UI/UX",
                description: "Pixel-perfect, responsive designs that look great on any device.",
                icon: "Smartphone"
            },
            {
                title: "CMS Integration",
                description: "Easy content management with Sanity, Contentful, or Strapi.",
                icon: "Database"
            }
        ],
        capabilities: [
            { icon: "Zap", text: "Core Web Vitals" },
            { icon: "Target", text: "Conversion" },
            { icon: "TrendingUp", text: "SEO Growth" },
            { icon: "Shield", text: "SSL/Security" }
        ],
        stats: [
            { label: "Lighthouse", value: "100" },
            { label: "Load Time", value: "<1s" },
            { label: "SEO Score", value: "100" }
        ],
        iconName: "Layout",
        gradient: "from-cyan-500 to-blue-600",
        color: "text-cyan-500"
    },
    {
        id: "mobile-apps",
        title: "Mobile App Development",
        subtitle: "Native & Cross-Platform",
        shortDescription: "Native iOS & Android solutions.",
        fullDescription: "Reach your customers on their device. We develop cross-platform mobile apps using React Native and Flutter that offer near-native performance and a cohesive experience.",
        features: ["Cross-Platform", "Native Speed", "Offline Mode", "App Store Opt"],
        detailedFeatures: [
            {
                title: "Cross-Platform",
                description: "One codebase for both iOS and Android, reducing dev time.",
                icon: "Smartphone"
            },
            {
                title: "Native Performance",
                description: "Smooth 60fps animations and native module integration.",
                icon: "Zap"
            },
            {
                title: "Offline Sync",
                description: "Robust local databases that sync when connection returns.",
                icon: "Database"
            },
            {
                title: "Push Notifications",
                description: "Engage users with targeted, rich-media push campaigns.",
                icon: "MessageSquare"
            }
        ],
        capabilities: [
            { icon: "Zap", text: "Fast Launch" },
            { icon: "Target", text: "User Retention" },
            { icon: "TrendingUp", text: "Growth" },
            { icon: "Shield", text: "App Store Ready" }
        ],
        stats: [
            { label: "Platforms", value: "iOS/And" },
            { label: "Code Share", value: "90%" },
            { label: "Performance", value: "60FPS" }
        ],
        iconName: "Smartphone",
        gradient: "from-rose-500 to-pink-600",
        color: "text-rose-500"
    },
    {
        id: "machine-learning",
        title: "Machine Learning Solutions",
        subtitle: "Predictive Analytics",
        shortDescription: "Predictive analytics & classification models.",
        fullDescription: "Leverage the power of data. We build custom machine learning models for predictive analytics, customer churn prediction, recommendation engines, and anomaly detection.",
        features: ["Predictive", "Recommendations", "Patterns", "Clustering"],
        detailedFeatures: [
            {
                title: "Predictive Modeling",
                description: "Forecast sale trends and inventory needs with precision.",
                icon: "Brain"
            },
            {
                title: "Recommendation Engines",
                description: "Personalized product suggestions to boost sales.",
                icon: "Target"
            },
            {
                title: "Anomaly Detection",
                description: "Identify fraud or defects automatically in real-time.",
                icon: "Shield"
            },
            {
                title: "Customer Segmentation",
                description: "Cluster users by behavior for targeted marketing.",
                icon: "Database"
            }
        ],
        capabilities: [
            { icon: "Zap", text: "Fast Inference" },
            { icon: "Target", text: "High Precision" },
            { icon: "TrendingUp", text: "Data Driven" },
            { icon: "Shield", text: "Robustness" }
        ],
        stats: [
            { label: "Precision", value: "High" },
            { label: "Data Scale", value: "PB" },
            { label: "Insight", value: "Deep" }
        ],
        iconName: "Cpu",
        gradient: "from-amber-500 to-yellow-600",
        color: "text-amber-500"
    },
    {
        id: "model-training",
        title: "Model Training",
        subtitle: "Custom LLMs",
        shortDescription: "Custom LLMs for your enterprise.",
        fullDescription: "Adapt general-purpose AI to your specific domain. We fine-tune open-source LLMs (Llama 3, Mistral) on your proprietary datasets to create specialized models.",
        features: ["Domain Knowledge", "Data Privacy", "Low Latency", "Cost-Effective"],
        detailedFeatures: [
            {
                title: "Fine-Tuning",
                description: "Adapt pre-trained models to your specific jargon and tasks.",
                icon: "GraduationCap"
            },
            {
                title: "Data Preparation",
                description: "Cleaning and formatting datasets for optimal training.",
                icon: "Database"
            },
            {
                title: "Optimized Deployment",
                description: "Run models efficiently on your own infrastructure or cloud.",
                icon: "Bot"
            },
            {
                title: "Evaluation & Testing",
                description: "Rigorous benchmarks to ensure model reliability.",
                icon: "Target"
            }
        ],
        capabilities: [
            { icon: "Zap", text: "Training Speed" },
            { icon: "Target", text: "Accuracy" },
            { icon: "TrendingUp", text: "Efficiency" },
            { icon: "Shield", text: "Model Security" }
        ],
        stats: [
            { label: "Specificity", value: "100%" },
            { label: "Privacy", value: "Secure" },
            { label: "Cost", value: "-40%" }
        ],
        iconName: "GraduationCap",
        gradient: "from-indigo-500 to-violet-600",
        color: "text-indigo-500"
    },
    {
        id: "mcp-servers",
        title: "MCP Servers",
        subtitle: "AI-Data Connectivity",
        shortDescription: "Connect AI to your data & tools.",
        fullDescription: "Build the bridge between AI and your infrastructure. We develop Model Context Protocol (MCP) servers that allow AI assistants to securely access and query your databases.",
        features: ["Secure Access", "Standardized", "Real-time", "Connectivity"],
        detailedFeatures: [
            {
                title: "Schema Exposure",
                description: "Safely expose DB schemas to AI agents for querying.",
                icon: "Database"
            },
            {
                title: "Tool Definitions",
                description: "Create custom tools that Agents can call programmatically.",
                icon: "Terminal"
            },
            {
                title: "Secure Auth",
                description: "Enterprise-grade authentication and permission handling.",
                icon: "Shield"
            },
            {
                title: "Real-time Protocol",
                description: "Low-latency communication for instant agent responses.",
                icon: "Zap"
            }
        ],
        capabilities: [
            { icon: "Zap", text: "Low Latency" },
            { icon: "Target", text: "Tool Access" },
            { icon: "TrendingUp", text: "Interoperability" },
            { icon: "Shield", text: "Access Control" }
        ],
        stats: [
            { label: "Protocol", value: "MCP" },
            { label: "Security", value: "E2E" },
            { label: "Speed", value: "Realtime" }
        ],
        iconName: "Terminal",
        gradient: "from-gray-500 to-slate-600",
        color: "text-gray-500"
    },
    {
        id: "workflow-automation",
        title: "Workflow Automation",
        subtitle: "Process Optimization",
        shortDescription: "End-to-end process automation.",
        fullDescription: "Streamline your operations. We design and implement end-to-end automation workflows that connect your disparate SaaS tools to eliminate repetitive manual tasks.",
        features: ["Zero Errors", "Time Savings", "Integration", "Scalability"],
        detailedFeatures: [
            {
                title: "Zapier/Make Integration",
                description: "Connect 5000+ apps to create powerful automated flows.",
                icon: "Workflow"
            },
            {
                title: "Custom Scripting",
                description: "Python/Node.js scripts for complex logic beyond no-code.",
                icon: "Terminal"
            },
            {
                title: "Error Handling",
                description: "Robust mechanisms to retry and alert on failures.",
                icon: "Shield"
            },
            {
                title: "Reporting",
                description: "Dashboards to track time saved and automations run.",
                icon: "Database"
            }
        ],
        capabilities: [
            { icon: "Zap", text: "Efficiency" },
            { icon: "Target", text: "Reliability" },
            { icon: "TrendingUp", text: "Productivity" },
            { icon: "Shield", text: "Audit Logs" }
        ],
        stats: [
            { label: "Errors", value: "0%" },
            { label: "Time Saved", value: "Hrs/Day" },
            { label: "ROI", value: "300%" }
        ],
        iconName: "Workflow",
        gradient: "from-teal-500 to-green-600",
        color: "text-teal-500"
    }
];

