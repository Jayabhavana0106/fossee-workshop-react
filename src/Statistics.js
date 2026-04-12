import './Statistics.css';

const STATS = [
  { label: 'Workshops Conducted', value: '527',  icon: '🎓', delta: '+42 this year' },
  { label: 'Students Reached',    value: '13,480', icon: '👥', delta: '+1,200 this year' },
  { label: 'Colleges Covered',    value: '234',  icon: '🏫', delta: '18 states' },
  { label: 'Workshop Types',      value: '17',   icon: '📚', delta: 'Active topics' },
];

const TOP_WORKSHOPS = [
  { name: 'Python for Scientific Computing', count: 142, pct: 100 },
  { name: 'Scilab Fundamentals',              count: 98,  pct: 69  },
  { name: 'Arduino & Embedded Systems',       count: 75,  pct: 53  },
  { name: 'DWSIM Process Simulation',         count: 61,  pct: 43  },
  { name: 'R for Data Analysis',              count: 54,  pct: 38  },
  { name: 'LaTeX for Research Writing',       count: 47,  pct: 33  },
  { name: 'OpenFOAM – CFD Basics',            count: 38,  pct: 27  },
];

const TOP_STATES = [
  { name: 'Maharashtra', count: 112 },
  { name: 'Karnataka',   count:  89 },
  { name: 'Tamil Nadu',  count:  74 },
  { name: 'Uttar Pradesh', count: 63 },
  { name: 'Gujarat',     count:  58 },
];

export default function Statistics() {
  return (
    <main id="main-content">
      <div className="container">
        <div className="page-heading">
          <h1>Workshop Statistics</h1>
          <p>Public overview of FOSSEE workshop reach and impact across India.</p>
        </div>

        {/* Big numbers */}
        <div className="stats-grid" role="list" aria-label="Key statistics">
          {STATS.map(s => (
            <div key={s.label} className="stat-card card" role="listitem">
              <span className="stat-icon" aria-hidden="true">{s.icon}</span>
              <strong className="stat-value">{s.value}</strong>
              <span className="stat-label">{s.label}</span>
              <span className="stat-delta">{s.delta}</span>
            </div>
          ))}
        </div>

        <div className="stats-content-grid">
          {/* Top workshops */}
          <section className="card" aria-labelledby="top-workshops-heading">
            <h2 id="top-workshops-heading">Most Popular Workshops</h2>
            <ul className="bar-list" aria-label="Workshop popularity">
              {TOP_WORKSHOPS.map((w, i) => (
                <li key={w.name} className="bar-item">
                  <div className="bar-meta">
                    <span className="bar-rank" aria-hidden="true">#{i + 1}</span>
                    <span className="bar-name">{w.name}</span>
                    <span className="bar-count">{w.count}</span>
                  </div>
                  <div className="bar-track" role="progressbar" aria-valuenow={w.count} aria-valuemax={142} aria-label={`${w.count} workshops`}>
                    <div className="bar-fill" style={{ width: `${w.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* State table + monthly */}
          <div className="stats-right">
            <section className="card" aria-labelledby="top-states-heading">
              <h2 id="top-states-heading">Top States</h2>
              <div className="table-wrap" style={{ boxShadow: 'none', border: 'none' }}>
                <table aria-label="Top states by workshops">
                  <thead>
                    <tr>
                      <th scope="col">State</th>
                      <th scope="col">Workshops</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOP_STATES.map(s => (
                      <tr key={s.name}>
                        <td>{s.name}</td>
                        <td><strong>{s.count}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="card monthly-card" aria-labelledby="monthly-heading">
              <h2 id="monthly-heading">This Month</h2>
              <div className="monthly-stats">
                <div className="monthly-item">
                  <strong>24</strong><span>Workshops scheduled</span>
                </div>
                <div className="monthly-item">
                  <strong>680</strong><span>Estimated students</span>
                </div>
                <div className="monthly-item">
                  <strong>8</strong><span>New colleges</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}