import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';
import { useAnalytics } from '../../hooks/useAnalytics';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { trackEvent } = useAnalytics();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Herb Catalog', href: '/herbs' },
    { name: 'Search', href: '/search' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearchClick = () => {
    trackEvent({
      category: 'Navigation',
      action: 'Search Clicked',
      label: 'Header'
    });
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">A</div>
            <span className="logo-text">AyurGyan</span>
          </Link>

          {/* Navigation */}
          <nav className="nav-desktop">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? 'nav-link-active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and User */}
          <div className="header-actions">
            <Link
              to="/search"
              className="search-button"
              onClick={handleSearchClick}
            >
              <Search size={20} />
            </Link>

            {user ? (
              <div className="user-info">
                <User size={16} />
                <span>{user.username}</span>
                <button
                  onClick={logout}
                  className="logout-button"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link
                  to="/login"
                  className="btn btn-secondary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button className="mobile-menu-button">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;