import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Make sure Link is imported
import { Leaf } from 'lucide-react';
import { adminService } from '../services/adminService';
import '../styles/globals.css';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', formData.username);
      const response = await adminService.login(formData);
      
      console.log('Login successful, storing token');
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminUser', JSON.stringify({
        username: response.username,
        email: response.email,
        role: response.role
      }));
      
      console.log('Redirecting to dashboard');
      // Use window.location instead of navigate to avoid extension issues
      window.location.href = '/';
      
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Invalid admin credentials. Please check your username and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="logo">
            <Leaf size={32} className="logo-icon" />
            <h1>AyurGyan Admin</h1>
          </div>
          <p>Sign in to access the admin portal</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter admin username"
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter admin password"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <>
                <div className="spinner spinner-sm"></div>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="register-link">
            Need an admin account?{' '}
            <Link to="/register" className="register-cta">
              Register here
            </Link>
          </p>
          <p className="disclaimer">
            <strong>Note:</strong> This portal is for authorized administrators only.
            Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;