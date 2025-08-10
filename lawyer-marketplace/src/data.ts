import type { ClientCase, LawyerProfile, Review, Consultation, MessageThread } from './types';

const LAWYERS_KEY = 'lm_lawyers_v2';
const CASES_KEY = 'lm_cases_v1';
const REVIEWS_KEY = 'lm_reviews_v1';
const CONSULTS_KEY = 'lm_consults_v1';
const THREADS_KEY = 'lm_threads_v1';

const seedLawyers: LawyerProfile[] = [
  {
    id: 'l1',
    fullName: 'Ava Johnson',
    email: 'ava.johnson@example.com',
    phone: '212-555-1001',
    location: 'New York, NY',
    coordinates: { lat: 40.7128, lng: -74.006 },
    practiceArea: 'Criminal Defense',
    specialties: ['Criminal Defense', 'White Collar'],
    languages: ['English', 'Spanish'],
    yearsOfExperience: 10,
    hourlyRate: 300,
    rating: 4.7,
    reviewsCount: 32,
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
    education: [
      { id: 'ed1', school: 'Columbia Law School', degree: 'JD', graduationYear: 2013 },
    ],
    license: { licenseNumber: 'NY-123456', jurisdiction: 'New York', verifiedAt: new Date().toISOString() },
    availability: [
      // next week sample slots
      { id: 'a1', startIso: new Date(Date.now() + 24*3600*1000).toISOString(), endIso: new Date(Date.now() + 24*3600*1000 + 60*60*1000).toISOString() },
      { id: 'a2', startIso: new Date(Date.now() + 2*24*3600*1000).toISOString(), endIso: new Date(Date.now() + 2*24*3600*1000 + 60*60*1000).toISOString() },
    ],
    isVerified: true,
    avatarUrl: undefined,
  },
  {
    id: 'l2',
    fullName: 'Mateo García',
    email: 'mateo.garcia@example.com',
    phone: '512-555-2202',
    location: 'Austin, TX',
    coordinates: { lat: 30.2672, lng: -97.7431 },
    practiceArea: 'Immigration',
    specialties: ['Immigration', 'Business Visas'],
    languages: ['English', 'Spanish'],
    yearsOfExperience: 7,
    hourlyRate: 220,
    rating: 4.5,
    reviewsCount: 18,
    bio: 'Immigration advocate helping families and startups with visas and green cards.',
    experience: [
      { id: 'e3', title: 'Associate Attorney', organization: 'Lone Star Immigration Law', startYear: 2018, description: 'Handled complex H-1B and O-1 petitions.' }
    ],
    education: [ { id: 'ed2', school: 'UT Austin School of Law', degree: 'JD', graduationYear: 2017 } ],
    license: { licenseNumber: 'TX-654321', jurisdiction: 'Texas', verifiedAt: new Date().toISOString() },
    availability: [
      { id: 'a3', startIso: new Date(Date.now() + 3*24*3600*1000).toISOString(), endIso: new Date(Date.now() + 3*24*3600*1000 + 60*60*1000).toISOString() },
    ],
    isVerified: true,
    avatarUrl: undefined,
  },
  {
    id: 'l3',
    fullName: 'Sofia Rossi',
    email: 'sofia.rossi@example.com',
    phone: '312-555-3303',
    location: 'Chicago, IL',
    coordinates: { lat: 41.8781, lng: -87.6298 },
    practiceArea: 'Family Law',
    specialties: ['Family Law', 'Mediation'],
    languages: ['English', 'Italian'],
    yearsOfExperience: 12,
    hourlyRate: 260,
    rating: 4.8,
    reviewsCount: 44,
    bio: 'Family law specialist with a focus on custody and mediation.',
    experience: [
      { id: 'e4', title: 'Partner', organization: 'Rossi & Nguyen', startYear: 2021, description: 'Leads the family law practice group.' },
      { id: 'e5', title: 'Associate', organization: 'Lakefront Legal Group', startYear: 2013, endYear: 2021 }
    ],
    education: [ { id: 'ed3', school: 'Northwestern Pritzker School of Law', degree: 'JD', graduationYear: 2012 } ],
    license: { licenseNumber: 'IL-777888', jurisdiction: 'Illinois', verifiedAt: new Date().toISOString() },
    availability: [
      { id: 'a4', startIso: new Date(Date.now() + 6*3600*1000).toISOString(), endIso: new Date(Date.now() + 7*3600*1000).toISOString() },
    ],
    isVerified: true,
    avatarUrl: undefined,
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

export function loadReviews(): Review[] {
  const raw = localStorage.getItem(REVIEWS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as Review[]; } catch { return []; }
}

export function saveReviews(reviews: Review[]) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

export function loadConsultations(): Consultation[] {
  const raw = localStorage.getItem(CONSULTS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as Consultation[]; } catch { return []; }
}

export function saveConsultations(items: Consultation[]) {
  localStorage.setItem(CONSULTS_KEY, JSON.stringify(items));
}

export function loadThreads(): MessageThread[] {
  const raw = localStorage.getItem(THREADS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as MessageThread[]; } catch { return []; }
}

export function saveThreads(threads: MessageThread[]) {
  localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
}