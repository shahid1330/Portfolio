export const personalInfo = {
  name: "Mohammad Shahid Raza",
  title: "Software Engineer | AI/ML Engineer | Data Scientist",
  bio: `Software Engineer at Simplify3x, building AI-powered developer tooling with large language models across the TypeScript and Node.js stack. Published 5 research papers in machine learning and computer vision, with earlier hands-on ML and data engineering work at Jharkhand Space Application Center.`,
  location: "India",
  // Set NEXT_PUBLIC_EMAIL / NEXT_PUBLIC_PHONE in .env.local. Anything left
  // blank is hidden by the UI rather than rendered as an empty link.
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  resume: "/Mohammad_Shahid_Raza_resume.pdf",
  image: "/Shahid Linkedin.jpeg",
  roles: [
    "Software Engineer",
    "AI/ML Engineer",
    "Data Scientist",
    "Data Engineer"
  ],
  
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB || "https://github.com/shahid1330",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "",
  },

  codingProfiles: [
    {
      platform: "LeetCode",
      url: "https://leetcode.com/u/shahid13/",
      icon: "💻"
    },
    {
      platform: "HackerRank", 
      url: "https://www.hackerrank.com/profile/shahid13",
      icon: "👨‍💻"
    }
  ],

  researchPapers: [
    {
      title: "Advanced Machine Learning Framework for Precision Rainfall Prediction for Jharkhand India",
      webLink: "https://ieeexplore.ieee.org/abstract/document/11156230",
      pdfLink: "/Advanced_Machine_Learning_Framework_for_Precision_Rainfall_Prediction_for_Jharkhand_India.pdf",
      year: 2024,
    },
    {
      title: "Automated speed breaker system using IoVT generated data for Electric Vehicle using Machine Learning",
      webLink: "https://ieeexplore.ieee.org/abstract/document/10306443",
      pdfLink: "/Automated_speed_breaker_system_using_IoVT_generated_data_for_Electric_Vehicle_using_Machine_Learning2.pdf",
      year: 2024,
    },
    {
      title: "Enhancing Handwritten Alphabet Prediction with Realtime IoT Sensor Integration in Machine Learning for Image",
      webLink: "https://reference-global.com/article/10.2478/jsiot-2022-0004",
      pdfLink: "/Enhancing-Handwritten-Alphabet-Prediction-with-Realtime-IoT-Sensor-Integration-in-Machine-Learning-for-Image.pdf",
      year: 2023,
    },
    {
      title: "Galaxy shape classification using Deep Learning",
      webLink: "https://link.springer.com/chapter/10.1007/978-3-031-37164-6_43",
      pdfLink: "/Galaxy_shape_paper.pdf",
      year: 2023,
    },
    {
      title: "Handwritten Digit Recognition",
      webLink: "https://f1000research.com/articles/14-274",
      pdfLink: "/Handwritten Digit Recognition.pdf",
      year: 2023,
    },
  ],
};

export const skills = {
  "Programming Languages": [
    "Python",
    "Java",
    "TypeScript",
  ],
  "Data Science & Machine Learning": [
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Data Preprocessing",
    "Feature Engineering",
  ],
  "Libraries & Frameworks": [
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "TensorFlow",
    "Matplotlib",
    "Seaborn",
    "FastAPI",
  ],
  "Web & Backend Development": [
    "React.js",
    "Node.js",
    "Express",
  ],
  "Data Engineering & MLOps": [
    "ETL Pipelines",
    "Apache Airflow",
    "CI/CD Pipelines",
  ],
  "AI & LLMs": [
    "Large Language Models (LLMs)",
    "Prompt Engineering",
    "Groq API (LLaMA)",
    "AI-driven Content Generation",
  ],
  "DevOps & Cloud": [
    "Docker (Basics)",
    "AWS (EC2, S3)",
    "Linux",
  ],
  "Tools & Platforms": [
    "Git",
    "GitHub",
    "VS Code",
    "Jupyter Notebook",
  ],
  "Databases & Core Concepts": [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "RESTful APIs",
    "JWT Authentication",
    "Object-Oriented Programming (OOP)",
    "Data Structures and Algorithms",
  ],
};

// Most recent first. A period ending in "Present" marks the role as current.
export const experience = [
  {
    role: "Software Engineer",
    company: "Simplify3x Software Private Limited",
    period: "February 2026 - Present",
    location: "Bengaluru, Karnataka, India",
    description: "Full-time · On-site",
    achievements: [
      "Developed an AI-powered coding assistant as a VS Code extension, integrating multiple LLM providers to deliver inline code suggestions and automated test generation.",
      "Built a document-to-requirements pipeline using LLMs, converting uploaded specifications and design files into structured user stories and reducing manual effort.",
      "Designed and implemented role-based access control across a React and Node.js application, securing all modules with granular, permission-driven access.",
      "Resolved critical session-management and state bugs in a multi-tab environment, significantly improving application stability.",
    ],
    tech: [
      "TypeScript",
      "React.js",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "AWS",
      "Large Language Models (LLM)",
    ],
  },
  {
    role: "Project Intern",
    company: "Jharkhand Space Application Center",
    period: "July 2023 - September 2023",
    location: "Ranchi, Jharkhand",
    description: "Machine Learning & Data Engineering Internship",
    achievements: [
      "Built and deployed a supervised machine learning pipeline to predict crop yields, improving forecast accuracy by 20% using agricultural, climatic, and geospatial datasets.",
      "Processed and integrated over 2.2 million data points by developing scalable ETL pipelines using Python (Pandas, NumPy) and Scikit-learn, reducing processing time by 30%.",
      "Generated 4+ interactive dashboards using Matplotlib and Seaborn, enabling non-technical stakeholders to interpret trends and insights, and improved model explainability by 25% through feature importance analysis and visual storytelling.",
    ],
    tech: [],
  },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Christ (Deemed to be University)",
    location: "Bangalore, Karnataka",
    period: "2024 - 2026",
    grade: "",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Amity University",
    location: "Jharkhand, India", 
    period: "2021 - 2024",
    grade: "",
  },
];

export const certifications = [
  {
    name: "AWS Cloud Foundations",
    issuer: "AWS",
    year: 2025,
    credentialUrl: "https://drive.google.com/file/d/1ZH9W2nrljQfWVcGQgiqKXRd7V9DaYLYu/view?usp=sharing",
  },
  {
    name: "ETL in Python and SQL",
    issuer: "LinkedIn",
    year: 2026,
    credentialUrl: "https://drive.google.com/file/d/1FHC-0Xx6WebBK97zXIdgViGGrbNtMm_X/view?usp=sharing",
  },
  {
    name: "Complete Guide to Generative AI for Data Analysis and Data Science",
    issuer: "LinkedIn",
    year: 2025,
    credentialUrl: "https://drive.google.com/file/d/1PVI0acApPBX_ZsaMDr_2yXwsAzvayY-V/view?usp=sharing",
  },
  {
    name: "Learning SQL Programming",
    issuer: "LinkedIn",
    year: 2023,
    credentialUrl: "https://drive.google.com/file/d/1zSqyjDpHixAc-9I2ch95Wv1DCPZxetoz/view?usp=sharing",
  },
];

export const achievements = [
  {
    title: "Institute Innovation Council (IIC)",
    organization: "Amity University",
    period: "2023 - 2024",
    role: "Core Member (Top 15 Selected Students)",
    description: "Selected among the top 15 students university-wide to represent the Institute Innovation Council, contributing to innovation, entrepreneurship, and research-driven initiatives.",
  },
  {
    title: "Microsoft Learn Student Ambassador",
    organization: "Amity University",
    period: "2022 - 2024",
    role: "GOLD Student Ambassador",
    description: "Served as a Microsoft Learn Student Ambassador for two years, driving technical community engagement and peer-to-peer learning initiatives. Planned and delivered technical sessions and hands-on workshops on emerging technologies, strengthening practical skills and industry readiness among students.",
  },
];

export const projects = [
  {
    name: "CareerPilot AI",
    github: "https://github.com/shahid1330/careerPilot-AI",
    description: "AI-powered career guidance platform using LLMs and machine learning"
  },
  {
    name: "Driver Drowsiness Detection System",
    github: "https://github.com/shahid1330/Driver-Monitoring-System",
    description: "Real-time driver monitoring system using computer vision and deep learning"
  },
  {
    name: "Potato Leaf Disease Detection",
    github: "https://github.com/shahid1330/LeafDisease",
    description: "CNN-based agricultural solution for detecting potato plant diseases"
  },
];
