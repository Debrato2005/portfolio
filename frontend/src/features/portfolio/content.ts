import { links } from '../../lib/links';

/*
 * Every fact here comes from the owner's resume (public/Debrato-Ghosh-Resume.pdf)
 * or the public GitHub profile and repositories at github.com/Debrato2005,
 * both read on October 29, 2026. Nothing is inferred beyond them.
 */

export const profile = {
  name: 'Debrato Ghosh',
  role: 'IT student at MIT Manipal',
  location: 'Manipal, India',
  status: 'Open to research and SDE internships',
  focus: ['Backend', 'AI / ML', 'Security', 'Research'],
  spokenLanguages: ['English', 'Hindi', 'Bengali', 'Marathi', 'Gujarati'],
  hobbies: ['Photography', 'Astrophotography', 'Gym', 'Swimming'],
  systems: ['Windows', 'Ubuntu', 'CachyOS', 'Pop!_OS'],
} as const;

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  role: string | null;
  period: string | null;
  status: string | null;
  stack: readonly string[];
  points: readonly string[];
  href: string | null;
  /** Where the description comes from. */
  source: 'Resume' | 'Resume and GitHub';
}

export const projects: readonly Project[] = [
  {
    slug: 'oncosyn',
    name: 'OncoSyn',
    tagline: 'Computational oncology & immunotherapy R&D platform',
    role: 'Founder',
    period: 'Aug 2026 – Present',
    status: 'In development',
    stack: [
      'pVACtools',
      'MHCflurry',
      'PyClone-VI',
      'CP-SAT',
      'TRACERx / TESLA',
    ],
    points: [
      'Building an evolution-aware, heterogeneity-aware and spatially informed computational oncology platform for multimodal tumour-state modelling and precision immunotherapy R&D.',
      'Architecting neoantigen portfolio optimization, TCR-T/CAR-T co-design, spatial and single-cell evidence integration, uncertainty modelling and adaptive experiment prioritization.',
      'Designing pipelines around pVACtools, MHCflurry, PyClone-VI, TRACERx/TESLA datasets and CP-SAT optimization, with reproducible provenance, sensitivity benchmarking and evidence-gated research decisions.',
    ],
    href: null,
    source: 'Resume',
  },
  {
    slug: 'smolink',
    name: 'Smolink',
    tagline: 'Production-grade URL shortening platform',
    role: null,
    period: 'Jun 2026 – Present',
    status: 'In progress',
    stack: ['FastAPI', 'Async SQLAlchemy', 'PostgreSQL', 'Redis'],
    points: [
      'A production-oriented URL shortener using a layered architecture, strict TDD and a horizontally scalable design.',
      'Snowflake/Base62 short codes, custom aliases, authenticated ownership and atomic Redis sliding-window rate limiting with guest and user quotas.',
      'Secure authentication with Argon2id, email verification, JWT access/refresh tokens, refresh-token rotation and replay detection, password reset and Google OAuth/OIDC.',
    ],
    href: links.repositories.smolink,
    source: 'Resume and GitHub',
  },
  {
    slug: 'unispace',
    name: 'UniSpace',
    tagline: 'Web-based classroom booking & scheduling system',
    role: null,
    period: 'Apr 2026',
    status: null,
    stack: ['Java', 'JDBC', 'Servlets', 'JSP', 'PostgreSQL'],
    points: [
      'A normalized PostgreSQL schema with triggers, stored procedures and optimistic concurrency control.',
      'A three-tier Java application with JDBC, Servlets and JSP, with role-based authentication and session management.',
      'Optimized PostgreSQL queries for sub-100 ms responses while supporting 50+ concurrent reservation requests.',
    ],
    href: links.repositories.unispace,
    source: 'Resume and GitHub',
  },
  {
    slug: 'cryptalis',
    name: 'Cryptalis',
    tagline: 'Application-layer encrypted data protection',
    role: null,
    period: null,
    status: null,
    stack: ['Python', 'SQLAlchemy'],
    points: [
      'A Python/SQLAlchemy application-layer encrypted data-protection platform.',
    ],
    href: links.repositories.cryptalis,
    source: 'Resume and GitHub',
  },
  {
    slug: 'orbitops',
    name: 'OrbitOps',
    tagline: 'Real-time 3D satellite tracking',
    role: null,
    period: null,
    status: 'Astronomy hackathon',
    stack: ['JavaScript', '3D visualization'],
    points: [
      'Real-time 3D satellite tracking and collision-risk analysis, built for an astronomy hackathon.',
    ],
    href: links.repositories.orbitops,
    source: 'Resume and GitHub',
  },
  {
    slug: 'staysync',
    name: 'StaySync',
    tagline: 'JavaFX hotel-management system',
    role: null,
    period: null,
    status: null,
    stack: ['Java', 'JavaFX'],
    points: [
      'A JavaFX MVC hotel-management system with persistence and multithreading.',
    ],
    href: links.repositories.staysync,
    source: 'Resume and GitHub',
  },
];

export const experience = [
  {
    period: 'Jul 2026 – Present',
    role: 'Research Intern — 2D/3D Computer Vision',
    company: 'aiRender Technology Pvt. Ltd.',
    points: [
      'Researching deep-learning-based 2D-to-3D human reconstruction for a real-time 3D video conferencing platform.',
      'Investigating model, inference and latency optimizations for real-time streaming of reconstructed 3D video.',
    ],
  },
  {
    period: 'Jul 2025 – Aug 2025',
    role: 'Machine Learning & Backend Development Intern',
    company: 'Madtales.ai',
    points: [
      'Built CNN–GRU and BERT-based document-understanding pipelines, reaching 85%+ line-classification accuracy and cutting structured data-extraction errors by 30%.',
      'Designed a Flask REST API with TensorFlow Lite integration that cut mobile inference latency by 40%, and architected an async TTS system with cloud storage processing 10k+ requests.',
    ],
  },
] as const;

export const education = [
  {
    period: 'Aug 2024 – May 2028',
    title: 'B.Tech, Information Technology',
    place: 'Manipal Institute of Technology, Manipal',
    grade: 'CGPA 8.66 / 10',
    note: 'Coursework: Data Structures & Algorithms, Database Management Systems, Machine Learning, Computer Networks, Operating Systems, Object-Oriented Programming.',
  },
  {
    period: '2023',
    title: 'Class XII (HSC)',
    place: 'Sardar Vallabhbhai Patel Vidyalaya and Jr. College, Mumbai',
    grade: '86.83%',
    note: null,
  },
  {
    period: '2021',
    title: 'Class X (ICSE)',
    place: 'Kapol Vidyanidhi International School, Mumbai',
    grade: '96.83%',
    note: null,
  },
] as const;

export const skillGroups = [
  ['Languages', 'C', 'C++', 'Java', 'Python', 'JavaScript', 'SQL'],
  [
    'Backend & APIs',
    'FastAPI',
    'Flask',
    'REST APIs',
    'Node.js',
    'SQLAlchemy',
    'Pydantic',
    'JWT / OAuth',
  ],
  ['Frontend', 'React', 'HTML5', 'CSS3', 'JavaFX'],
  ['Databases & caching', 'PostgreSQL', 'MySQL', 'Redis'],
  ['DevOps & systems', 'Docker', 'Git', 'Linux / Unix', 'Nginx'],
  [
    'Machine learning',
    'NumPy',
    'Pandas',
    'Matplotlib',
    'Seaborn',
    'Scikit-learn',
    'TensorFlow',
    'PyTorch',
  ],
  [
    'Computational biology',
    'pVACtools / pVACseq',
    'MHCflurry',
    'PyClone-VI',
    'Cancer genomics',
  ],
  ['Tools', 'VS Code', 'Eclipse', 'GitHub', 'Postman', 'pgAdmin'],
] as const;

export interface Activity {
  title: string;
  body: string;
  detail: string | null;
  href: string | null;
}

export const activities: readonly Activity[] = [
  {
    title: 'Computational astrophotography',
    body: 'Processed 300+ astronomical frames across 15+ deep-sky objects using calibration, registration and stacking workflows.',
    detail: 'Siril · DSS · Sequator',
    href: null,
  },
  {
    title: 'PAV Head — PRISM',
    body: 'Manipal Institute of Technology.',
    detail: null,
    href: null,
  },
  {
    title: 'Photography & Astronomy Clubs',
    body: 'Member of the Photography Club and The Astronomy Club, Manipal. Organized and hosted image-processing workshops.',
    detail: null,
    href: null,
  },
  {
    title: 'Volunteer Services Organization',
    body: 'Member.',
    detail: null,
    href: null,
  },
  {
    title: 'Cryptonite taskphase',
    body: 'Senior taskphase 2025, working through pwn.college.',
    detail: 'Public repository',
    href: `${links.github}/pwn.college_debrato`,
  },
];

export const quote = {
  text: 'What I cannot create, I do not understand.',
  author: 'Richard Feynman',
  source:
    'https://magazine.caltech.edu/post/biology-through-the-eyes-of-a-physicist',
} as const;
