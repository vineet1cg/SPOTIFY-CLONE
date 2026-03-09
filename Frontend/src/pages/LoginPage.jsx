import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Music, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/home');
    } catch (err) { }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#121212', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, overflowY: 'auto' }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#fff', marginBottom: 48 }}>
        <div style={{ width: 40, height: 40, background: '#1DB954', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Music size={20} color="#000" fill="#000" />
        </div>
        <span style={{ fontSize: 28, fontWeight: 800 }}>Muse</span>
      </Link>

      {/* Card */}
      <div style={{ background: '#1a1a1a', borderRadius: 8, padding: '40px 40px 32px', width: '100%', maxWidth: 450 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 32 }}>Log in to Muse</h1>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '12px 16px', borderRadius: 4, marginBottom: 24, fontSize: 14 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Email or username</label>
            <input
              className="input-field"
              placeholder="Email or username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: 24, position: 'relative' }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Password</label>
            <input
              className="input-field"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ paddingRight: 48 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 12, bottom: 12, background: 'none', border: 'none', color: '#727272', cursor: 'pointer', padding: 4 }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: '100%', padding: '16px 32px' }}>
            {isLoading ? <><Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Logging in...</> : 'Log In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid #333' }}>
          <p style={{ color: '#b3b3b3', fontSize: 14 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#fff', fontWeight: 600, textDecoration: 'underline' }}>Sign up for Muse</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
