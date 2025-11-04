import { api } from './api';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/user';

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('🔐 Sending login request to /auth/login');
      console.log('Request data:', { username: credentials.username, password: '***' });
      
      const response = await api.post('/auth/login', credentials);
      console.log('✅ Login successful:', response.data);
      
      // Store token and user info
      if (response.data.data) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify({
          username: response.data.data.username,
          email: response.data.data.email,
          role: response.data.data.role
        }));
      }
      
      return response.data.data;
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      const errorMessage = error.response?.data?.message || 'Login failed';
      throw new Error(errorMessage);
    }
  },

  async register(userData: RegisterRequest): Promise<void> {
    try {
      console.log('👤 Sending registration request to /auth/register');
      console.log('Request data:', { 
        username: userData.username, 
        email: userData.email, 
        password: '***' 
      });
      
      const response = await api.post('/auth/register', userData);
      console.log('✅ Registration successful:', response.data);
      return response.data.data;
    } catch (error: any) {
      console.error('❌ Registration failed:', error);
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      const errorMessage = error.response?.data?.message || 'Registration failed';
      throw new Error(errorMessage);
    }
  },

  logout(): void {
    console.log('🚪 Logging out user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  }
};