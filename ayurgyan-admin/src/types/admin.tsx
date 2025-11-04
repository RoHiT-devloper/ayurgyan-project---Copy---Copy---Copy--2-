export interface User {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'CONTRIBUTOR';
  createdAt: string;
  updatedAt: string;
}

export interface Herb {
  id: number;
  name: string;
  scientificName?: string;
  description: string;
  safetyLevel: 'SAFE' | 'CAUTION' | 'RESTRICTED';
  imageUrl?: string;
  traditionalUses?: string;
  activeCompounds?: string;
  contraindications?: string;
  sideEffects?: string;
  medicinalUses: MedicinalUse[];
  scientificStudies: ScientificStudy[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicinalUse {
  id: number;
  condition: string;
  preparation?: string;
  dosage?: string;
  duration?: string;
  evidenceLevel: 'TRADITIONAL' | 'ANECDOTAL' | 'SCIENTIFIC';
  herbId?: number;
}

export interface ScientificStudy {
  id: number;
  title: string;
  authors?: string;
  journal?: string;
  publicationYear?: number;
  doi?: string;
  studyType?: string;
  evidenceStrength: 'WEAK' | 'MODERATE' | 'STRONG' | 'VERY_STRONG';
  findings?: string;
  url?: string;
  herbId?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  email: string;
  role: string;
}