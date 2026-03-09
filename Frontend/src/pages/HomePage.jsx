import { useEffect } from 'react';
import { useMusicStore } from '../stores/musicStore';
import { usePlayerStore } from '../stores/playerStore';
import { useAuthStore } from '../stores/authStore';
import MusicCard from '../components/common/MusicCard';
import AlbumCard from '../components/common/AlbumCard';
import Loader from '../components/common/Loader';
import { Music } from 'lucide-react';
import { getGreeting } from '../utils/helpers';

export default function HomePage() {
  const { musics, albums, fetchMusics, fetchAlbums, isLoading } = useMusicStore();
  const { playTrack } = usePlayerStore();
  const { user } = useAuthStore();

  useEffect(() => { fetchMusics(); fetchAlbums(); }, []);
  if (isLoading) return <Loader />;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: 32 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        {getGreeting()}{user ? `, ${user.username}` : ''}
      </h1>

      {/* Quick play compact cards */}
      {musics.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, marginBottom: 40 }}>
          {musics.slice(0, 8).map((m) => (
            <button key={m._id} onClick={() => playTrack(m)} style={{
              display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden',
              border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s', width: '100%'
            }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}>
              <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#282828', flexShrink: 0 }}>
                <Music size={16} color="#727272" />
              </div>
              <span style={{ padding: '0 16px', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Music section */}
      {musics.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700 }}>Recently Added</h2>
            <button style={{ background: 'none', border: 'none', color: '#b3b3b3', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Show all</button>
          </div>
          <div className="grid-cards">
            {musics.map((m) => <MusicCard key={m._id} music={m} onPlay={playTrack} />)}
          </div>
        </section>
      )}

      {/* Albums section */}
      {albums.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700 }}>Popular Albums</h2>
            <button style={{ background: 'none', border: 'none', color: '#b3b3b3', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Show all</button>
          </div>
          <div className="grid-cards">
            {albums.map((a) => <AlbumCard key={a._id} album={a} />)}
          </div>
        </section>
      )}

      {musics.length === 0 && albums.length === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, background: '#1a1a1a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Music size={28} color="#727272" />
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Nothing here yet</h3>
          <p style={{ color: '#727272', fontSize: 14 }}>Music uploaded by artists will show up here.</p>
        </div>
      )}
    </div>
  );
}
