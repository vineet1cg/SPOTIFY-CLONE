import { Link } from 'react-router-dom';
import { Play, Music, Mic2, Headphones, Zap, Star, ArrowRight, Shield, Globe } from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', overflowY: 'auto' }}>

      {/* ── Navbar ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container-muse" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#fff' }}>
            <div style={{ width: 32, height: 32, background: '#1DB954', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Music size={16} color="#000" fill="#000" />
            </div>
            <span style={{ fontSize: 20, fontWeight: 800 }}>Muse</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Link to="/login" style={{ color: '#b3b3b3', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Log in</Link>
            <Link to="/register" className="btn-primary">Get started</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(29,185,84,0.25) 0%, #000 100%)' }} />
        <div className="container-muse" style={{ position: 'relative', paddingTop: 100, paddingBottom: 80, textAlign: 'center' }}>
          <p style={{ color: '#1DB954', fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', marginBottom: 24, textTransform: 'uppercase' }}>
            Music for everyone
          </p>
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 24 }}>
            Listen without<br />limits.
          </h1>
          <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Millions of songs and podcasts. No credit card needed. Stream your favorite music from any device, anywhere.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary btn-lg">
              Sign up free <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-secondary btn-lg">Log in</Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container-muse" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <div className="grid-3" style={{ textAlign: 'center' }}>
            {[
              { val: '100M+', label: 'Active Listeners' },
              { val: '80M+', label: 'Tracks' },
              { val: '4M+', label: 'Artists' },
            ].map((s, i) => (
              <div key={i}>
                <p style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#fff' }}>{s.val}</p>
                <p style={{ fontSize: 13, color: '#727272', marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section-lg">
        <div className="container-muse">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-0.02em' }}>Why Muse?</h2>
            <p style={{ fontSize: 15, color: '#727272', marginTop: 8 }}>Everything you need for the ultimate listening experience.</p>
          </div>
          <div className="grid-3">
            {[
              { icon: Headphones, title: 'Listen Everywhere', desc: 'Your music follows you. Mobile, desktop, tablet, or web — play seamlessly across all devices.', bg: '#3b82f6' },
              { icon: Star, title: 'Made For You', desc: 'AI-powered recommendations that learn your taste and serve up personalized playlists daily.', bg: '#a855f7' },
              { icon: Zap, title: 'High Quality Audio', desc: 'Crystal clear sound with lossless audio support. Hear every detail the way artists intended.', bg: '#1DB954' },
            ].map((f, i) => (
              <div key={i} style={{ background: '#181818', borderRadius: 12, padding: 32, transition: 'background 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = '#282828'} onMouseLeave={e => e.currentTarget.style.background = '#181818'}>
                <div style={{ width: 48, height: 48, background: f.bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <f.icon size={22} color="#fff" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#b3b3b3', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Artist CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #181818, #1a1a1a)', padding: '80px 0' }}>
        <div className="container-muse" style={{ display: 'flex', alignItems: 'center', gap: 64, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <p style={{ color: '#1DB954', fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>For Artists</p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 20 }}>
              Your music.<br />Your audience.
            </h2>
            <p style={{ fontSize: 16, color: '#b3b3b3', marginBottom: 32, maxWidth: 450, lineHeight: 1.7 }}>
              Upload your tracks, build your fanbase, and share your music with millions of listeners worldwide.
            </p>
            <Link to="/register" className="btn-primary btn-lg">Start creating</Link>
          </div>
          <div className="grid-2" style={{ flex: 1, maxWidth: 380, minWidth: 280 }}>
            {[
              { icon: Globe, label: 'Global reach', color: '#3b82f6' },
              { icon: Mic2, label: 'Upload music', color: '#1DB954' },
              { icon: Star, label: 'Analytics', color: '#a855f7' },
              { icon: Shield, label: 'Your rights', color: '#f59e0b' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#242424', borderRadius: 12, padding: 24, textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, background: `${item.color}15`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <item.icon size={20} color={item.color} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '64px 0 32px' }}>
        <div className="container-muse">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
            <div style={{ maxWidth: 260 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, background: '#1DB954', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Music size={16} color="#000" fill="#000" />
                </div>
                <span style={{ fontSize: 18, fontWeight: 800 }}>Muse</span>
              </div>
              <p style={{ fontSize: 13, color: '#727272', lineHeight: 1.7 }}>The best way to experience audio. Millions of tracks at your fingertips.</p>
            </div>
            <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
              {[
                { title: 'Company', links: ['About', 'Jobs', 'Press'] },
                { title: 'Support', links: ['Help', 'Artists', 'Community'] },
                { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
              ].map((col) => (
                <div key={col.title}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>{col.title}</p>
                  {col.links.map((link) => (
                    <a key={link} href="#" style={{ display: 'block', fontSize: 14, color: '#727272', textDecoration: 'none', padding: '6px 0' }}>{link}</a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 32, fontSize: 12, color: '#535353' }}>
            © 2026 Muse · Built with passion
          </div>
        </div>
      </footer>
    </div>
  );
}
