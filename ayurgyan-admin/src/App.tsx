import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister'; // Add this import
import Dashboard from './pages/Dashboard';
import HerbManagement from './pages/HerbManagement';
import AdminLayout from './components/common/AdminLayout';
import { adminService } from './services/adminService';
import './styles/globals.css';

const App: React.FC = () => {
  const isAuthenticated = adminService.isAuthenticated();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<AdminRegister />} /> {/* Add this route */}
        <Route path="*" element={
          isAuthenticated ? (
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/herbs" element={<HerbManagement />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AdminLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;