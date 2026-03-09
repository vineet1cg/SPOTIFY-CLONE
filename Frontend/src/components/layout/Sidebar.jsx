import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Plus, Music, ListMusic } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const navStyle = (isActive) => ({
  display: 'flex', alignItems: 'center', gap: 16, padding: '8px 12px', borderRadius: 4,
  fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'color 0.2s',
  color: isActive ? '#fff' : '#b3b3b3',
});

const artistLinkStyle = (isActive) => ({
  display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 4,
  fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s',
  color: isActive ? '#fff' : '#b3b3b3',
  background: isActive ? '#333' : 'transparent',
});

export default function Sidebar() {
  const { user } = useAuthStore();

  return (
    <aside style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
      {/* Nav section */}
      <div style={{ background: '#121212', borderRadius: 8, padding: '16px 12px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px 20px' }}>
          <div style={{ width: 32, height: 32, background: '#1DB954', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Music size={16} color="#000" fill="#000" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 800 }}>Muse</span>
        </div>

        <NavLink to="/home" style={({ isActive }) => navStyle(isActive)}>
          <Home size={24} /> Home
        </NavLink>
        <NavLink to="/search" style={({ isActive }) => navStyle(isActive)}>
          <Search size={24} /> Search
        </NavLink>
      </div>

      {/* Library section */}
      <div style={{ background: '#121212', borderRadius: 8, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 8px' }}>
          <NavLink to="/library" style={({ isActive }) => ({ ...navStyle(isActive), padding: 0 })}>
            <Library size={24} /> Your Library
          </NavLink>
          <button style={{ background: 'none', border: 'none', color: '#b3b3b3', cursor: 'pointer', padding: 4, borderRadius: '50%' }}>
            <Plus size={20} />
          </button>
        </div>

        {/* Artist links */}
        {user?.role === 'artist' && (
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#1DB954', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 12px 8px' }}>Artist</p>
            <NavLink to="/artist/upload" style={({ isActive }) => artistLinkStyle(isActive)}>
              <Plus size={18} /> Upload Music
            </NavLink>
            <NavLink to="/artist/albums" style={({ isActive }) => artistLinkStyle(isActive)}>
              <ListMusic size={18} /> Your Albums
            </NavLink>
          </div>
        )}

        {/* Create playlist prompt */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px' }} className="scrollbar-hide">
          <div style={{ background: '#242424', borderRadius: 8, padding: 20 }}>
            <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Create your first playlist</p>
            <p style={{ color: '#b3b3b3', fontSize: 13, marginBottom: 16 }}>It's easy, we'll help you</p>
            <button className="btn-white btn-sm">Create playlist</button>
          </div>
        </div>
      </div>
    </aside>
  );
}
