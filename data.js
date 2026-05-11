// data.js — job families, skills, sample user, content library

const DREYFUS = [
  { level: 0, name: 'N/A',              short: '—' },
  { level: 1, name: 'Novice',           short: 'Novice' },
  { level: 2, name: 'Advanced beginner', short: 'Adv. beginner' },
  { level: 3, name: 'Competent',        short: 'Competent' },
  { level: 4, name: 'Proficient',       short: 'Proficient' },
  { level: 5, name: 'Expert',           short: 'Expert' },
];

const JOB_FAMILIES = [
  {
    id: 'swe',
    title: 'Software Engineering',
    level: 'Senior',
    blurb: 'Hands-on engineers shipping production systems across the stack.',
    skills: [
      // first 5 are critical
      { name: 'Software Architecture',           expected: 4, critical: true  },
      { name: 'Programming Proficiency',         expected: 5, critical: true  },
      { name: 'Automated Testing',               expected: 4, critical: true  },
      { name: 'Secure Coding',                   expected: 4, critical: true  },
      { name: 'CI/CD Engineering',               expected: 3, critical: true  },
      { name: 'Infrastructure as Code',          expected: 3, critical: false },
      { name: 'Observability',                   expected: 3, critical: false },
      { name: 'Incident Response',               expected: 3, critical: false },
      { name: 'Cloud Architecture',              expected: 3, critical: false },
      { name: 'Containerisation & Orchestration',expected: 3, critical: false },
      { name: 'Reliability Engineering',         expected: 3, critical: false },
      { name: 'API & Service Design',            expected: 4, critical: false },
      { name: 'Quality Engineering',             expected: 3, critical: false },
      { name: 'Performance Engineering',         expected: 3, critical: false },
      { name: 'Data Fluency',                    expected: 3, critical: false },
      { name: 'Technical Communication',         expected: 4, critical: false },
      { name: 'Cross-Functional Collaboration',  expected: 4, critical: false },
      { name: 'Agile & Lean Delivery',           expected: 3, critical: false },
      { name: 'Systems Thinking',                expected: 4, critical: false },
    ],
  },
  {
    id: 'pm',
    title: 'Product Management',
    level: 'Senior',
    blurb: 'Owns product outcomes end-to-end across discovery and delivery.',
    skills: [
      { name: 'Customer Discovery',              expected: 5, critical: true  },
      { name: 'Product Strategy',                expected: 4, critical: true  },
      { name: 'Outcome Definition & KPIs',       expected: 4, critical: true  },
      { name: 'Roadmap Prioritisation',          expected: 4, critical: true  },
      { name: 'Stakeholder Management',          expected: 4, critical: true  },
      { name: 'Data Analysis',                   expected: 3, critical: false },
      { name: 'Experimentation & A/B Testing',   expected: 3, critical: false },
      { name: 'UX Sensibility',                  expected: 3, critical: false },
      { name: 'Technical Fluency',               expected: 3, critical: false },
      { name: 'Go-to-Market Planning',           expected: 3, critical: false },
      { name: 'Pricing & Packaging',             expected: 2, critical: false },
      { name: 'Storytelling & Comms',            expected: 4, critical: false },
      { name: 'Market & Competitive Research',   expected: 3, critical: false },
      { name: 'Lean & Agile Delivery',           expected: 3, critical: false },
      { name: 'Cross-Functional Collaboration',  expected: 4, critical: false },
      { name: 'Systems Thinking',                expected: 3, critical: false },
      { name: 'Financial Literacy',              expected: 2, critical: false },
      { name: 'Vision Setting',                  expected: 4, critical: false },
      { name: 'Coaching & Mentoring',            expected: 3, critical: false },
    ],
  },
  {
    id: 'data',
    title: 'Data Analytics',
    level: 'Mid',
    blurb: 'Turns raw data into trustworthy insight and product decisions.',
    skills: [
      { name: 'SQL & Query Performance',         expected: 4, critical: true  },
      { name: 'Statistical Reasoning',           expected: 4, critical: true  },
      { name: 'Data Modelling',                  expected: 3, critical: true  },
      { name: 'Experiment Design',               expected: 3, critical: true  },
      { name: 'Visualisation & Storytelling',    expected: 4, critical: true  },
      { name: 'Python / R',                      expected: 3, critical: false },
      { name: 'dbt & Transformation',            expected: 3, critical: false },
      { name: 'BI Tooling (Looker/Tableau)',     expected: 3, critical: false },
      { name: 'Data Quality & Testing',          expected: 3, critical: false },
      { name: 'Warehouse Architecture',          expected: 2, critical: false },
      { name: 'Causal Inference',                expected: 2, critical: false },
      { name: 'Machine Learning Basics',         expected: 2, critical: false },
      { name: 'Stakeholder Management',          expected: 3, critical: false },
      { name: 'Product Sense',                   expected: 3, critical: false },
      { name: 'Domain Knowledge',                expected: 3, critical: false },
      { name: 'Documentation',                   expected: 3, critical: false },
      { name: 'Privacy & Governance',            expected: 2, critical: false },
      { name: 'Forecasting',                     expected: 2, critical: false },
      { name: 'Data Ethics',                     expected: 3, critical: false },
    ],
  },
];

// Sample CSV "upload" — current self-assessed levels for the SWE job family
const SAMPLE_USER = {
  name: 'Maya Okonkwo',
  role: 'Senior Software Engineer',
  team: 'Platform · Payments',
  uploadedAt: '11 May 2026',
  // keyed by skill name
  currentSwe: {
    'Software Architecture': 3,
    'Programming Proficiency': 4,
    'Automated Testing': 2,
    'Secure Coding': 4,
    'CI/CD Engineering': 1,
    'Infrastructure as Code': 2,
    'Observability': 3,
    'Incident Response': 4,
    'Cloud Architecture': 2,
    'Containerisation & Orchestration': 3,
    'Reliability Engineering': 1,
    'API & Service Design': 3,
    'Quality Engineering': 3,
    'Performance Engineering': 2,
    'Data Fluency': 4,
    'Technical Communication': 4,
    'Cross-Functional Collaboration': 3,
    'Agile & Lean Delivery': 3,
    'Systems Thinking': 3,
  },
  currentPm: {
    'Customer Discovery': 3, 'Product Strategy': 3, 'Outcome Definition & KPIs': 2,
    'Roadmap Prioritisation': 4, 'Stakeholder Management': 4, 'Data Analysis': 3,
    'Experimentation & A/B Testing': 2, 'UX Sensibility': 3, 'Technical Fluency': 4,
    'Go-to-Market Planning': 2, 'Pricing & Packaging': 1, 'Storytelling & Comms': 3,
    'Market & Competitive Research': 2, 'Lean & Agile Delivery': 3,
    'Cross-Functional Collaboration': 4, 'Systems Thinking': 3,
    'Financial Literacy': 2, 'Vision Setting': 3, 'Coaching & Mentoring': 2,
  },
  currentData: {
    'SQL & Query Performance': 4, 'Statistical Reasoning': 2, 'Data Modelling': 2,
    'Experiment Design': 1, 'Visualisation & Storytelling': 3, 'Python / R': 3,
    'dbt & Transformation': 3, 'BI Tooling (Looker/Tableau)': 4,
    'Data Quality & Testing': 2, 'Warehouse Architecture': 2, 'Causal Inference': 1,
    'Machine Learning Basics': 2, 'Stakeholder Management': 3, 'Product Sense': 3,
    'Domain Knowledge': 3, 'Documentation': 2, 'Privacy & Governance': 2,
    'Forecasting': 2, 'Data Ethics': 3,
  },
};

// Curated content per skill (a small library — real product would pull from CMS)
const CONTENT = {
  default: [
    { kind: 'article', title: 'Climbing the Dreyfus ladder, deliberately', source: 'Internal · L&D Guild', minutes: 7 },
    { kind: 'mentor',  title: 'Find a mentor in this skill',                source: '3 mentors available',     minutes: null },
  ],
  'Software Architecture': [
    { kind: 'course',  title: 'Pragmatic Software Architecture',            source: 'O\u2019Reilly · 6 modules', minutes: 280 },
    { kind: 'video',   title: 'Drawing C4 diagrams that actually help',     source: 'Internal Talk · Tariq B.', minutes: 32 },
    { kind: 'article', title: 'When to extract a service (and when not to)',source: 'martinfowler.com',         minutes: 14 },
    { kind: 'mentor',  title: 'Pair with a Principal Engineer',             source: '4 mentors available',      minutes: null },
  ],
  'Automated Testing': [
    { kind: 'course',  title: 'Test pyramid in practice',                   source: 'Internal Academy',         minutes: 180 },
    { kind: 'video',   title: 'Contract testing for payment services',      source: 'Conf talk · 2025',         minutes: 28 },
    { kind: 'article', title: 'Writing tests that don\u2019t break on every refactor', source: 'Internal Wiki',  minutes: 9 },
    { kind: 'mentor',  title: 'Shadow the QE chapter lead',                 source: '2 mentors available',      minutes: null },
  ],
  'CI/CD Engineering': [
    { kind: 'course',  title: 'Trunk-based delivery, end to end',           source: 'Internal Academy',         minutes: 240 },
    { kind: 'video',   title: 'Anatomy of our deploy pipeline',             source: 'Platform Eng · 2026',      minutes: 22 },
    { kind: 'article', title: 'Deployment safety: progressive delivery 101',source: 'Internal Wiki',            minutes: 11 },
    { kind: 'mentor',  title: 'Office hours with Platform Eng',             source: 'Thursdays, 30 min',        minutes: null },
  ],
  'Reliability Engineering': [
    { kind: 'course',  title: 'SRE Foundations',                            source: 'Google · 8 modules',       minutes: 360 },
    { kind: 'video',   title: 'Designing meaningful SLOs',                  source: 'SREcon · 2025',            minutes: 41 },
    { kind: 'article', title: 'Error budgets without the drama',            source: 'Internal Playbook',        minutes: 12 },
    { kind: 'mentor',  title: 'Sit in on an incident review',               source: 'Weekly, Wednesdays',       minutes: null },
  ],
  'Infrastructure as Code': [
    { kind: 'course',  title: 'Terraform for service teams',                source: 'HashiCorp · 5 modules',    minutes: 200 },
    { kind: 'article', title: 'Module patterns we actually use',            source: 'Internal Wiki',            minutes: 10 },
    { kind: 'video',   title: 'From click-ops to IaC in 90 days',           source: 'Internal Talk',            minutes: 26 },
  ],
  'Cloud Architecture': [
    { kind: 'course',  title: 'Well-Architected on our stack',              source: 'Internal Academy',         minutes: 300 },
    { kind: 'article', title: 'Choosing managed vs self-hosted',            source: 'Architecture Council',     minutes: 8 },
    { kind: 'mentor',  title: 'Architecture review office hours',           source: 'Tuesdays · 45 min',        minutes: null },
  ],
  'API & Service Design': [
    { kind: 'article', title: 'Designing APIs you won\u2019t regret',       source: 'Internal Playbook',        minutes: 13 },
    { kind: 'video',   title: 'Versioning without tears',                   source: 'Conf talk · 2024',         minutes: 35 },
    { kind: 'course',  title: 'API design fundamentals',                    source: 'Internal Academy',         minutes: 160 },
  ],
  'Performance Engineering': [
    { kind: 'article', title: 'A budget for every page',                    source: 'web.dev',                  minutes: 9 },
    { kind: 'video',   title: 'Profiling Node services in prod',            source: 'Internal Talk',            minutes: 30 },
  ],
  'Cross-Functional Collaboration': [
    { kind: 'article', title: 'Working with product and design',            source: 'Internal Playbook',        minutes: 7 },
    { kind: 'mentor',  title: 'Job-swap a day with a PM',                   source: 'Quarterly programme',      minutes: null },
  ],
  'Systems Thinking': [
    { kind: 'course',  title: 'Thinking in Systems · book club',            source: 'Internal · 4 sessions',    minutes: 240 },
    { kind: 'article', title: 'Mapping a system before you change it',      source: 'Internal Wiki',            minutes: 11 },
  ],
  'Programming Proficiency': [
    { kind: 'course',  title: 'Refactoring patterns deep-dive',             source: 'Internal Academy',         minutes: 220 },
    { kind: 'video',   title: 'Reading code faster',                        source: 'Internal Talk',            minutes: 18 },
  ],
  'Secure Coding': [
    { kind: 'course',  title: 'Secure coding for service teams',            source: 'SecEng · 6 modules',       minutes: 260 },
    { kind: 'article', title: 'OWASP, the short version',                   source: 'Internal Wiki',            minutes: 12 },
  ],
};

function contentFor(skillName) {
  return CONTENT[skillName] || CONTENT.default;
}

window.DATA = { DREYFUS, JOB_FAMILIES, SAMPLE_USER, contentFor };
