import { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Volume1, Music, Shuffle, Repeat } from 'lucide-react';
import { usePlayerStore } from '../../stores/playerStore';

export default function PlayerBar() {
  const audioRef = useRef(null);
  const { currentTrack, isPlaying, currentTime, duration, volume, setAudioElement, togglePlay, setCurrentTime, setDuration, setVolume, seek } = usePlayerStore();

  useEffect(() => { if (audioRef.current) setAudioElement(audioRef.current); }, []);
  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    const t = () => setCurrentTime(a.currentTime);
    const l = () => setDuration(a.duration);
    const e = () => setCurrentTime(0);
    a.addEventListener('timeupdate', t); a.addEventListener('loadedmetadata', l); a.addEventListener('ended', e);
    return () => { a.removeEventListener('timeupdate', t); a.removeEventListener('loadedmetadata', l); a.removeEventListener('ended', e); };
  }, []);

  const fmt = (s) => { if (!s || isNaN(s)) return '0:00'; return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`; };
  const progress = duration ? (currentTime / duration) * 100 : 0;
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  const ctrlBtn = { background: 'none', border: 'none', cursor: 'pointer', color: '#b3b3b3', transition: 'color 0.2s', display: 'flex', alignItems: 'center' };

  return (
    <footer style={{ height: 80, background: '#000', borderTop: '1px solid #282828', padding: '0 16px', display: 'flex', alignItems: 'center', zIndex: 50 }}>
      <audio ref={audioRef} />

      {/* Left: Track */}
      <div style={{ width: '30%', minWidth: 180, display: 'flex', alignItems: 'center', gap: 12 }}>
        {currentTrack ? (
          <>
            <div style={{ width: 56, height: 56, background: '#282828', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Music size={24} color="#727272" />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentTrack.title}</p>
              <p style={{ fontSize: 11, color: '#727272', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentTrack.artist?.username || 'Unknown'}</p>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 56, height: 56, background: '#1a1a1a', borderRadius: 4 }} />
            <div><div style={{ width: 100, height: 12, background: '#1a1a1a', borderRadius: 4, marginBottom: 6 }} /><div style={{ width: 70, height: 10, background: '#1a1a1a', borderRadius: 4 }} /></div>
          </div>
        )}
      </div>

      {/* Center: Controls */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, maxWidth: '45%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={ctrlBtn}><Shuffle size={16} /></button>
          <button style={{ ...ctrlBtn, color: '#fff' }}><SkipBack size={20} fill="currentColor" /></button>
          <button onClick={togglePlay} disabled={!currentTrack} style={{
            width: 32, height: 32, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: currentTrack ? 'pointer' : 'default', opacity: currentTrack ? 1 : 0.4, transition: 'transform 0.1s'
          }}>
            {isPlaying ? <Pause size={14} fill="#000" color="#000" /> : <Play size={14} fill="#000" color="#000" style={{ marginLeft: 2 }} />}
          </button>
          <button style={{ ...ctrlBtn, color: '#fff' }}><SkipForward size={20} fill="currentColor" /></button>
          <button style={ctrlBtn}><Repeat size={16} /></button>
        </div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#727272', width: 40, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmt(currentTime)}</span>
          <div style={{ flex: 1, height: 4, background: '#4d4d4d', borderRadius: 2, position: 'relative', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: '#fff', borderRadius: 2, width: `${progress}%`, transition: 'width 0.1s' }} />
            <input type="range" min={0} max={duration || 100} step={0.1} value={currentTime} onChange={(e) => seek(parseFloat(e.target.value))}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
          </div>
          <span style={{ fontSize: 11, color: '#727272', width: 40, fontVariantNumeric: 'tabular-nums' }}>{fmt(duration)}</span>
        </div>
      </div>

      {/* Right: Volume */}
      <div style={{ width: '30%', minWidth: 180, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
        <button onClick={() => setVolume(volume > 0 ? 0 : 0.7)} style={ctrlBtn}><VolumeIcon size={18} /></button>
        <div style={{ width: 96, height: 4, background: '#4d4d4d', borderRadius: 2, position: 'relative', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: '#fff', borderRadius: 2, width: `${volume * 100}%` }} />
          <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
        </div>
      </div>
    </footer>
  );
}
