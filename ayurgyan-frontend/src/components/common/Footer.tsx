import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="logo-icon">A</div>
              <span className="brand-text">AyurGyan</span>
            </div>
            <p className="brand-description">
              A comprehensive digital encyclopedia of traditional and herbal medicine, 
              documenting ancient knowledge with scientific validation for modern healthcare.
            </p>
            <p className="brand-notice">
              Aligned with UN Sustainable Development Goal 3: Good Health and Well-being
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/herbs" className="footer-link">Herb Catalog</Link></li>
              <li><Link to="/search" className="footer-link">Advanced Search</Link></li>
              <li><Link to="/about" className="footer-link">About Project</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Safety Guidelines</a></li>
              <li><a href="#" className="footer-link">Research Papers</a></li>
              <li><a href="#" className="footer-link">Traditional Texts</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © 2024 AyurGyan. All rights reserved.
          </p>
          <div>
            <p className="disclaimer">
              Important: This information is for educational purposes only. Always consult healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;