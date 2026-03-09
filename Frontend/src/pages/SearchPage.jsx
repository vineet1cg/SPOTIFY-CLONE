import { useState, useEffect } from 'react';
import { Search as SearchIcon, Music, Play } from 'lucide-react';
import { useMusicStore } from '../stores/musicStore';
import { usePlayerStore } from '../stores/playerStore';
import AlbumCard from '../components/common/AlbumCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { musics, albums, fetchMusics, fetchAlbums } = useMusicStore();
  const { playTrack } = usePlayerStore();
  const [results, setResults] = useState({ musics: [], albums: [] });

  useEffect(() => { fetchMusics(); fetchAlbums(); }, []);
  useEffect(() => {
    if (!query.trim()) return setResults({ musics: [], albums: [] });
    const q = query.toLowerCase();
    setResults({
      musics: musics.filter(m => m.title.toLowerCase().includes(q) || m.artist?.username?.toLowerCase().includes(q)),
      albums: albums.filter(a => a.title.toLowerCase().includes(q) || a.artist?.username?.toLowerCase().includes(q)),
    });
  }, [query, musics, albums]);

  const categories = [
    { title: 'Podcasts', color: '#E13300' }, { title: 'Made For You', color: '#1E3264' },
    { title: 'New Releases', color: '#E8115B' }, { title: 'Hindi', color: '#8D67AB' },
    { title: 'Punjabi', color: '#BA5D07' }, { title: 'Charts', color: '#8400E7' },
    { title: 'Pop', color: '#148A08' }, { title: 'Indie', color: '#477D95' },
    { title: 'Rock', color: '#E61E32' }, { title: 'Chill', color: '#537481' },
    { title: 'Electronic', color: '#8D67AB' }, { title: 'Hip Hop', color: '#BA5D07' },
  ];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: 32 }}>
      {/* Search bar */}
      <div style={{ position: 'relative', maxWidth: 460, marginBottom: 32 }}>
        <SearchIcon size={20} color="#535353" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} autoFocus placeholder="What do you want to listen to?"
          style={{ width: '100%', background: '#fff', color: '#000', borderRadius: 500, padding: '14px 16px 14px 44px', fontSize: 14, fontWeight: 500, border: 'none', outline: 'none' }} />
      </div>

      {!query ? (
        <section>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Browse all</h2>
          <div className="grid-categories">
            {categories.map((c, i) => (
              <div key={i} style={{ aspectRatio: '1', borderRadius: 8, padding: 16, position: 'relative', overflow: 'hidden', cursor: 'pointer', background: c.color }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{c.title}</h3>
                <div style={{ position: 'absolute', bottom: -4, right: -8, width: 60, height: 60, background: 'rgba(255,255,255,0.1)', borderRadius: 4, transform: 'rotate(25deg)' }} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="animate-fade-in">
          {results.musics.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, marginBottom: 40 }}>
              {/* Top result */}
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Top result</h2>
                <div onClick={() => playTrack(results.musics[0])} className="card" style={{ padding: 20, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative' }}>
                  <div style={{ width: 88, height: 88, background: '#282828', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                    <Music size={32} color="#535353" />
                  </div>
                  <p style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{results.musics[0].title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, background: '#333', padding: '2px 8px', borderRadius: 500, fontWeight: 500 }}>Song</span>
                    <span style={{ fontSize: 14, color: '#727272' }}>{results.musics[0].artist?.username}</span>
                  </div>
                  <div className="play-btn" style={{ position: 'absolute', bottom: 20, right: 20 }}>
                    <Play size={20} fill="#000" color="#000" style={{ marginLeft: 2 }} />
                  </div>
                </div>
              </div>

              {/* Song list */}
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Songs</h2>
                {results.musics.slice(0, 4).map((m) => (
                  <div key={m._id} onClick={() => playTrack(m)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 4, cursor: 'pointer', transition: 'background 0.15s'
                  }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                      <div style={{ width: 40, height: 40, background: '#282828', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Music size={14} color="#727272" />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.title}</p>
                        <p style={{ fontSize: 12, color: '#727272' }}>{m.artist?.username}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: '#727272', marginLeft: 16 }}>{m.duration || '3:45'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.albums.length > 0 && (
            <section>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Albums</h2>
              <div className="grid-cards">{results.albums.map((a) => <AlbumCard key={a._id} album={a} />)}</div>
            </section>
          )}

          {results.musics.length === 0 && results.albums.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>No results found for "{query}"</p>
              <p style={{ color: '#727272', fontSize: 14 }}>Check your spelling or try different keywords.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
