import type { Project, SkillGroup, Experience, Service, AITool } from '../types';

export const projects: Project[] = [
  {
    id: 'calibmaster',
    title: 'CalibMaster Enterprise SaaS',
    subtitle: 'Enterprise Calibration Management Platform',
    description:
      'A full-scale enterprise SaaS platform for calibration lifecycle management — from instrument tracking and workflow automation to dynamic certificate generation and compliance reporting. Serves multiple enterprise clients with tenant-isolated architectures.',
    techStack: ['React.js', 'Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'SQL Server', 'Azure'],
    features: [
      'Calibration workflow automation',
      'Dynamic certificate generation engine',
      'Multi-tenant dashboard analytics',
      'Customer portal with role-based access',
      'QR code tracking for instruments',
      'Multi-level approval workflows',
      'Advanced reporting engine',
    ],
    category: 'enterprise',
    aiTools: ['Gemini', 'ChatGPT'],
    architectureNodes: [
      { label: 'React SPA', description: 'TypeScript + Ant Design frontend' },
      { label: 'API Gateway', description: 'NestJS controllers with guards' },
      { label: 'Service Layer', description: 'Domain-driven business logic' },
      { label: 'PostgreSQL', description: 'Primary relational database' },
      { label: 'SQL Server', description: 'Legacy data integration' },
      { label: 'Azure App Service', description: 'Production hosting with PM2' },
    ],
    metrics: [
      { label: 'API Endpoints', value: '120+' },
      { label: 'Uptime', value: '99.5%' },
      { label: 'Certificate Gen', value: '<2s' },
      { label: 'Active Users', value: '500+' },
    ],
  },
  {
    id: 'rfid-tracker',
    title: 'RFID Document Tracking System',
    subtitle: 'Real-time IoT Document Management',
    description:
      'Real-time document tracking system powered by RFID technology. Provides live monitoring dashboards, automated check-in/check-out, and comprehensive reporting for enterprise document management.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'RFID Hardware'],
    features: [
      'Real-time RFID tracking',
      'Hardware integration layer',
      'Live monitoring dashboard',
      'Automated alerting system',
      'Comprehensive reporting',
    ],
    category: 'iot',
    architectureNodes: [
      { label: 'RFID Readers', description: 'Hardware scanners' },
      { label: 'Integration Layer', description: 'Serial port communication' },
      { label: 'Event Processor', description: 'Real-time event handling' },
      { label: 'REST API', description: 'Express.js endpoints' },
      { label: 'React Dashboard', description: 'Live monitoring UI' },
    ],
    metrics: [
      { label: 'Scan Latency', value: '<500ms' },
      { label: 'Documents Tracked', value: '10K+' },
      { label: 'Accuracy', value: '99.9%' },
    ],
  },
  {
    id: 'ai-doc-assistant',
    title: 'AI Document Assistant',
    subtitle: 'Intelligent Document Analysis with RAG',
    description:
      'A 100% free and open-source AI document assistant that enables semantic search across uploaded PDFs using Retrieval-Augmented Generation. Leverages Hugging Face models and Pinecone vector database for intelligent, free document querying.',
    techStack: ['Next.js', 'React', 'Hugging Face API', 'Pinecone', 'Tailwind CSS'],
    features: [
      'PDF upload & parsing',
      'Semantic search with open-source embeddings',
      'Mistral/Zephyr LLM integration',
      'RAG architecture',
      'Streaming Conversational UI',
    ],
    category: 'ai',
    aiTools: ['Claude', 'ChatGPT', 'Gemini'],
    architectureNodes: [
      { label: 'Document Upload', description: 'PDF parsing & chunking' },
      { label: 'Embedding Engine', description: 'HuggingFace all-MiniLM-L6-v2' },
      { label: 'Vector Store', description: 'Pinecone Serverless Index' },
      { label: 'RAG Pipeline', description: 'Context retrieval + OSS LLM' },
      { label: 'Chat Interface', description: 'Vercel AI SDK Streaming' },
    ],
    metrics: [
      { label: 'Query Speed', value: '<2s' },
      { label: 'Accuracy', value: '90%' },
      { label: 'Docs Supported', value: 'PDF' },
    ],
  },
  {
    id: 'ai-calibration',
    title: 'AI Calibration Assistant',
    subtitle: 'Intelligent Calibration Insights',
    description:
      'An AI assistant that provides intelligent calibration recommendations, certificate analysis, maintenance predictions, and serves as a knowledge base for calibration engineering teams.',
    techStack: ['React', 'Node.js', 'OpenAI API', 'LangChain', 'PostgreSQL'],
    features: [
      'Calibration recommendations',
      'Intelligent certificate analysis',
      'Maintenance prediction',
      'Knowledge assistant',
      'Historical data analysis',
    ],
    category: 'ai',
    demoUrl: 'https://ai-doc-assistant-your-deployment.vercel.app',
    githubUrl: 'https://github.com/yourusername/ai-doc-assistant',
    aiTools: ['Gemini', 'ChatGPT', 'Antigravity'],
    architectureNodes: [
      { label: 'Data Ingestion', description: 'Historical calibration data' },
      { label: 'Analysis Engine', description: 'Pattern recognition' },
      { label: 'LLM Layer', description: 'OpenAI with domain context' },
      { label: 'Prediction Module', description: 'Maintenance forecasting' },
      { label: 'Assistant UI', description: 'Chat + dashboard interface' },
    ],
    metrics: [
      { label: 'Prediction Accuracy', value: '88%' },
      { label: 'Response Time', value: '<2s' },
      { label: 'Data Points', value: '50K+' },
    ],
  },
];

export const experience: Experience = {
  role: 'Software Developer',
  company: 'Iviewsense',
  period: '2+ Years',
  achievements: [
    { text: 'Developed CalibMaster Enterprise SaaS Platform end-to-end', metric: 'Full product lifecycle' },
    { text: 'Built scalable React + Node.js architecture serving 500+ users', metric: '500+ active users' },
    { text: 'Implemented workflow automation reducing manual processes', metric: '70% time reduction' },
    { text: 'Created dynamic certificate generation system', metric: '<2s generation time' },
    { text: 'Built real-time reporting dashboards with complex aggregations', metric: '15+ report types' },
    { text: 'Implemented RBAC security with multi-tenant isolation', metric: 'Zero security incidents' },
    { text: 'Managed Azure production deployments with PM2', metric: '99.5% uptime' },
    { text: 'Optimized database queries and schema design', metric: '40% faster queries' },
    { text: 'Delivered customer-specific customization features', metric: '10+ client configs' },
  ],
  techStack: ['React.js', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'SQL Server', 'Azure', 'REST APIs'],
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    icon: 'monitor',
    skills: [
      { name: 'React.js', projects: ['CalibMaster', 'RFID Tracker', 'AI Assistant'], level: 'expert' },
      { name: 'TypeScript', projects: ['CalibMaster', 'AI Calibration'], level: 'expert' },
      { name: 'JavaScript', projects: ['All Projects'], level: 'expert' },
      { name: 'HTML5 & CSS3', projects: ['All Projects'], level: 'expert' },
      { name: 'Ant Design', projects: ['CalibMaster'], level: 'advanced' },
      { name: 'Tailwind CSS', projects: ['AI Assistant', 'Portfolio'], level: 'advanced' },
    ],
  },
  {
    category: 'Backend',
    icon: 'server',
    skills: [
      { name: 'Node.js', projects: ['CalibMaster', 'RFID Tracker', 'AI Projects'], level: 'expert' },
      { name: 'Express.js', projects: ['RFID Tracker', 'AI Assistant'], level: 'advanced' },
      { name: 'NestJS', projects: ['CalibMaster'], level: 'advanced' },
      { name: 'REST APIs', projects: ['All Projects'], level: 'expert' },
      { name: 'JWT Auth', projects: ['CalibMaster', 'RFID Tracker'], level: 'advanced' },
      { name: 'RBAC', projects: ['CalibMaster'], level: 'advanced' },
    ],
  },
  {
    category: 'Database',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', projects: ['CalibMaster', 'AI Calibration'], level: 'expert' },
      { name: 'SQL Server', projects: ['CalibMaster'], level: 'advanced' },
      { name: 'MySQL', projects: ['Side Projects'], level: 'intermediate' },
      { name: 'Sequelize ORM', projects: ['RFID Tracker'], level: 'advanced' },
      { name: 'TypeORM', projects: ['CalibMaster'], level: 'advanced' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: 'cloud',
    skills: [
      { name: 'Azure App Services', projects: ['CalibMaster'], level: 'advanced' },
      { name: 'Linux', projects: ['CalibMaster', 'AI Projects'], level: 'advanced' },
      { name: 'PM2', projects: ['CalibMaster'], level: 'advanced' },
      { name: 'Git & GitHub', projects: ['All Projects'], level: 'expert' },
    ],
  },
  {
    category: 'AI & ML',
    icon: 'brain',
    skills: [
      { name: 'OpenAI APIs', projects: ['AI Doc Assistant', 'AI Calibration'], level: 'advanced' },
      { name: 'Prompt Engineering', projects: ['AI Projects'], level: 'advanced' },
      { name: 'RAG Architecture', projects: ['AI Doc Assistant'], level: 'intermediate' },
      { name: 'Vector Databases', projects: ['AI Doc Assistant'], level: 'intermediate' },
      { name: 'LangChain', projects: ['AI Calibration'], level: 'intermediate' },
      { name: 'AI-Assisted Development', projects: ['All Projects'], level: 'advanced' },
    ],
  },
];

export const services: Service[] = [
  {
    title: 'Full Stack Web Development',
    description: 'End-to-end web application development with React.js frontend and Node.js/NestJS backend. Scalable, production-ready solutions.',
    features: ['React.js + TypeScript frontend', 'Node.js / NestJS backend', 'REST API design', 'Database architecture', 'Authentication & authorization'],
    icon: 'code',
  },
  {
    title: 'Enterprise SaaS Development',
    description: 'Build multi-tenant SaaS platforms with enterprise-grade security, workflow automation, and scalable architecture.',
    features: ['Multi-tenant architecture', 'RBAC security', 'Workflow automation', 'Dynamic report generation', 'Azure cloud deployment'],
    icon: 'building',
  },
  {
    title: 'AI Integration & Solutions',
    description: 'Integrate AI capabilities into your applications using OpenAI, RAG architecture, and intelligent automation.',
    features: ['OpenAI API integration', 'RAG applications', 'Document intelligence', 'AI-powered search', 'Prompt engineering'],
    icon: 'sparkles',
  },
  {
    title: 'Cloud Deployment & DevOps',
    description: 'Deploy and manage applications on Azure cloud with monitoring, CI/CD, and production-grade infrastructure.',
    features: ['Azure App Services', 'PM2 process management', 'Linux server setup', 'Performance monitoring', 'Production troubleshooting'],
    icon: 'cloud',
  },
];

export const aiToolkit: AITool[] = [
  {
    name: 'Google Gemini',
    description: 'AI pair programming & complex problem solving',
    icon: 'gemini',
    color: '#4285F4',
  },
  {
    name: 'ChatGPT',
    description: 'Architecture design & code review',
    icon: 'chatgpt',
    color: '#10A37F',
  },
  {
    name: 'Claude',
    description: 'Deep analysis & documentation',
    icon: 'claude',
    color: '#D97757',
  },
  {
    name: 'Antigravity',
    description: 'AI-powered IDE for full-stack development',
    icon: 'antigravity',
    color: '#8B5CF6',
  },
];

export const aiSkills = {
  current: [
    { name: 'OpenAI APIs', status: 'active' as const },
    { name: 'Prompt Engineering', status: 'active' as const },
    { name: 'RAG Architecture', status: 'active' as const },
    { name: 'Vector Search', status: 'active' as const },
    { name: 'AI Agents', status: 'active' as const },
    { name: 'LangChain', status: 'active' as const },
  ],
  roadmap: [
    { name: 'Agentic AI', status: 'learning' as const },
    { name: 'MCP Protocol', status: 'learning' as const },
    { name: 'LangGraph', status: 'planned' as const },
    { name: 'Autonomous Agents', status: 'planned' as const },
    { name: 'AI Workflows', status: 'planned' as const },
  ],
};

export const systemDesigns = [
  {
    title: 'SaaS Architecture',
    nodes: ['React SPA', 'API Gateway', 'NestJS Services', 'PostgreSQL', 'Redis Cache', 'Azure Deployment'],
  },
  {
    title: 'Certificate Generation Engine',
    nodes: ['Template Engine', 'Data Aggregation', 'PDF Renderer', 'QR Code Generator', 'Storage Service', 'Delivery Pipeline'],
  },
  {
    title: 'RBAC Security Architecture',
    nodes: ['Auth Guard', 'JWT Validator', 'Role Resolver', 'Permission Matrix', 'Tenant Isolator', 'Audit Logger'],
  },
  {
    title: 'AI RAG Architecture',
    nodes: ['Document Loader', 'Text Splitter', 'Embedding Model', 'Vector Store', 'Retriever', 'LLM Generator'],
  },
];
