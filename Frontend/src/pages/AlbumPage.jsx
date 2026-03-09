import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Pause, Clock, Heart, MoreHorizontal, Music, Disc } from 'lucide-react';
import { useMusicStore } from '../stores/musicStore';
import { usePlayerStore } from '../stores/playerStore';
import Loader from '../components/common/Loader';

export default function AlbumPage() {
  const { id } = useParams();
  const { currentAlbum, fetchAlbumById, isLoading } = useMusicStore();
  const { playTrack, currentTrack, isPlaying } = usePlayerStore();
  const [grad] = useState(() => ['#1a1a2e', '#16213e', '#0f3460', '#2d132c', '#1b1b2f', '#162447', '#1f4068', '#1a1a40'][Math.floor(Math.random() * 8)]);

  useEffect(() => { fetchAlbumById(id); }, [id]);
  if (isLoading) return <Loader />;
  if (!currentAlbum) return (
    <div style={{ textAlign: 'center', padding: '80px 0' }} className="animate-fade-in">
      <Disc size={48} color="#727272" style={{ marginBottom: 16, display: 'block', marginInline: 'auto' }} />
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Album not found</h2>
      <Link to="/home" style={{ color: '#1DB954', fontSize: 14, fontWeight: 600 }}>Back to Home</Link>
    </div>
  );

  const total = currentAlbum.musics?.length || 0;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: 32 }}>
      {/* Header */}
      <div style={{ margin: '-16px -24px 0', padding: '56px 24px 24px', display: 'flex', alignItems: 'flex-end', gap: 24, background: `linear-gradient(to bottom, ${grad}, #121212)` }}>
        <div style={{ width: 200, height: 200, background: '#282828', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 16px 48px rgba(0,0,0,0.6)' }}>
          <Disc size={64} color="#535353" />
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Album</p>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12, lineHeight: 1.1 }}>{currentAlbum.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, color: '#b3b3b3', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, color: '#fff' }}>{currentAlbum.artist?.username || 'Unknown'}</span>
            <span style={{ margin: '0 4px' }}>·</span><span>2026</span>
            <span style={{ margin: '0 4px' }}>·</span><span>{total} {total === 1 ? 'song' : 'songs'}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '20px 0' }}>
        <button onClick={() => currentAlbum.musics?.[0] && playTrack(currentAlbum.musics[0])} style={{
          width: 56, height: 56, background: '#1DB954', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: 'none', cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.3)', transition: 'transform 0.1s, background 0.2s'
        }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.background = '#1ED760' }} onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = '#1DB954' }}>
          <Play size={22} fill="#000" color="#000" style={{ marginLeft: 2 }} />
        </button>
        <button style={{ background: 'none', border: 'none', color: '#b3b3b3', cursor: 'pointer' }}><Heart size={28} /></button>
        <button style={{ background: 'none', border: 'none', color: '#b3b3b3', cursor: 'pointer' }}><MoreHorizontal size={28} /></button>
      </div>

      {/* Track list header */}
      <div className="track-row" style={{ padding: '4px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: 12, color: '#b3b3b3', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'default' }}>
        <span style={{ textAlign: 'center' }}>#</span>
        <span>Title</span>
        <span className="md-show" style={{ display: 'none' }}>Album</span>
        <span style={{ display: 'flex', justifyContent: 'flex-end' }}><Clock size={14} /></span>
      </div>

      {/* Tracks */}
      <div style={{ marginTop: 8 }}>
        {currentAlbum.musics?.map((t, i) => {
          const active = currentTrack?._id === t._id;
          return (
            <div key={t._id} onClick={() => playTrack(t)} className="track-row" style={{ background: active ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: active ? '#1DB954' : '#b3b3b3' }}>
                {active && isPlaying ? (
                  <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 12 }}>
                    <div style={{ width: 3, background: '#1DB954', borderRadius: 2 }} className="animate-bar-1" />
                    <div style={{ width: 3, background: '#1DB954', borderRadius: 2 }} className="animate-bar-2" />
                    <div style={{ width: 3, background: '#1DB954', borderRadius: 2 }} className="animate-bar-3" />
                  </div>
                ) : i + 1}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <div style={{ width: 40, height: 40, background: '#282828', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Music size={14} color="#727272" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: active ? '#1DB954' : '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</p>
                  <p style={{ fontSize: 12, color: '#727272' }}>{t.artist?.username || currentAlbum.artist?.username}</p>
                </div>
              </div>
              <span style={{ fontSize: 14, color: '#b3b3b3', display: 'none' }} className="md-show">{currentAlbum.title}</span>
              <span style={{ fontSize: 12, color: '#b3b3b3', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{t.duration || '3:45'}</span>
            </div>
          );
        })}
      </div>

      {total === 0 && <p style={{ textAlign: 'center', padding: '48px 0', color: '#727272', fontSize: 14 }}>No tracks in this album yet.</p>}
    </div>
  );
}
