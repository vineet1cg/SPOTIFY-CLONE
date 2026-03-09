import { Play, Music } from 'lucide-react';

export default function MusicCard({ music, onPlay }) {
  return (
    <div onClick={() => onPlay?.(music)} className="card" style={{ padding: 16, position: 'relative' }}>
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <div style={{ aspectRatio: '1', width: '100%', background: '#282828', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
          <Music size={40} color="#535353" />
        </div>
        <div className="play-btn" style={{ position: 'absolute', bottom: 8, right: 8 }}>
          <Play size={20} fill="#000" color="#000" style={{ marginLeft: 2 }} />
        </div>
      </div>
      <p style={{ fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 4 }}>{music.title}</p>
      <p style={{ fontSize: 12, color: '#727272', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{music.artist?.username || 'Unknown Artist'}</p>
    </div>
  );
}
