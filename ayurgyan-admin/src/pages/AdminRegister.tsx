import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, ArrowLeft } from 'lucide-react';
import { adminService } from '../services/adminService';
import '../styles/globals.css';
import './AdminRegister.css';

const AdminRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminKey: 'AYURGYAN_ADMIN_2024' // Additional security for admin registration
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = (): boolean => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    // Simple admin key validation (in production, use a more secure method)
    if (formData.adminKey !== 'AYURGYAN_ADMIN_2024') {
      setError('Invalid admin registration key');
      return false;
    }

    return true;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setLoading(true);
  setError('');
  setSuccess('');

  try {
    console.log('Attempting admin registration for:', formData.username);
    
    await adminService.register({
      username: formData.username,
      email: formData.email,
      password: formData.password
    });
    
    setSuccess('Admin account created successfully! Redirecting to login...');
    
    // Use setTimeout with window.location to avoid extension issues
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
    
  } catch (err: any) {
    console.error('Admin registration failed:', err);
    setError(err.message || 'Admin registration failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="admin-register-container">
      <div className="admin-register-card">
        <div className="admin-register-header">
          <Link to="/login" className="back-button">
            <ArrowLeft size={20} />
            Back to Login
          </Link>
          
          <div className="logo">
            <Leaf size={32} className="logo-icon" />
            <h1>Create Admin Account</h1>
          </div>
          <p>Register a new administrator for AyurGyan</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-register-form">
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              <strong>Success:</strong> {success}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username *
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
              minLength={3}
            />
            <div className="form-hint">Minimum 3 characters</div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter admin email"
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter password"
              disabled={loading}
              autoComplete="new-password"
              minLength={6}
            />
            <div className="form-hint">Minimum 6 characters</div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Confirm password"
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="adminKey" className="form-label">
              Admin Registration Key *
            </label>
            <input
              type="password"
              id="adminKey"
              name="adminKey"
              value={formData.adminKey}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter admin registration key"
              disabled={loading}
            />
            <div className="form-hint">
              Contact system administrator for the registration key
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <>
                <div className="spinner spinner-sm"></div>
                Creating Admin Account...
              </>
            ) : (
              'Create Admin Account'
            )}
          </button>
        </form>

        <div className="register-footer">
          <p className="disclaimer">
            <strong>Security Notice:</strong> Admin accounts have full access to the system. 
            Only authorized personnel should create admin accounts.
          </p>
          <p className="disclaimer">
            <strong>Default Key:</strong> AYURGYAN_ADMIN_2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;