import { Link } from 'react-router-dom';
import { Play, Disc } from 'lucide-react';

export default function AlbumCard({ album }) {
  return (
    <Link to={`/album/${album._id}`} className="card" style={{ padding: 16, textDecoration: 'none', color: '#fff', display: 'block', position: 'relative' }}>
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <div style={{ aspectRatio: '1', width: '100%', background: '#282828', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
          <Disc size={40} color="#535353" />
        </div>
        <div className="play-btn" style={{ position: 'absolute', bottom: 8, right: 8 }}>
          <Play size={20} fill="#000" color="#000" style={{ marginLeft: 2 }} />
        </div>
      </div>
      <p style={{ fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 4 }}>{album.title}</p>
      <p style={{ fontSize: 12, color: '#727272', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {album.artist?.username || 'Unknown'} · {album.musics?.length || 0} songs
      </p>
    </Link>
  );
}
