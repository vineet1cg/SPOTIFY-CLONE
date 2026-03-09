import { useState, useEffect } from 'react';
import { useMusicStore } from '../stores/musicStore';
import AlbumCard from '../components/common/AlbumCard';
import Loader from '../components/common/Loader';
import { Plus, Disc, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ArtistAlbumsPage() {
  const [showModal, setShowModal] = useState(false);
  const [albumTitle, setAlbumTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { albums, fetchAlbums, createAlbum, isLoading } = useMusicStore();
  useEffect(() => { fetchAlbums(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!albumTitle.trim()) return;
    setCreating(true); setError(null); setSuccess(false);
    try { await createAlbum({ title: albumTitle }); setSuccess(true); setAlbumTitle(''); setShowModal(false); fetchAlbums(); }
    catch (err) { setError(err.response?.data?.message || 'Failed'); }
    finally { setCreating(false); }
  };

  if (isLoading && !albums.length) return <Loader />;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: 80 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Your Albums</h1>
          <p style={{ color: '#727272', fontSize: 14 }}>Manage your discography.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}><Plus size={16} /> New Album</button>
      </div>

      {error && <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '12px 16px', borderRadius: 8, marginBottom: 24, fontSize: 14 }}><AlertCircle size={18} /> {error}</div>}
      {success && <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.3)', color: '#1DB954', padding: '12px 16px', borderRadius: 8, marginBottom: 24, fontSize: 14 }}><CheckCircle2 size={18} /> Album created!</div>}

      <div className="grid-cards">
        {albums.map((a) => <AlbumCard key={a._id} album={a} />)}
        <div onClick={() => setShowModal(true)} style={{
          background: '#181818', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          aspectRatio: '1', cursor: 'pointer', transition: 'background 0.3s'
        }} onMouseEnter={e => e.currentTarget.style.background = '#282828'} onMouseLeave={e => e.currentTarget.style.background = '#181818'}>
          <div style={{ width: 48, height: 48, background: '#282828', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Plus size={24} color="#727272" />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#727272' }}>New Album</span>
        </div>
      </div>

      {albums.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <Disc size={48} color="#727272" style={{ marginBottom: 16, display: 'block', marginInline: 'auto' }} />
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No albums yet</h3>
          <p style={{ color: '#727272', fontSize: 14, marginBottom: 24 }}>Create your first album to organize your music.</p>
          <button className="btn-primary" onClick={() => setShowModal(true)}>Create Album</button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="animate-fade-in" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div className="animate-scale-in" style={{ background: '#282828', borderRadius: 8, width: '100%', maxWidth: 420, padding: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Create Album</h2>
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Album name</label>
                <input className="input-field" placeholder="My awesome album" value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)} required autoFocus />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={creating || !albumTitle.trim()}>
                  {creating ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
