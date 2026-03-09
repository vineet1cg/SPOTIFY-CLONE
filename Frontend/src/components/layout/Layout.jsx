import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import PlayerBar from './PlayerBar';

export default function Layout() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#000', color: '#fff', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', gap: 8, padding: '8px 8px 0' }}>
        <Sidebar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#121212', borderRadius: '8px 8px 0 0' }}>
          <TopBar />
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px 32px' }}>
            <Outlet />
          </div>
        </main>
      </div>
      <PlayerBar />
    </div>
  );
}
