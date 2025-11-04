const API_BASE_URL = 'http://localhost:8081';

class ApiClient {
  private async request(endpoint: string, options: RequestInit = {}) {
        // Auto-correct common endpoint mismatches
    if (endpoint === '/herbs' && !endpoint.startsWith('/api/')) {
      endpoint = '/api' + endpoint;
    }
    const token = localStorage.getItem('adminToken');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include', // Important for CORS with credentials
      });

      // Handle 401 Unauthorized
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/login';
        throw new Error('Authentication failed');
      }

      // Handle other error statuses
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error (${response.status}): ${errorText}`);
      }

      // Try to parse JSON response
      const text = await response.text();
      if (!text) {
        return null; // No content
      }

      return JSON.parse(text);
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request(endpoint);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();