import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Leaf, Settings } from 'lucide-react';
import './AdminSidebar.css';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/',
      icon: LayoutDashboard,
      label: 'Dashboard',
    },
    {
      path: '/herbs',
      icon: Leaf,
      label: 'Herb Management',
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="admin-sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className="sidebar-menu-item">
                <Link
                  to={item.path}
                  className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  <Icon size={20} className="sidebar-icon" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;