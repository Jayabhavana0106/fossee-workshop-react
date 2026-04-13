import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required.';
    if (!form.password) e.password = 'Password is required.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 700));
    login(form.username, 'coordinator');
    navigate('/');
  };

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: '' }));
  };

  return (
    <main id="main-content" className="auth-page">
      <div className="auth-wrap">
        <div className="auth-card card">
          <div className="auth-head">
            <span className="auth-logo" aria-hidden="true">◉</span>
            <h1>Welcome back</h1>
            <p>Sign in to your FOSSEE account</p>
          </div>

          <form onSubmit={handleSubmit} noValidate aria-label="Sign in form">
            <div className="form-group">
              <label htmlFor="username">Username <span className="req" aria-hidden="true">*</span></label>
              <input
                id="username"
                type="text"
                className={`form-control${errors.username ? ' error' : ''}`}
                value={form.username}
                onChange={set('username')}
                autoComplete="username"
                aria-required="true"
                aria-describedby={errors.username ? 'username-err' : undefined}
                aria-invalid={!!errors.username}
                placeholder="Enter your username"
              />
              {errors.username && <p className="form-error" id="username-err" role="alert">{errors.username}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password <span className="req" aria-hidden="true">*</span></label>
              <input
                id="password"
                type="password"
                className={`form-control${errors.password ? ' error' : ''}`}
                value={form.password}
                onChange={set('password')}
                autoComplete="current-password"
                aria-required="true"
                aria-describedby={errors.password ? 'password-err' : undefined}
                aria-invalid={!!errors.password}
                placeholder="Enter your password"
              />
              {errors.password && <p className="form-error" id="password-err" role="alert">{errors.password}</p>}
            </div>

            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? <><span className="spinner" aria-hidden="true" /> Signing in…</> : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <span>New to FOSSEE?</span>
            <Link to="/register">Create an account →</Link>
          </div>
        </div>

        {/* Demo shortcut */}
        <div className="demo-hint">
          <p>Demo: enter any username &amp; password to sign in.</p>
        </div>
      </div>
    </main>
  );
}