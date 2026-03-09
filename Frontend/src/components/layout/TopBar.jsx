import { ChevronLeft, ChevronRight, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useState } from 'react';

export default function TopBar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => { await logout(); navigate('/login'); };

  const navBtn = { width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: '#fff', cursor: 'pointer', transition: 'background 0.2s' };

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => navigate(-1)} style={navBtn}><ChevronLeft size={18} /></button>
        <button onClick={() => navigate(1)} style={navBtn}><ChevronRight size={18} /></button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {user ? (
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowMenu(!showMenu)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.7)', borderRadius: 500, padding: '4px 12px 4px 4px', border: 'none', color: '#fff', cursor: 'pointer', transition: 'background 0.2s' }}>
              <div style={{ width: 28, height: 28, background: '#535353', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={14} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{user.username}</span>
            </button>
            {showMenu && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setShowMenu(false)} />
                <div className="animate-scale-in" style={{ position: 'absolute', right: 0, top: '100%', marginTop: 8, width: 210, background: '#282828', borderRadius: 4, boxShadow: '0 16px 24px rgba(0,0,0,0.3)', padding: '4px 0', zIndex: 50 }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #333' }}>
                    <p style={{ fontSize: 14, fontWeight: 700 }}>{user.username}</p>
                    <p style={{ fontSize: 12, color: '#727272', textTransform: 'capitalize' }}>{user.role} account</p>
                  </div>
                  <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: 'none', border: 'none', color: '#b3b3b3', fontSize: 14, cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' }}>
                    <LogOut size={16} /> Log out
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', color: '#b3b3b3', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Sign up</button>
            <button onClick={() => navigate('/login')} className="btn-white">Log in</button>
          </div>
        )}
      </div>
    </header>
  );
}
