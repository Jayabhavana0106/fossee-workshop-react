import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './WorkshopDetail.css';

const WORKSHOPS = {
  1:  { name: 'Python for Scientific Computing',  duration: 2, tag: 'Programming',
        description: 'A comprehensive workshop covering Python fundamentals for scientific and numerical computing. Topics include NumPy, SciPy, Matplotlib, and Pandas for data analysis and visualization.',
        tnc: 'The host institution must provide a computer lab with at least 30 working systems with internet connectivity. The coordinator must ensure all students bring college ID. Attendance must be recorded and submitted within 48 hours of the workshop.' },
  2:  { name: 'Scilab Fundamentals',              duration: 3, tag: 'Math',
        description: 'Learn Scilab, a free open-source alternative to MATLAB. Covers matrix operations, plotting, signal processing, and control systems with hands-on exercises.',
        tnc: 'Minimum 20 participants required. Lab systems must have Scilab 6.x pre-installed. Coordinator must complete the pre-workshop checklist 7 days before the event.' },
  3:  { name: 'DWSIM Process Simulation',         duration: 1, tag: 'Engineering',
        description: 'Introduction to DWSIM, the free chemical process simulator. Ideal for chemical engineering students to model and simulate industrial processes.',
        tnc: 'Participants must have basic knowledge of chemical engineering unit operations. A minimum of 15 participants is required.' },
  4:  { name: 'OpenFOAM – CFD Basics',            duration: 2, tag: 'Engineering',
        description: 'Hands-on workshop on Computational Fluid Dynamics using OpenFOAM. Covers mesh generation, solver setup, boundary conditions, and post-processing with ParaView.',
        tnc: 'Linux systems required. Minimum 10 participants. Coordinator must ensure OpenFOAM 8+ is installed before the workshop.' },
  5:  { name: 'R for Data Analysis',              duration: 2, tag: 'Data Science',
        description: 'Practical introduction to R programming for statistical analysis and data visualization. Covers tidyverse, ggplot2, and basic machine learning concepts.',
        tnc: 'Students must have basic statistics knowledge. R and RStudio must be pre-installed on lab computers.' },
};

const TAG_COLORS = {
  Programming: '#1a5c38', Math: '#7b3fa0', Engineering: '#b85c00',
  'Data Science': '#0057a8',
};

export default function WorkshopDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const w = WORKSHOPS[parseInt(id)];

  if (!w) return (
    <main id="main-content">
      <div className="container" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1rem' }}>Workshop Not Found</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          This workshop type doesn't exist or has been removed.
        </p>
        <Link to="/workshops" className="btn btn-primary">← Back to Workshops</Link>
      </div>
    </main>
  );

  const tagColor = TAG_COLORS[w.tag] || '#555';

  return (
    <main id="main-content">
      <div className="container detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/workshops">Workshops</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{w.name}</span>
        </nav>

        <div className="detail-grid">
          {/* Main content */}
          <div className="detail-main">
            <div className="detail-hero card">
              <div className="detail-tag" style={{ background: tagColor }}>{w.tag}</div>
              <h1 className="detail-title">{w.name}</h1>
              <div className="detail-meta">
                <span className="meta-chip">⏱ {w.duration} day{w.duration > 1 ? 's' : ''}</span>
                <span className="meta-chip">🎓 Hands-on</span>
                <span className="meta-chip">🆓 Free</span>
              </div>
            </div>

            <div className="card detail-section">
              <h2>About this Workshop</h2>
              <p>{w.description}</p>
            </div>

            <div className="card detail-section">
              <h2>Terms & Conditions</h2>
              <div className="tnc-box">
                <p>{w.tnc}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="detail-sidebar" aria-label="Workshop actions">
            <div className="card sidebar-card">
              <h2>Interested?</h2>
              {user ? (
                user.role !== 'instructor' ? (
                  <>
                    <p>Propose this workshop at your institution.</p>
                    <Link
                      to={`/propose?type=${id}`}
                      className="btn btn-primary btn-full"
                    >
                      Propose Workshop
                    </Link>
                  </>
                ) : (
                  <p className="text-muted">Instructors cannot propose workshops.</p>
                )
              ) : (
                <>
                  <p>Sign in to propose this workshop at your college.</p>
                  <Link to="/login" className="btn btn-primary btn-full">Sign In to Propose</Link>
                  <Link to="/register" className="btn btn-ghost btn-full" style={{ marginTop: '.75rem' }}>
                    Create Account
                  </Link>
                </>
              )}
            </div>

            <div className="card sidebar-card">
              <h3>Workshop Details</h3>
              <dl className="detail-dl">
                <dt>Duration</dt>
                <dd>{w.duration} day{w.duration > 1 ? 's' : ''}</dd>
                <dt>Category</dt>
                <dd>{w.tag}</dd>
                <dt>Mode</dt>
                <dd>In-person (at your college)</dd>
                <dt>Cost</dt>
                <dd>Free for all participants</dd>
              </dl>
            </div>
          </aside>
        </div>

        <Link to="/workshops" className="btn btn-ghost back-btn">← Back to All Workshops</Link>
      </div>
    </main>
  );
}