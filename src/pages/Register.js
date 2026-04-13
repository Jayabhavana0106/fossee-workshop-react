import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const INITIAL = {
  first_name: '', last_name: '', email: '',
  username: '', password: '', confirm_password: '',
  institute: '', department: '', phone: '',
};

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = 'Required.';
    if (!form.last_name.trim()) e.last_name = 'Required.';
    if (!form.email.trim()) e.email = 'Required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.username.trim()) e.username = 'Required.';
    if (!form.password) e.password = 'Required.';
    else if (form.password.length < 8) e.password = 'At least 8 characters.';
    if (form.confirm_password !== form.password) e.confirm_password = 'Passwords do not match.';
    if (!form.institute.trim()) e.institute = 'Required.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login(form.first_name + ' ' + form.last_name, 'coordinator');
    navigate('/');
  };

  const Field = ({ id, label, type = 'text', req, autoComplete, placeholder, span2 }) => (
    <div className={`form-group${span2 ? ' span-2' : ''}`}>
      <label htmlFor={id}>
        {label} {req && <span className="req" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        className={`form-control${errors[id] ? ' error' : ''}`}
        value={form[id]}
        onChange={set(id)}
        autoComplete={autoComplete}
        placeholder={placeholder || ''}
        aria-required={req}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `${id}-err` : undefined}
      />
      {errors[id] && <p className="form-error" id={`${id}-err`} role="alert">{errors[id]}</p>}
    </div>
  );

  return (
    <main id="main-content" className="auth-page" style={{ alignItems: 'flex-start', paddingTop: '2rem' }}>
      <div className="auth-wrap" style={{ maxWidth: 560 }}>
        <div className="auth-card card">
          <div className="auth-head">
            <span className="auth-logo" aria-hidden="true">◉</span>
            <h1>Create Account</h1>
            <p>Register as a Workshop Coordinator</p>
          </div>

          <form onSubmit={handleSubmit} noValidate aria-label="Coordinator registration form">
            <div className="form-grid">
              <Field id="first_name"  label="First Name"   req autoComplete="given-name"   placeholder="Rahul" />
              <Field id="last_name"   label="Last Name"    req autoComplete="family-name"  placeholder="Sharma" />
              <Field id="email"       label="Email"        req type="email" autoComplete="email" placeholder="rahul@example.com" span2 />
              <Field id="username"    label="Username"     req autoComplete="username"    placeholder="rahul_s" />
              <Field id="phone"       label="Phone"        type="tel" autoComplete="tel"   placeholder="9876543210" />
              <Field id="institute"   label="Institute"    req autoComplete="organization" placeholder="IIT Bombay" span2 />
              <Field id="department"  label="Department"   autoComplete="off"             placeholder="Computer Science" span2 />
              <Field id="password"    label="Password"     req type="password" autoComplete="new-password" placeholder="Min. 8 characters" span2 />
              <Field id="confirm_password" label="Confirm Password" req type="password" autoComplete="new-password" placeholder="Re-enter password" span2 />
            </div>

            <div className="alert alert-info" style={{ marginBottom: '1.25rem' }}>
              Fields marked <strong>*</strong> are required. An activation email will be sent after registration.
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? <><span className="spinner" aria-hidden="true" /> Creating account…</> : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <span>Already registered?</span>
            <Link to="/login">Sign in →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}