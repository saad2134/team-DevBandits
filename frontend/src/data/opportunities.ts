export interface Opportunity {
  id: number;
  title: string;
  organization: string;
  type: string;
  url: string;
  description: string;
  requirements: string[];
  deadline: string | null;
  location: string | null;
}

export interface MatchResult {
  opportunity: Opportunity;
  match_score: number;
  missing_skills: string[];
  matched_skills: string[];
}

export const sampleOpportunities: MatchResult[] = [
  {
    opportunity: {
      id: 1,
      title: "Product Design Internship",
      organization: "Lumina Systems",
      type: "internship",
      url: "https://example.com",
      description: "Join our product design team to work on cutting-edge SaaS products. You will collaborate with engineers and PMs to create intuitive user experiences.",
      requirements: ["Figma", "UI/UX", "Prototyping", "User Research"],
      deadline: "Oct 24, 2024",
      location: "Remote"
    },
    match_score: 95,
    matched_skills: ["Figma", "UI Design", "User Research"],
    missing_skills: ["Motion Design"]
  },
  {
    opportunity: {
      id: 2,
      title: "Software Engineering Intern",
      organization: "TechCorp",
      type: "internship",
      url: "https://example.com",
      description: "Build scalable applications and learn from senior engineers. Work on real projects that impact millions of users.",
      requirements: ["JavaScript", "React", "Node.js"],
      deadline: "Nov 01, 2024",
      location: "Bangalore"
    },
    match_score: 87,
    matched_skills: ["JavaScript", "React"],
    missing_skills: ["Node.js"]
  },
  {
    opportunity: {
      id: 3,
      title: "Data Analytics Intern",
      organization: "FinanceHub",
      type: "internship",
      url: "https://example.com",
      description: "Analyze financial data and create dashboards. Perfect for those interested in fintech and data science.",
      requirements: ["Python", "SQL", "Excel"],
      deadline: "Oct 30, 2024",
      location: "Mumbai"
    },
    match_score: 82,
    matched_skills: ["Python", "Excel"],
    missing_skills: ["SQL"]
  },
  {
    opportunity: {
      id: 4,
      title: "Web3 Security Hackathon",
      organization: "EtherShield Labs",
      type: "hackathon",
      url: "https://example.com",
      description: "Build the future of decentralized security solutions. Compete for prizes and showcase your blockchain skills.",
      requirements: ["Solidity", "Blockchain", "Security"],
      deadline: "In 3 days",
      location: "Virtual"
    },
    match_score: 88,
    matched_skills: ["Security", "Blockchain"],
    missing_skills: ["Smart Contracts"]
  },
  {
    opportunity: {
      id: 5,
      title: "AI for Social Good Hackathon",
      organization: "TechForGood Foundation",
      type: "hackathon",
      url: "https://example.com",
      description: "Use AI to solve real-world social problems. Join teams building solutions for education, healthcare, and environment.",
      requirements: ["Python", "Machine Learning", "TensorFlow"],
      deadline: "Next Week",
      location: "Hyderabad"
    },
    match_score: 91,
    matched_skills: ["Python", "Machine Learning"],
    missing_skills: ["TensorFlow"]
  },
  {
    opportunity: {
      id: 6,
      title: "Fintech Innovation Challenge",
      organization: "BankTech",
      type: "hackathon",
      url: "https://example.com",
      description: "Reinvent the future of banking. Build solutions for payments, lending, or wealth management.",
      requirements: ["Fintech", "API Integration", "UX Design"],
      deadline: "In 2 weeks",
      location: "Singapore"
    },
    match_score: 79,
    matched_skills: ["UX Design", "API Integration"],
    missing_skills: ["Fintech"]
  },
  {
    opportunity: {
      id: 7,
      title: "Women in Tech Scholarship",
      organization: "Stellar Foundation",
      type: "scholarship",
      url: "https://example.com",
      description: "Supporting the next generation of women in technology. Full scholarship for postgraduate studies.",
      requirements: ["Academic Excellence", "Leadership", "Community Service"],
      deadline: "Nov 15, 2024",
      location: "Global"
    },
    match_score: 92,
    matched_skills: ["Leadership", "Community Service"],
    missing_skills: []
  },
  {
    opportunity: {
      id: 8,
      title: "Merit-Based Tech Scholarship",
      organization: "Code4Future",
      type: "scholarship",
      url: "https://example.com",
      description: "Scholarship for outstanding students pursuing computer science. Covers tuition and living expenses.",
      requirements: ["CGPA 8.0+", "Coding Skills", "Problem Solving"],
      deadline: "Dec 01, 2024",
      location: "USA"
    },
    match_score: 85,
    matched_skills: ["Problem Solving", "Coding"],
    missing_skills: []
  },
  {
    opportunity: {
      id: 9,
      title: "Minority Tech Leaders Scholarship",
      organization: "DiverseCode",
      type: "scholarship",
      url: "https://example.com",
      description: "Empowering underrepresented minorities in tech. Support for bootcamps and certifications.",
      requirements: ["Passion for Tech", "Leadership Potential"],
      deadline: "Nov 30, 2024",
      location: "Remote"
    },
    match_score: 89,
    matched_skills: ["Leadership", "Tech Enthusiasm"],
    missing_skills: []
  },
  {
    opportunity: {
      id: 10,
      title: "Data Science Fellowship",
      organization: "DataMind AI",
      type: "research",
      url: "https://example.com",
      description: "Research position focused on machine learning and AI. Work with leading researchers on cutting-edge projects.",
      requirements: ["Python", "ML", "Statistics", "Research Experience"],
      deadline: "Rolling",
      location: "San Francisco"
    },
    match_score: 76,
    matched_skills: ["Python", "Data Analysis"],
    missing_skills: ["Deep Learning", "Research"]
  },
  {
    opportunity: {
      id: 11,
      title: "AI Research Assistant",
      organization: "IIT Research Lab",
      type: "research",
      url: "https://example.com",
      description: "Join our AI research team. Work on natural language processing and computer vision projects.",
      requirements: ["Python", "Deep Learning", "PyTorch"],
      deadline: "Nov 20, 2024",
      location: "Delhi"
    },
    match_score: 83,
    matched_skills: ["Python", "Deep Learning"],
    missing_skills: ["PyTorch"]
  },
  {
    opportunity: {
      id: 12,
      title: "Blockchain Research Intern",
      organization: "CryptoLabs",
      type: "research",
      url: "https://example.com",
      description: "Research decentralized systems and consensus algorithms. Publish papers at top conferences.",
      requirements: ["Cryptography", "Distributed Systems", "Rust"],
      deadline: "Dec 15, 2024",
      location: "Bangalore"
    },
    match_score: 71,
    matched_skills: ["Distributed Systems"],
    missing_skills: ["Cryptography", "Rust"]
  }
];