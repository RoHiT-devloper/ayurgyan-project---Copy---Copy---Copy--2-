import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/common/Layout';
import ThemeToggle from './components/common/ThemeToggle';
import Home from './pages/Home';
import ApiDebugger from './components/common/ApiDebugger';
import HerbCatalog from './pages/HerbCatalog';
import HerbDetail from './pages/HerbDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import UserFavorites from './pages/UserFavorites';
import { usePageViewTracking } from './hooks/useAnalytics';
import './index.css';

// Move AppContent inside Router context
const AppContent: React.FC = () => {
  usePageViewTracking(); // This hook now has access to Router context
  
  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/herbs" element={<HerbCatalog />} />
              <Route path="/herbs/:id" element={<HerbDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/debug" element={<ApiDebugger />} />
              <Route path="/about" element={<About />} />
              <Route path="/favorites" element={<UserFavorites />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <AppContent />
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;