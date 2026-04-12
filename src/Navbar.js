import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setProfileOpen(false);
    navigate('/login');
  };

  const close = () => { setMenuOpen(false); setProfileOpen(false); };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="navbar" role="banner">
        <div className="navbar-inner container">
          <Link to="/" className="brand" onClick={close} aria-label="FOSSEE Workshops – Home">
            <span className="brand-icon" aria-hidden="true">◉</span>
            <span className="brand-text">FOSSEE <span>Workshops</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-links" aria-label="Main navigation">
            <NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/workshops" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Workshops</NavLink>
            <NavLink to="/statistics" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Statistics</NavLink>
            {user && (
              <>
                <NavLink to="/status" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>My Workshops</NavLink>
                {user.role !== 'instructor' && (
                  <NavLink to="/propose" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Propose</NavLink>
                )}
              </>
            )}
          </nav>

          <div className="nav-actions">
            {user ? (
              <div className="profile-wrap">
                <button
                  className="profile-btn"
                  onClick={() => setProfileOpen(o => !o)}
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                  aria-label={`Account menu for ${user.name}`}
                >
                  <span className="avatar" aria-hidden="true">{user.name[0].toUpperCase()}</span>
                  <span className="profile-name">{user.name}</span>
                  <span className="chevron" aria-hidden="true">▾</span>
                </button>
                {profileOpen && (
                  <div className="dropdown" role="menu">
                    <Link to="/profile" className="dropdown-item" role="menuitem" onClick={close}>Profile</Link>
                    <Link to="/change-password" className="dropdown-item" role="menuitem" onClick={close}>Change Password</Link>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item danger" role="menuitem" onClick={handleLogout}>Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-btns">
                <Link to="/login" className="btn btn-ghost btn-sm">Sign in</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
              </div>
            )}

            <button
              className="hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-label="Toggle mobile menu"
              aria-controls="mobile-menu"
            >
              <span className={`ham-bar ${menuOpen ? 'open' : ''}`} />
              <span className={`ham-bar ${menuOpen ? 'open' : ''}`} />
              <span className={`ham-bar ${menuOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
            <NavLink to="/" end className="mobile-link" onClick={close}>Home</NavLink>
            <NavLink to="/workshops" className="mobile-link" onClick={close}>Workshops</NavLink>
            <NavLink to="/statistics" className="mobile-link" onClick={close}>Statistics</NavLink>
            {user && (
              <>
                <NavLink to="/status" className="mobile-link" onClick={close}>My Workshops</NavLink>
                {user.role !== 'instructor' && (
                  <NavLink to="/propose" className="mobile-link" onClick={close}>Propose Workshop</NavLink>
                )}
                <NavLink to="/profile" className="mobile-link" onClick={close}>Profile</NavLink>
                <button className="mobile-link danger-link" onClick={handleLogout}>Sign Out</button>
              </>
            )}
            {!user && (
              <div className="mobile-auth">
                <Link to="/login" className="btn btn-ghost btn-full" onClick={close}>Sign in</Link>
                <Link to="/register" className="btn btn-primary btn-full" onClick={close}>Register</Link>
              </div>
            )}
          </nav>
        )}
      </header>
    </>
  );
}