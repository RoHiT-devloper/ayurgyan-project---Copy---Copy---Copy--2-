import { Herb } from '../types/herb';

// Use environment variable or default to localhost
const API_BASE_URL = 'http://localhost:8081';

class HerbService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
    console.log('HerbService initialized with base URL:', this.baseUrl);
  }

  private async handleResponse(response: Response) {
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    console.log('API Success response:', result);
    
    if (!result.success) {
      throw new Error(result.message || 'API request failed');
    }

    return result.data;
  }

  async getAllHerbs(): Promise<Herb[]> {
    try {
      console.log('Fetching all herbs from:', `${this.baseUrl}/api/herbs`);
      
      const response = await fetch(`${this.baseUrl}/api/herbs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const data = await this.handleResponse(response);
      console.log(`Retrieved ${data.length} herbs from API`);
      return data || [];
    } catch (error) {
      console.error('Error fetching herbs:', error);
      
      // Fallback to legacy endpoint
      try {
        console.log('Trying legacy endpoint...');
        const legacyResponse = await fetch(`${this.baseUrl}/herbs`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const legacyData = await this.handleResponse(legacyResponse);
        console.log(`Retrieved ${legacyData.length} herbs from legacy endpoint`);
        return legacyData || [];
      } catch (legacyError) {
        console.error('Legacy endpoint also failed:', legacyError);
        throw error; // Throw the original error
      }
    }
  }

  async getHerbById(id: number): Promise<Herb> {
    try {
      console.log(`Fetching herb with ID: ${id}`);
      const response = await fetch(`${this.baseUrl}/api/herbs/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error fetching herb ${id}:`, error);
      throw error;
    }
  }

// Remove the AdvancedSearchFilters import and advancedSearch method
// Keep only these methods:

async searchHerbs(params: {
  query?: string;
  safetyLevel?: string;
}): Promise<Herb[]> {
  try {
    const searchParams = new URLSearchParams();
    
    if (params.query) searchParams.append('query', params.query);
    if (params.safetyLevel && params.safetyLevel !== '') {
      searchParams.append('safetyLevel', params.safetyLevel);
    }

    const url = `${this.baseUrl}/api/herbs/search?${searchParams}`;
    console.log('Searching herbs with URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await this.handleResponse(response);
    console.log(`Search found ${data.length} herbs`);
    return data || [];
  } catch (error) {
    console.error('Error searching herbs:', error);
    throw error;
  }
}



  async getHerbsBySafetyLevel(safetyLevel: string): Promise<Herb[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/herbs/safety/${safetyLevel}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error fetching herbs by safety level ${safetyLevel}:`, error);
      throw error;
    }
  }

  // Test API connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/herbs/test`);
      const result = await response.json();
      return result.success === true;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }

  // Health check
  async healthCheck(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/herbs/health`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
}

export const herbService = new HerbService();