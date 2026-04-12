import { useState } from 'react';
import './WorkshopStatus.css';

const STATUS_STYLES = {
  Pending:   { bg: '#fff8e1', color: '#b45309', label: 'Pending' },
  Approved:  { bg: '#e8f5ee', color: '#1a5c38', label: 'Approved' },
  Rejected:  { bg: '#fdecea', color: '#c0392b', label: 'Rejected' },
  Completed: { bg: '#e8eaf6', color: '#3949ab', label: 'Completed' },
};

const MOCK_WORKSHOPS = [
  { id: 101, name: 'Python for Scientific Computing', date: '2024-03-15', duration: 2, students: 38, status: 'Completed' },
  { id: 102, name: 'Scilab Fundamentals',              date: '2024-06-20', duration: 3, students: 25, status: 'Approved'  },
  { id: 103, name: 'LaTeX for Research Writing',       date: '2024-09-10', duration: 1, students: 0,  status: 'Pending'   },
  { id: 104, name: 'DWSIM Process Simulation',         date: '2024-01-05', duration: 1, students: 20, status: 'Rejected'  },
];

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.Pending;
  return (
    <span
      className="status-badge"
      style={{ background: s.bg, color: s.color }}
      aria-label={`Status: ${s.label}`}
    >
      {s.label}
    </span>
  );
}

export default function WorkshopStatus() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Pending', 'Approved', 'Completed', 'Rejected'];

  const shown = MOCK_WORKSHOPS.filter(w => filter === 'All' || w.status === filter);

  return (
    <main id="main-content">
      <div className="container">
        <div className="page-heading">
          <h1>My Workshops</h1>
          <p>Track all workshops you've proposed and their current status.</p>
        </div>

        {/* Summary cards */}
        <div className="status-summary" role="list" aria-label="Workshop summary">
          {Object.entries(STATUS_STYLES).map(([key, s]) => {
            const count = MOCK_WORKSHOPS.filter(w => w.status === key).length;
            return (
              <button
                key={key}
                className={`summary-card${filter === key ? ' active' : ''}`}
                style={{ '--accent-col': s.color, '--accent-bg': s.bg }}
                onClick={() => setFilter(filter === key ? 'All' : key)}
                role="listitem"
                aria-pressed={filter === key}
              >
                <span className="summary-count">{count}</span>
                <span className="summary-label">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter pills */}
        <div className="filter-pills" role="group" aria-label="Filter workshops by status">
          {filters.map(f => (
            <button
              key={f}
              className={`pill${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        {shown.length === 0 ? (
          <div className="empty-state" role="status">
            <span aria-hidden="true">📋</span>
            <p>No {filter.toLowerCase()} workshops found.</p>
          </div>
        ) : (
          <div className="status-list" role="list">
            {shown.map(w => (
              <article key={w.id} className="status-row card" role="listitem">
                <div className="srow-main">
                  <div className="srow-info">
                    <h2 className="srow-name">{w.name}</h2>
                    <div className="srow-meta">
                      <span>📅 {w.date}</span>
                      <span>⏱ {w.duration} day{w.duration > 1 ? 's' : ''}</span>
                      {w.status === 'Completed' && w.students > 0 && (
                        <span>👥 {w.students} students</span>
                      )}
                    </div>
                  </div>
                  <StatusBadge status={w.status} />
                </div>
                {w.status === 'Rejected' && (
                  <div className="alert alert-danger" style={{ marginTop: '.75rem', marginBottom: 0 }}>
                    This proposal was not approved. Please review the requirements and re-submit.
                  </div>
                )}
                {w.status === 'Pending' && (
                  <div className="alert alert-info" style={{ marginTop: '.75rem', marginBottom: 0 }}>
                    Under review — the FOSSEE team will respond within 3–5 business days.
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}