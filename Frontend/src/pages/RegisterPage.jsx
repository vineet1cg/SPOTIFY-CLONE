import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Music, Eye, EyeOff, Loader2, Headphones, Mic2 } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await register(formData); navigate('/home'); } catch (err) { }
  };

  const roleCard = (value, icon, label, desc) => (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 8, cursor: 'pointer',
      border: `2px solid ${formData.role === value ? '#1DB954' : '#333'}`,
      background: formData.role === value ? 'rgba(29,185,84,0.05)' : 'transparent',
      transition: 'all 0.2s'
    }}>
      <input type="radio" name="role" value={value} checked={formData.role === value}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ display: 'none' }} />
      {icon}
      <div>
        <p style={{ fontSize: 14, fontWeight: 600 }}>{label}</p>
        <p style={{ fontSize: 12, color: '#727272' }}>{desc}</p>
      </div>
    </label>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#121212', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px', overflowY: 'auto' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#fff', marginBottom: 40 }}>
        <div style={{ width: 40, height: 40, background: '#1DB954', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Music size={20} color="#000" fill="#000" />
        </div>
        <span style={{ fontSize: 28, fontWeight: 800 }}>Muse</span>
      </Link>

      <div style={{ background: '#1a1a1a', borderRadius: 8, padding: '40px 40px 32px', width: '100%', maxWidth: 500 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Sign up for free</h1>
        <p style={{ textAlign: 'center', color: '#727272', fontSize: 14, marginBottom: 32 }}>Start listening with a free Muse account.</p>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '12px 16px', borderRadius: 4, marginBottom: 24, fontSize: 14 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Username</label>
            <input className="input-field" placeholder="Choose a username" value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Email address</label>
            <input className="input-field" type="email" placeholder="name@example.com" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div style={{ marginBottom: 24, position: 'relative' }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Password</label>
            <input className="input-field" type={showPassword ? 'text' : 'password'} placeholder="Create a password"
              value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required style={{ paddingRight: 48 }} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 12, bottom: 12, background: 'none', border: 'none', color: '#727272', cursor: 'pointer', padding: 4 }}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>What describes you best?</label>
            <div className="grid-2">
              {roleCard('user', <Headphones size={20} color={formData.role === 'user' ? '#1DB954' : '#727272'} />, 'Listener', 'Stream music')}
              {roleCard('artist', <Mic2 size={20} color={formData.role === 'artist' ? '#1DB954' : '#727272'} />, 'Artist', 'Upload music')}
            </div>
          </div>
          <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: '100%', padding: '16px 32px' }}>
            {isLoading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Creating account...</> : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid #333' }}>
          <p style={{ color: '#b3b3b3', fontSize: 14 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#fff', fontWeight: 600, textDecoration: 'underline' }}>Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
