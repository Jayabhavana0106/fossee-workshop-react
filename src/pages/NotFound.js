import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main id="main-content" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔍</p>
        <h1 style={{ fontSize: '2rem', marginBottom: '.75rem' }}>Page Not Found</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    </main>
  );
}