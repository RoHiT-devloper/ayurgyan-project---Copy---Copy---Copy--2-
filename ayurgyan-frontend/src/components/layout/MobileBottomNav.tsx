import React from 'react';
import { useLocation } from 'react-router-dom';
import { Home, Search, BookOpen, Heart, User } from 'lucide-react';
import './ResponsiveLayout.css';

interface MobileBottomNavProps {
  onNavigate: (path: string) => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onNavigate }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/herbs', icon: Search, label: 'Browse' },
    { path: '/search', icon: BookOpen, label: 'Search' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const handleNavigation = (path: string) => {
    onNavigate(path);
  };

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-nav-items">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} className="mobile-nav-icon" />
              <span className="mobile-nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;