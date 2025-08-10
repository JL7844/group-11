export type UserRole = 'client' | 'attorney';

export interface ExperienceEntry {
  id: string;
  title: string; // e.g., "Senior Associate, ABC Law"
  organization: string; // firm or employer
  startYear: number;
  endYear?: number; // undefined means current
  description?: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string; // e.g., JD
  graduationYear: number;
}

export interface LicenseInfo {
  licenseNumber: string;
  jurisdiction: string; // State/Country
  verifiedAt?: string; // ISO date when verified
}

export interface AvailabilitySlot {
  id: string;
  startIso: string; // ISO datetime
  endIso: string; // ISO datetime
}

export interface Review {
  id: string;
  lawyerId: string;
  clientName: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: string; // ISO
  verified: boolean;
}

export type ConsultationType = 'virtual' | 'in_person';
export type ConsultationStatus = 'scheduled' | 'completed' | 'cancelled' | 'paid';

export interface Consultation {
  id: string;
  lawyerId: string;
  clientName: string;
  startsAt: string; // ISO
  endsAt: string; // ISO
  type: ConsultationType;
  status: ConsultationStatus;
  createdAt: string;
}

export interface Message {
  id: string;
  threadId: string;
  sender: 'client' | 'lawyer';
  text: string;
  sentAt: string; // ISO
}

export interface MessageThread {
  id: string;
  lawyerId: string;
  clientName: string;
  createdAt: string;
  messages: Message[];
}

export interface LawyerProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  location: string; // City, State
  coordinates?: { lat: number; lng: number };
  practiceArea: string; // primary area for legacy
  specialties: string[]; // multiple specialties
  languages: string[]; // e.g., ['English','Spanish']
  yearsOfExperience: number;
  hourlyRate: number; // USD per hour
  rating: number; // 0-5 average
  reviewsCount?: number;
  bio?: string;
  experience: ExperienceEntry[];
  education?: EducationEntry[];
  license?: LicenseInfo;
  availability?: AvailabilitySlot[];
  isVerified?: boolean;
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