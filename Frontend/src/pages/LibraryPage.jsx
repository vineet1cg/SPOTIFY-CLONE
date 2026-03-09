import { useEffect } from 'react';
import { useMusicStore } from '../stores/musicStore';
import { usePlayerStore } from '../stores/playerStore';
import AlbumCard from '../components/common/AlbumCard';
import Loader from '../components/common/Loader';
import { Play, Music, Library } from 'lucide-react';

export default function LibraryPage() {
  const { musics, albums, fetchMusics, fetchAlbums, isLoading } = useMusicStore();
  const { playTrack, currentTrack, isPlaying } = usePlayerStore();

  useEffect(() => { fetchMusics(); fetchAlbums(); }, []);
  if (isLoading) return <Loader />;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: 32 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Your Library</h1>

      {/* Liked Songs card */}
      <div onClick={() => musics[0] && playTrack(musics[0])} style={{
        background: 'linear-gradient(135deg, #4338ca, #7c3aed, #c026d3)', borderRadius: 8, padding: 20,
        height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', cursor: 'pointer', marginBottom: 40, overflow: 'hidden'
      }}>
        <div style={{ marginBottom: 12 }}>
          {musics.slice(0, 3).map((m, i) => (
            <span key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
              <span style={{ fontWeight: 600, color: '#fff' }}>{m.artist?.username}</span> {m.title}{i < 2 && musics.length > 1 ? ' · ' : ''}
            </span>
          ))}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Liked Songs</h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{musics.length} songs</p>
        <div className="play-btn" style={{ position: 'absolute', bottom: 20, right: 20 }}>
          <Play size={20} fill="#000" color="#000" style={{ marginLeft: 2 }} />
        </div>
      </div>

      {/* Albums */}
      {albums.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Your Albums</h2>
          <div className="grid-cards">{albums.map((a) => <AlbumCard key={a._id} album={a} />)}</div>
        </section>
      )}

      {/* Activity list */}
      {musics.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Recent Activity</h2>
          {musics.slice(0, 8).map((m) => {
            const active = currentTrack?._id === m._id;
            return (
              <div key={m._id} onClick={() => playTrack(m)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 4, cursor: 'pointer', transition: 'background 0.15s',
                background: active ? 'rgba(255,255,255,0.1)' : 'transparent'
              }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background = active ? 'rgba(255,255,255,0.1)' : 'transparent'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                  <div style={{ width: 40, height: 40, background: '#282828', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {active && isPlaying ? (
                      <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 12 }}>
                        <div style={{ width: 3, background: '#1DB954', borderRadius: 2 }} className="animate-bar-1" />
                        <div style={{ width: 3, background: '#1DB954', borderRadius: 2 }} className="animate-bar-2" />
                        <div style={{ width: 3, background: '#1DB954', borderRadius: 2 }} className="animate-bar-3" />
                      </div>
                    ) : <Music size={14} color="#727272" />}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: active ? '#1DB954' : '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.title}</p>
                    <p style={{ fontSize: 12, color: '#727272' }}>{m.artist?.username || 'Unknown'}</p>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: '#727272', marginLeft: 16 }}>{m.duration || '3:45'}</span>
              </div>
            );
          })}
        </section>
      )}

      {musics.length === 0 && albums.length === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 0', textAlign: 'center' }}>
          <Library size={48} color="#727272" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Your library is empty</h3>
          <p style={{ color: '#727272', fontSize: 14 }}>Start following artists and saving music.</p>
        </div>
      )}
    </div>
  );
}
