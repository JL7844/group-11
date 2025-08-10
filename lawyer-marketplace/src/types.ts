export type UserRole = 'client' | 'attorney';

export interface ExperienceEntry {
  id: string;
  title: string; // e.g., "Senior Associate, ABC Law"
  organization: string; // firm or employer
  startYear: number;
  endYear?: number; // undefined means current
  description?: string;
}

export interface LawyerProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  location: string; // City, State
  practiceArea: string; // e.g., "Criminal Defense"
  yearsOfExperience: number;
  hourlyRate: number; // USD per hour
  rating: number; // 0-5
  bio?: string;
  experience: ExperienceEntry[];
  avatarUrl?: string;
}

export interface ClientCase {
  id: string;
  clientName: string;
  title: string;
  description: string;
  location: string;
  practiceArea: string;
  createdAt: string; // ISO
  assignedLawyerId?: string;
}