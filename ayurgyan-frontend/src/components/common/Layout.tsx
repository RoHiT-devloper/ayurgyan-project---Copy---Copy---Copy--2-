import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from '../layout/MobileBottomNav';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleMobileNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <MobileBottomNav onNavigate={handleMobileNavigation} />
    </div>
  );
};

export default Layout;