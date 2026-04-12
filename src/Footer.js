import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="brand-icon">◉</span>
            <span className="footer-name">FOSSEE Workshops</span>
            <p className="footer-tagline">
              Free and Open Source Software for Education — IIT Bombay
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <strong>Platform</strong>
            <Link to="/">Home</Link>
            <Link to="/workshops">Browse Workshops</Link>
            <Link to="/statistics">Statistics</Link>
            <Link to="/propose">Propose a Workshop</Link>
          </nav>
          <nav className="footer-links" aria-label="Account navigation">
            <strong>Account</strong>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Register</Link>
            <Link to="/change-password">Change Password</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} FOSSEE, IIT Bombay. All rights reserved.</p>
          <p className="footer-dev">Redesigned with React &amp; accessibility in mind.</p>
        </div>
      </div>
    </footer>
  );
}