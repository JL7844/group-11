import type { ClientCase, LawyerProfile } from './types';

const LAWYERS_KEY = 'lm_lawyers_v1';
const CASES_KEY = 'lm_cases_v1';

const seedLawyers: LawyerProfile[] = [
  {
    id: 'l1',
    fullName: 'Ava Johnson',
    email: 'ava.johnson@example.com',
    location: 'New York, NY',
    practiceArea: 'Criminal Defense',
    yearsOfExperience: 10,
    hourlyRate: 300,
    rating: 4.7,
    bio: 'Former ADA with a decade of courtroom experience. Focused on defending complex felony cases.',
    experience: [
      {
        id: 'e1',
        title: 'Senior Associate',
        organization: 'Johnson & Patel LLP',
        startYear: 2020,
        description: 'Lead counsel on high-profile criminal defense matters.'
      },
      {
        id: 'e2',
        title: 'Assistant District Attorney',
        organization: 'NY County DA Office',
        startYear: 2014,
        endYear: 2020,
        description: 'Prosecuted felony cases; tried 30+ jury trials.'
      }
    ],
    avatarUrl: undefined,
    phone: '212-555-1001',
  },
  {
    id: 'l2',
    fullName: 'Mateo García',
    email: 'mateo.garcia@example.com',
    location: 'Austin, TX',
    practiceArea: 'Immigration',
    yearsOfExperience: 7,
    hourlyRate: 220,
    rating: 4.5,
    bio: 'Immigration advocate helping families and startups with visas and green cards.',
    experience: [
      {
        id: 'e3',
        title: 'Associate Attorney',
        organization: 'Lone Star Immigration Law',
        startYear: 2018,
        description: 'Handled complex H-1B and O-1 petitions.'
      }
    ],
    avatarUrl: undefined,
    phone: '512-555-2202',
  },
  {
    id: 'l3',
    fullName: 'Sofia Rossi',
    email: 'sofia.rossi@example.com',
    location: 'Chicago, IL',
    practiceArea: 'Family Law',
    yearsOfExperience: 12,
    hourlyRate: 260,
    rating: 4.8,
    bio: 'Family law specialist with a focus on custody and mediation.',
    experience: [
      {
        id: 'e4',
        title: 'Partner',
        organization: 'Rossi & Nguyen',
        startYear: 2021,
        description: 'Leads the family law practice group.'
      },
      {
        id: 'e5',
        title: 'Associate',
        organization: "Lakefront Legal Group",
        startYear: 2013,
        endYear: 2021
      }
    ],
    avatarUrl: undefined,
    phone: '312-555-3303',
  }
];

export function loadLawyers(): LawyerProfile[] {
  const raw = localStorage.getItem(LAWYERS_KEY);
  if (!raw) {
    localStorage.setItem(LAWYERS_KEY, JSON.stringify(seedLawyers));
    return seedLawyers;
  }
  try {
    return JSON.parse(raw) as LawyerProfile[];
  } catch (e) {
    console.error('Failed to parse lawyers; reseeding', e);
    localStorage.setItem(LAWYERS_KEY, JSON.stringify(seedLawyers));
    return seedLawyers;
  }
}

export function saveLawyers(lawyers: LawyerProfile[]) {
  localStorage.setItem(LAWYERS_KEY, JSON.stringify(lawyers));
}

export function loadCases(): ClientCase[] {
  const raw = localStorage.getItem(CASES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ClientCase[];
  } catch (e) {
    console.error('Failed to parse cases; returning empty', e);
    return [];
  }
}

export function saveCases(cases: ClientCase[]) {
  localStorage.setItem(CASES_KEY, JSON.stringify(cases));
}