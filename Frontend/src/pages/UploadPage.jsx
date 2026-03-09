import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMusicStore } from '../stores/musicStore';
import { Upload, Music, Loader2, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

export default function UploadPage() {
  const [formData, setFormData] = useState({ title: '', albumId: '' });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { albums, fetchAlbums, uploadMusic } = useMusicStore();
  const navigate = useNavigate();
  useEffect(() => { fetchAlbums(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError('Select a music file');
    setUploading(true); setError(null); setSuccess(false);
    const data = new FormData();
    data.append('title', formData.title); data.append('music', file);
    if (formData.albumId) data.append('albumId', formData.albumId);
    try { await uploadMusic(data); setSuccess(true); setFormData({ title: '', albumId: '' }); setFile(null); setTimeout(() => navigate('/home'), 2000); }
    catch (err) { setError(err.response?.data?.message || 'Upload failed'); }
    finally { setUploading(false); }
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f?.type.startsWith('audio/')) { setFile(f); setError(null); if (!formData.title) setFormData({ ...formData, title: f.name.replace(/\.[^/.]+$/, '') }); }
    else { setError('Select a valid audio file'); setFile(null); }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 640, margin: '0 auto', padding: '32px 0 80px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Upload Music</h1>
      <p style={{ color: '#727272', fontSize: 14, marginBottom: 32 }}>Share your tracks with the world.</p>

      {error && <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '12px 16px', borderRadius: 8, marginBottom: 24, fontSize: 14 }}><AlertCircle size={18} /> {error}</div>}
      {success && <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.3)', color: '#1DB954', padding: '12px 16px', borderRadius: 8, marginBottom: 24, fontSize: 14 }}><CheckCircle2 size={18} /> Track uploaded! Redirecting...</div>}

      <form onSubmit={handleSubmit}>
        {/* File drop */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Audio File</label>
          <div onClick={() => document.getElementById('music-upload').click()} style={{
            border: `2px dashed ${file ? '#1DB954' : '#333'}`, borderRadius: 8, padding: 32, textAlign: 'center', cursor: 'pointer',
            background: file ? 'rgba(29,185,84,0.05)' : '#181818', transition: 'all 0.2s'
          }}>
            {file ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <Music size={20} color="#1DB954" />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{file.name}</p>
                  <p style={{ fontSize: 12, color: '#727272' }}>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} style={{ marginLeft: 16, background: 'none', border: 'none', color: '#727272', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </div>
            ) : (
              <>
                <Upload size={28} color="#727272" style={{ marginBottom: 12 }} />
                <p style={{ fontSize: 14, color: '#b3b3b3', fontWeight: 500, marginBottom: 4 }}>Click to upload</p>
                <p style={{ fontSize: 12, color: '#535353' }}>MP3, WAV, FLAC — Max 20MB</p>
              </>
            )}
            <input id="music-upload" type="file" accept="audio/*" onChange={handleFile} style={{ display: 'none' }} />
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Track Title</label>
          <input className="input-field" placeholder="Give your track a name" value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Album (optional)</label>
          <select value={formData.albumId} onChange={(e) => setFormData({ ...formData, albumId: e.target.value })}
            style={{ width: '100%', background: '#333', color: '#fff', borderRadius: 4, padding: '14px 16px', fontSize: 14, border: '1px solid transparent', outline: 'none', cursor: 'pointer', appearance: 'none' }}>
            <option value="">No album — release as single</option>
            {albums.map(a => <option key={a._id} value={a._id}>{a.title}</option>)}
          </select>
        </div>

        <button type="submit" className="btn-primary" disabled={uploading || !file} style={{ width: '100%', padding: '16px 32px' }}>
          {uploading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Uploading...</> : 'Publish Track'}
        </button>
      </form>
    </div>
  );
}
