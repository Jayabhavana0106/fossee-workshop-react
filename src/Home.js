import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const FEATURES = [
  { icon: '🎓', title: 'Expert-Led Workshops', desc: 'Hands-on sessions led by IIT Bombay instructors and domain experts.' },
  { icon: '📅', title: 'Easy Booking', desc: 'Coordinators can propose and manage workshop dates in just a few clicks.' },
  { icon: '📊', title: 'Live Statistics', desc: 'Track workshop reach, attendance, and impact with real-time analytics.' },
  { icon: '📱', title: 'Mobile-First', desc: 'Designed for students on the go — works beautifully on any device.' },
];

const SAMPLE_WORKSHOPS = [
  { id: 1, name: 'Python for Scientific Computing', duration: 2, tag: 'Programming' },
  { id: 2, name: 'Scilab Fundamentals', duration: 3, tag: 'Math' },
  { id: 3, name: 'DWSIM Process Simulation', duration: 1, tag: 'Engineering' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-blob blob1" />
          <div className="hero-blob blob2" />
        </div>
        <div className="container hero-content">
          <span className="hero-eyebrow">IIT Bombay · FOSSEE Initiative</span>
          <h1 id="hero-heading">
            Upskill with<br />
            <em>FOSSEE Workshops</em>
          </h1>
          <p className="hero-sub">
            Free hands-on workshops on open-source scientific computing tools,
            available to students and educators across India.
          </p>
          <div className="hero-actions">
            <Link to="/workshops" className="btn btn-primary">Browse Workshops</Link>
            {!user && <Link to="/register" className="btn btn-outline">Register Free</Link>}
            {user && <Link to="/propose" className="btn btn-outline">Propose a Workshop</Link>}
          </div>
          <div className="hero-stats" role="list" aria-label="Impact statistics">
            {[['500+','Workshops Held'], ['12,000+','Students Reached'], ['200+','Colleges'], ['15+','Topics']].map(([n,l]) => (
              <div key={l} className="stat-item" role="listitem">
                <strong>{n}</strong><span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" aria-labelledby="features-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="features-heading">Why FOSSEE Workshops?</h2>
            <p>Everything you need to learn, teach, and collaborate.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map(f => (
              <article key={f.title} className="feature-card card">
                <span className="feature-icon" aria-hidden="true">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sample workshops */}
      <section className="section section-alt" aria-labelledby="workshops-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="workshops-heading">Popular Workshops</h2>
            <p>A snapshot of what's available on the platform.</p>
          </div>
          <div className="workshops-list" role="list">
            {SAMPLE_WORKSHOPS.map(w => (
              <article key={w.id} className="workshop-row card" role="listitem">
                <div className="wrow-info">
                  <span className="badge">{w.tag}</span>
                  <h3 className="wrow-name">{w.name}</h3>
                  <p className="wrow-meta">Duration: {w.duration} day{w.duration > 1 ? 's' : ''}</p>
                </div>
                <Link to={`/workshops/${w.id}`} className="btn btn-outline btn-sm">View Details</Link>
              </article>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:'2rem'}}>
            <Link to="/workshops" className="btn btn-primary">View All Workshops →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="cta-section" aria-labelledby="cta-heading">
          <div className="container">
            <div className="cta-box card">
              <h2 id="cta-heading">Ready to get started?</h2>
              <p>Create a free coordinator account and propose workshops at your institution.</p>
              <div className="cta-actions">
                <Link to="/register" className="btn btn-primary">Create Account</Link>
                <Link to="/login" className="btn btn-ghost">Sign In</Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}