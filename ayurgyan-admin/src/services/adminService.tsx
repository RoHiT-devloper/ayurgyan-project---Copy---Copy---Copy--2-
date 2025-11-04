import { api } from './api';
import { Herb, MedicinalUse, ScientificStudy, LoginRequest, LoginResponse, ApiResponse } from '../types/admin';

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export const adminService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response: ApiResponse<LoginResponse> = await api.post('/auth/admin/login', credentials);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  },

  async register(credentials: RegisterRequest): Promise<void> {
    try {
      const response: ApiResponse<void> = await api.post('/auth/admin/register', credentials);
      if (!response.success) {
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Registration failed');
    }
  },

  async getAllHerbs(): Promise<Herb[]> {
    try {
      const response: ApiResponse<Herb[]> = await api.get('/api/herbs');
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data || [];
    } catch (error: any) {
      console.error('Get herbs error:', error);
      throw new Error(error.message || 'Failed to fetch herbs');
    }
  },

  async getHerbById(id: number): Promise<Herb> {
    try {
      const response: ApiResponse<Herb> = await api.get(`/api/herbs/${id}`);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (error: any) {
      console.error('Get herb error:', error);
      throw new Error(error.message || 'Failed to fetch herb');
    }
  },

  async createHerb(herbData: Partial<Herb>): Promise<Herb> {
    try {
      const response: ApiResponse<Herb> = await api.post('/api/herbs', herbData);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (error: any) {
      console.error('Create herb error:', error);
      throw new Error(error.message || 'Failed to create herb');
    }
  },

  async updateHerb(id: number, herbData: Partial<Herb>): Promise<Herb> {
    try {
      const response: ApiResponse<Herb> = await api.put(`/api/herbs/${id}`, herbData);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (error: any) {
      console.error('Update herb error:', error);
      throw new Error(error.message || 'Failed to update herb');
    }
  },

  async deleteHerb(id: number): Promise<void> {
    try {
      const response: ApiResponse<void> = await api.delete(`/api/herbs/${id}`);
      if (!response.success) {
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error('Delete herb error:', error);
      throw new Error(error.message || 'Failed to delete herb');
    }
  },

  async createMedicinalUse(medicinalUseData: Partial<MedicinalUse>): Promise<MedicinalUse> {
    try {
      console.log('Creating medicinal use:', medicinalUseData);
      
      const payload: any = {
        condition: medicinalUseData.condition,
        preparation: medicinalUseData.preparation,
        dosage: medicinalUseData.dosage,
        duration: medicinalUseData.duration,
        evidenceLevel: medicinalUseData.evidenceLevel
      };
      
      if (medicinalUseData.herbId) {
        payload.herb = { id: medicinalUseData.herbId };
      }
      
      const response: ApiResponse<MedicinalUse> = await api.post('/api/medicinal-uses', payload);
      if (!response.success) {
        throw new Error(response.message);
      }
      console.log('Medicinal use created successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Create medicinal use error:', error);
      throw new Error(error.message || 'Failed to create medicinal use');
    }
  },

  async updateMedicinalUse(id: number, medicinalUseData: Partial<MedicinalUse>): Promise<MedicinalUse> {
    try {
      console.log('Updating medicinal use:', id, medicinalUseData);
      
      const payload: any = {
        condition: medicinalUseData.condition,
        preparation: medicinalUseData.preparation,
        dosage: medicinalUseData.dosage,
        duration: medicinalUseData.duration,
        evidenceLevel: medicinalUseData.evidenceLevel
      };
      
      const response: ApiResponse<MedicinalUse> = await api.put(`/api/medicinal-uses/${id}`, payload);
      if (!response.success) {
        throw new Error(response.message);
      }
      console.log('Medicinal use updated successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Update medicinal use error:', error);
      throw new Error(error.message || 'Failed to update medicinal use');
    }
  },

  async deleteMedicinalUse(id: number): Promise<void> {
    try {
      console.log('Deleting medicinal use:', id);
      
      const response: ApiResponse<void> = await api.delete(`/api/medicinal-uses/${id}`);
      if (!response.success) {
        throw new Error(response.message);
      }
      console.log('Medicinal use deleted successfully');
    } catch (error: any) {
      console.error('Delete medicinal use error:', error);
      throw new Error(error.message || 'Failed to delete medicinal use');
    }
  },

  async createScientificStudy(studyData: Partial<ScientificStudy>): Promise<ScientificStudy> {
    try {
      console.log('Creating scientific study:', studyData);
      
      const payload: any = {
        title: studyData.title,
        authors: studyData.authors,
        journal: studyData.journal,
        publicationYear: studyData.publicationYear,
        doi: studyData.doi,
        studyType: studyData.studyType,
        evidenceStrength: studyData.evidenceStrength,
        findings: studyData.findings,
        url: studyData.url
      };
      
      if (studyData.herbId) {
        payload.herb = { id: studyData.herbId };
      }
      
      const response: ApiResponse<ScientificStudy> = await api.post('/api/scientific-studies', payload);
      if (!response.success) {
        throw new Error(response.message);
      }
      console.log('Scientific study created successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Create scientific study error:', error);
      throw new Error(error.message || 'Failed to create scientific study');
    }
  },

  async updateScientificStudy(id: number, studyData: Partial<ScientificStudy>): Promise<ScientificStudy> {
    try {
      console.log('Updating scientific study:', id, studyData);
      
      const payload: any = {
        title: studyData.title,
        authors: studyData.authors,
        journal: studyData.journal,
        publicationYear: studyData.publicationYear,
        doi: studyData.doi,
        studyType: studyData.studyType,
        evidenceStrength: studyData.evidenceStrength,
        findings: studyData.findings,
        url: studyData.url
      };
      
      const response: ApiResponse<ScientificStudy> = await api.put(`/api/scientific-studies/${id}`, payload);
      if (!response.success) {
        throw new Error(response.message);
      }
      console.log('Scientific study updated successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Update scientific study error:', error);
      throw new Error(error.message || 'Failed to update scientific study');
    }
  },

  async deleteScientificStudy(id: number): Promise<void> {
    try {
      console.log('Deleting scientific study:', id);
      
      const response: ApiResponse<void> = await api.delete(`/api/scientific-studies/${id}`);
      if (!response.success) {
        throw new Error(response.message);
      }
      console.log('Scientific study deleted successfully');
    } catch (error: any) {
      console.error('Delete scientific study error:', error);
      throw new Error(error.message || 'Failed to delete scientific study');
    }
  },

  logout(): void {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },

  getCurrentUser() {
    const user = localStorage.getItem('adminUser');
    return user ? JSON.parse(user) : null;
  },

  validateToken(): boolean {
    const token = localStorage.getItem('adminToken');
    if (!token) return false;
    
    try {
      // Simple check for token expiration (you might want to use a proper JWT library)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      
      if (isExpired) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      this.logout();
      return false;
    }
  },

  isAuthenticated(): boolean {
    return this.validateToken();
  }
};