import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ProposeWorkshop.css';

const WORKSHOP_TYPES = [
  { id: 1, name: 'Python for Scientific Computing',  duration: 2 },
  { id: 2, name: 'Scilab Fundamentals',               duration: 3 },
  { id: 3, name: 'DWSIM Process Simulation',          duration: 1 },
  { id: 4, name: 'OpenFOAM – CFD Basics',             duration: 2 },
  { id: 5, name: 'R for Data Analysis',               duration: 2 },
  { id: 6, name: 'LibreOffice for Academia',          duration: 1 },
  { id: 7, name: 'Arduino & Embedded Systems',        duration: 3 },
  { id: 8, name: 'LaTeX for Research Writing',        duration: 1 },
];

const TNC = {
  1: 'The host institution must provide a computer lab with at least 30 working systems and internet connectivity. Attendance must be recorded and submitted within 48 hours.',
  2: 'Minimum 20 participants required. Lab systems must have Scilab 6.x pre-installed.',
  3: 'Participants must have basic knowledge of unit operations. Minimum 15 participants.',
  4: 'Linux systems required. Minimum 10 participants. OpenFOAM 8+ must be pre-installed.',
  5: 'R and RStudio must be pre-installed. Students need basic statistics knowledge.',
  6: 'Minimum 25 participants. LibreOffice 7+ required on all systems.',
  7: 'Arduino kits provided by FOSSEE. Coordinator must arrange extension boards.',
  8: 'TeX Live or MiKTeX must be installed. Minimum 15 participants.',
};

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().split('T')[0];
}
function getMaxDate() {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split('T')[0];
}

export default function ProposeWorkshop() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ type: params.get('type') || '', date: '', tnc: false });
  const [errors, setErrors] = useState({});
  const [showTnc, setShowTnc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedType = WORKSHOP_TYPES.find(w => w.id === parseInt(form.type));

  const validate = () => {
    const e = {};
    if (!form.type) e.type = 'Please select a workshop type.';
    if (!form.date) e.date = 'Please select a date.';
    if (!form.tnc) e.tnc = 'You must accept the terms and conditions.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSuccess(true);
  };

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [field]: val }));
    setErrors(er => ({ ...er, [field]: '' }));
  };

  if (success) return (
    <main id="main-content">
      <div className="container">
        <div className="success-screen card">
          <span className="success-icon" aria-hidden="true">✅</span>
          <h1>Workshop Proposed!</h1>
          <p>
            Your request for <strong>{selectedType?.name}</strong> on <strong>{form.date}</strong> has been submitted.
            The FOSSEE team will review and get back to you within 3–5 working days.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => { setSuccess(false); setForm({ type: '', date: '', tnc: false }); }}>
              Propose Another
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/status')}>
              View My Workshops
            </button>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <main id="main-content">
      <div className="container propose-container">
        <div className="page-heading">
          <h1>Propose a Workshop</h1>
          <p>Submit a request to host a FOSSEE workshop at your institution.</p>
        </div>

        <div className="alert alert-info">
          📌 Before proposing, check the <a href="/workshops">Workshop Types</a> page for details, duration, and requirements.
        </div>

        <div className="propose-grid">
          <form
            className="card propose-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Propose workshop form"
          >
            <h2>Workshop Details</h2>

            {/* Workshop type */}
            <div className="form-group">
              <label htmlFor="workshop-type">
                Workshop Type <span className="req" aria-hidden="true">*</span>
              </label>
              <select
                id="workshop-type"
                className={`form-control${errors.type ? ' error' : ''}`}
                value={form.type}
                onChange={set('type')}
                aria-required="true"
                aria-invalid={!!errors.type}
                aria-describedby={errors.type ? 'type-err' : undefined}
              >
                <option value="">— Select a workshop type —</option>
                {WORKSHOP_TYPES.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.duration} day{w.duration > 1 ? 's' : ''})
                  </option>
                ))}
              </select>
              {errors.type && <p className="form-error" id="type-err" role="alert">{errors.type}</p>}
            </div>

            {/* Date */}
            <div className="form-group">
              <label htmlFor="workshop-date">
                Preferred Start Date <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                id="workshop-date"
                type="date"
                className={`form-control${errors.date ? ' error' : ''}`}
                value={form.date}
                onChange={set('date')}
                min={getTomorrow()}
                max={getMaxDate()}
                aria-required="true"
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? 'date-err' : undefined}
              />
              {errors.date && <p className="form-error" id="date-err" role="alert">{errors.date}</p>}
              <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', marginTop: '.3rem' }}>
                Minimum 3 days from today. Weekends excluded by the coordinator team.
              </p>
            </div>

            {/* T&C */}
            <div className="form-group tnc-group">
              <div className="tnc-check">
                <input
                  id="tnc"
                  type="checkbox"
                  checked={form.tnc}
                  onChange={set('tnc')}
                  aria-invalid={!!errors.tnc}
                  aria-describedby={errors.tnc ? 'tnc-err' : undefined}
                />
                <label htmlFor="tnc">
                  I accept the{' '}
                  <button
                    type="button"
                    className="tnc-link"
                    onClick={() => form.type ? setShowTnc(true) : setErrors(e => ({ ...e, type: 'Select a workshop type to view T&C.' }))}
                  >
                    Terms and Conditions
                  </button>
                </label>
              </div>
              {errors.tnc && <p className="form-error" id="tnc-err" role="alert">{errors.tnc}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? <><span className="spinner" aria-hidden="true" /> Submitting…</> : 'Submit Proposal'}
            </button>
          </form>

          {/* Info panel */}
          {selectedType && (
            <div className="card propose-info" aria-live="polite" aria-label="Selected workshop info">
              <h3>Selected Workshop</h3>
              <p className="info-name">{selectedType.name}</p>
              <dl className="detail-dl" style={{ marginTop: '.75rem' }}>
                <dt>Duration</dt>
                <dd>{selectedType.duration} day{selectedType.duration > 1 ? 's' : ''}</dd>
              </dl>
              <div className="divider" />
              <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>
                After submission, our team will review your request and reach out within 3–5 business days.
              </p>
            </div>
          )}
        </div>

        {/* T&C Modal */}
        {showTnc && (
          <div
            className="modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tnc-title"
            onClick={(e) => e.target === e.currentTarget && setShowTnc(false)}
          >
            <div className="modal-box">
              <div className="modal-header">
                <h2 id="tnc-title">Terms & Conditions</h2>
                <button className="modal-close" onClick={() => setShowTnc(false)} aria-label="Close terms">×</button>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '.95rem' }}>
                {TNC[parseInt(form.type)] || 'No specific terms available for this workshop type.'}
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '.75rem', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={() => { setForm(f => ({ ...f, tnc: true })); setShowTnc(false); setErrors(e => ({ ...e, tnc: '' })); }}>
                  Accept
                </button>
                <button className="btn btn-ghost" onClick={() => setShowTnc(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}