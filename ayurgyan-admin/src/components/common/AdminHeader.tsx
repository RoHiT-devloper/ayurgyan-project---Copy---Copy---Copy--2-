import React from 'react';
import { LogOut, User } from 'lucide-react';
import { adminService } from '../../services/adminService';
import './AdminHeader.css';

const AdminHeader: React.FC = () => {
  const user = adminService.getCurrentUser();

  const handleLogout = () => {
    adminService.logout();
    window.location.href = '/login';
  };

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        <div className="admin-header-brand">
          <h1>AyurGyan Admin</h1>
        </div>
        
        <div className="admin-header-actions">
          <div className="user-info">
            <User size={16} />
            <span>{user?.username}</span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="logout-btn"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;