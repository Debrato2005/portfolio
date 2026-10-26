import { links } from '../../lib/links';
import { editorialCovers } from './illustrations';
export const sections = [
  ['about', 'About'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['hackathons', 'Hackathons'],
  ['github', 'In Code / GitHub'],
  ['skills', 'Skills'],
  ['thoughts', 'Train of Thought'],
  ['photography', 'Photography'],
  ['contact', 'Contact'],
] as const;
export interface PortfolioProject {
  slug: string;
  name: string;
  category: 'Research' | 'Systems' | 'Applications';
  status: string;
  summary: string;
  tags: readonly string[];
  href: string | null;
  image: string | null;
  imageSrcSet?: string;
  imageWidth?: number;
  imageHeight?: number;
  period: string | null;
  overview: string;
  details: readonly { title: string; body: string }[];
  limitations: readonly string[];
  sources: readonly { label: string; href: string }[];
}
export const projects: readonly PortfolioProject[] = [
  {
    slug: 'oncosyn',
    name: 'OncoSyn',
    category: 'Research',
    status: 'In development',
    summary:
      'Computational oncology and precision immunotherapy research infrastructure.',
    tags: ['Python', 'Machine learning', 'Bioinformatics'],
    href: null,
    image: '/images/project-oncosyn.webp',
    imageSrcSet:
      '/images/project-oncosyn.webp 320w, /images/project-oncosyn-large.webp 1122w',
    period: 'Aug 2026 – Present',
    overview:
      'An ongoing computational oncology research project exploring how tumour heterogeneity, evolution and spatial evidence can inform precision immunotherapy research.',
    details: [
      {
        title: 'Research direction',
        body: 'My resume describes multimodal tumour-state modelling, neoantigen portfolio optimization and TCR-T/CAR-T co-design as research and architecture work.',
      },
      {
        title: 'Tools and evidence',
        body: 'The planned workflows draw on pVACtools, MHCflurry and PyClone-VI, with attention to reproducible provenance and uncertainty.',
      },
    ],
    limitations: [
      'This is work in development. No clinical validation, treatment recommendation or production deployment is claimed.',
      'No public repository or demo is currently linked.',
    ],
    sources: [{ label: 'Owner-supplied resume', href: links.resume }],
  },
  {
    slug: 'cryptalis',
    name: 'Cryptalis',
    category: 'Research',
    status: 'Research prototype',
    summary: 'Application-side protection of selected PostgreSQL text fields.',
    tags: ['Python', 'SQLAlchemy', 'PostgreSQL'],
    href: links.repositories.cryptalis,
    image: '/images/project-cryptalis.webp',
    imageSrcSet:
      '/images/project-cryptalis.webp 320w, /images/project-cryptalis-large.webp 1122w',
    period: null,
    overview:
      'A research prototype studying application-layer protection of selected PostgreSQL text fields, with explicit contracts for storage, search and maintenance transitions.',
    details: [
      {
        title: 'Architecture',
        body: 'The public README describes a manifest compiler, CF1 primitives, a local key provider and bounded SQLAlchemy storage and search operations.',
      },
      {
        title: 'Engineering boundary',
        body: 'The described stack uses Python, SQLAlchemy, psycopg and PostgreSQL. The repository distinguishes bounded implementation from full qualification.',
      },
    ],
    limitations: [
      'The README reports all seven full qualification gates as UNKNOWN.',
      'Production key management, runtime compatibility and independent review remain unqualified. This is not a general security guarantee.',
    ],
    sources: [
      { label: 'Public repository README', href: links.repositories.cryptalis },
    ],
  },
  {
    slug: 'smolink',
    name: 'Smolink',
    category: 'Systems',
    status: 'In progress',
    summary: 'A backend-first URL shortener built as a modular monolith.',
    tags: ['FastAPI', 'PostgreSQL', 'Redis'],
    href: links.repositories.smolink,
    image: '/images/project-smolink.webp',
    imageSrcSet:
      '/images/project-smolink.webp 320w, /images/project-smolink-large.webp 1122w',
    period: 'Jun 2026 – Present',
    overview:
      'A backend-first URL-shortening project that explores ownership, ID generation, authentication and reliable data boundaries without splitting services prematurely.',
    details: [
      {
        title: 'Implemented scope',
        body: 'The public README marks short-code generation and URL creation as implemented. It also describes implemented local authentication flows.',
      },
      {
        title: 'Architecture decisions',
        body: 'PostgreSQL owns durable records. Redis supports ephemeral state. The project uses a layered modular monolith and Snowflake IDs encoded in Base62.',
      },
    ],
    limitations: [
      'The README still marks redirects, analytics capture and reports as planned; the analytics table alone is implemented.',
      'Google OIDC remains pending in the inspected README. Latency targets are not measured guarantees.',
    ],
    sources: [
      { label: 'Public engineering context', href: links.repositories.smolink },
      { label: 'Owner-supplied resume', href: links.resume },
    ],
  },
  {
    slug: 'unispace',
    name: 'UniSpace',
    category: 'Applications',
    status: 'Academic project',
    summary:
      'Classroom booking and recurring reservations with database-level conflict checks.',
    tags: ['Java', 'JSP', 'PostgreSQL'],
    href: links.repositories.unispace,
    image: '/images/project-unispace.webp',
    imageSrcSet:
      '/images/project-unispace-small.webp 640w, /images/project-unispace.webp 1672w',
    imageWidth: 1672,
    imageHeight: 941,
    period: 'Apr 2026',
    overview:
      'A classroom scheduling project focused on preventing overlapping reservations while supporting recurring lectures and individual session cancellations.',
    details: [
      {
        title: 'Three-tier structure',
        body: 'The README describes JSP presentation, Java Servlets and JDBC, backed by PostgreSQL.',
      },
      {
        title: 'Data integrity',
        body: 'The documented design uses constraints, stored procedures and triggers for reservation validation, with role-based booking workflows.',
      },
    ],
    limitations: [
      'Performance figures from the resume do not have a supplied benchmark workload, so they are not presented as guarantees.',
      'The case study describes repository documentation, not an independent deployment acceptance test.',
    ],
    sources: [
      { label: 'Public project README', href: links.repositories.unispace },
      { label: 'Owner-supplied resume', href: links.resume },
    ],
  },
  {
    slug: 'orbitops',
    name: 'OrbitOps',
    category: 'Research',
    status: 'Prototype',
    summary: 'Satellite tracking and space-situational-awareness exploration.',
    tags: ['3D visualization', 'Orbital analysis', 'OOTK'],
    href: links.repositories.orbitops,
    image: null,
    period: null,
    overview:
      'An astronomy project exploring a 3D satellite interface, asset information and collision-risk analysis.',
    details: [
      {
        title: 'Documented design',
        body: 'The README describes user-facing services alongside a dedicated analysis engine built around the Orbit Observation Toolkit.',
      },
      {
        title: 'Exploration areas',
        body: 'Documented features include TLE/NORAD-based assets, orbital information and conjunction-analysis workflows.',
      },
    ],
    limitations: [
      'The README describes the project’s intended capabilities. Operational accuracy and collision-avoidance reliability have not been independently verified.',
      'No live mission-control or safety-critical use is claimed.',
    ],
    sources: [
      { label: 'Public project README', href: links.repositories.orbitops },
    ],
  },
  {
    slug: 'staysync',
    name: 'StaySync',
    category: 'Applications',
    status: 'Course project',
    summary:
      'A JavaFX desktop application for hotel rooms, bookings and checkout.',
    tags: ['Java', 'JavaFX', 'Maven'],
    href: links.repositories.staysync,
    image: null,
    period: null,
    overview:
      'A desktop hotel-management project that brings object-oriented design, persistence and concurrent work together in a small application.',
    details: [
      {
        title: 'Application structure',
        body: 'The public README describes a Model-View-Controller design, tabbed JavaFX interface and Java object serialization for persistence.',
      },
      {
        title: 'Workflows',
        body: 'The documented modules cover rooms, guests, bookings, checkout and background billing calculations.',
      },
    ],
    limitations: [
      'The repository identifies this as a course capstone. No hosted service or production deployment is claimed.',
    ],
    sources: [
      { label: 'Public project README', href: links.repositories.staysync },
    ],
  },
];
export const articles = [
  {
    slug: 'the-next-breakthrough-is-in-another-field',
    illustratedCover: editorialCovers.everydayLight,
    title: 'The next breakthrough is in another field',
    href: links.article,
    date: null,
    category: null,
  },
] as const;
export const experience = [
  {
    period: 'Jul 2026 – Present',
    role: 'Research Intern',
    company: 'aiRender Technology Pvt. Ltd.',
    summary:
      '2D/3D computer vision, human reconstruction and inference workflows.',
  },
  {
    period: 'Jul – Aug 2025',
    role: 'Machine Learning & Backend Intern',
    company: 'Madtales.ai',
    summary:
      'Document understanding, inference APIs and asynchronous text-to-speech.',
  },
] as const;
export const education = {
  period: 'Aug 2024 – May 2028 expected',
  degree: 'B.Tech, Information Technology',
  institution: 'Manipal Institute of Technology',
  summary: 'Engineering foundations, software systems and research.',
} as const;
export interface Achievement {
  slug: string;
  name: string;
  result: string;
  qualifier: string | null;
}
export const achievements: readonly Achievement[] = [
  {
    slug: 'svasth',
    name: 'SVASTH Hackathon',
    result: 'Winner — 1st place',
    qualifier: 'Resume-reported',
  },
  {
    slug: 'nasa-space-apps',
    name: 'NASA Space Apps Challenge',
    result: 'Global Nominee',
    qualifier: null,
  },
  {
    slug: 'hackcbs',
    name: 'HackCBS',
    result: 'Finalist',
    qualifier: null,
  },
  {
    slug: 'sih-2023',
    name: 'Smart India Hackathon 2023',
    result: 'Top 50',
    qualifier: null,
  },
  {
    slug: 'build-with-genai',
    name: 'Build with GenAI',
    result: 'Winner',
    qualifier: null,
  },
];
export interface PortfolioPhoto {
  slug: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string | null;
}
export interface PhotoCollection {
  slug: string;
  title: string;
  description: string;
  status: 'Planned collection';
  photos: readonly PortfolioPhoto[];
  illustratedCover?: string;
}
export const photoCollections: readonly PhotoCollection[] = [
  {
    slug: 'night-sky',
    illustratedCover: editorialCovers.nightSky,
    title: 'Night sky',
    description: 'Astronomy and computational astrophotography.',
    status: 'Planned collection',
    photos: [],
  },
  {
    slug: 'landscapes',
    illustratedCover: editorialCovers.landscapes,
    title: 'Landscapes',
    description: 'A collection for light and open spaces.',
    status: 'Planned collection',
    photos: [],
  },
  {
    slug: 'everyday-light',
    illustratedCover: editorialCovers.everydayLight,
    title: 'Everyday light',
    description: 'A collection for the small details.',
    status: 'Planned collection',
    photos: [],
  },
];

export const quotes = [
  {
    text: 'What I cannot create, I do not understand.',
    author: 'Richard Feynman',
    source:
      'https://magazine.caltech.edu/post/biology-through-the-eyes-of-a-physicist',
  },
  {
    text: 'There is grandeur in this view of life',
    author: 'Charles Darwin · excerpt',
    source:
      'https://darwin-online.org.uk/EditorialIntroductions/Chancellor_vanWyhe_Origin1st.html',
  },
  {
    text: 'The Analytical Engine weaves algebraical patterns just as the Jacquard-loom weaves flowers and leaves.',
    author: 'Ada Lovelace · excerpt',
    source: 'https://www.gutenberg.org/files/75107/75107-h/75107-h.htm',
  },
] as const;

export const skillGroups = [
  ['Languages', 'Python', 'Java', 'TypeScript', 'SQL'],
  ['Frontend', 'React', 'JavaScript', 'HTML / CSS'],
  ['Backend', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Redis'],
  ['AI / ML', 'Computer vision', 'PyTorch', 'TensorFlow'],
  ['Research / Tools', 'pVACtools', 'MHCflurry', 'Docker', 'Linux'],
] as const;

/** Facts from the public GitHub profile README at github.com/Debrato2005 (read October 2026). */
export const profile = {
  status: 'Open to research and SDE internships',
  location: 'Manipal, India',
  focus: ['Backend', 'AI / ML', 'Security', 'Research'],
  tools: [
    'FastAPI',
    'PostgreSQL',
    'Redis',
    'Docker',
    'Git',
    'Linux',
    'PyTorch',
  ],
  spokenLanguages: ['English', 'Hindi', 'Bengali', 'Marathi', 'Gujarati'],
  offScreen: ['Photography', 'Astrophotography', 'Gym', 'Swimming'],
  systems: ['Windows', 'Ubuntu', 'CachyOS', 'Pop!_OS'],
} as const;
