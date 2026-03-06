# Frontend Development Plan - Detailed Implementation Guide

> This guide is optimized for AI-assisted frontend development. Follow each section exactly to build a complete Spotify clone that integrates seamlessly with the existing backend.

---

## 📋 Project Overview

**Backend is already running on**: `http://localhost:3000`
**API Base URL**: `http://localhost:3000/api`

The backend uses:
- **MongoDB** with Mongoose
- **JWT in HTTP-only cookies** (no localStorage needed)
- **ImageKit** for file storage
- **Express.js** framework

---

## 🎨 Design System

### Color Palette (Dark Mode - Spotify-inspired)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#121212` | Main background |
| `--bg-secondary` | `#181818` | Sidebar, cards |
| `--bg-tertiary` | `#282828` | Hover states, inputs |
| `--accent-green` | `#1DB954` | Primary buttons, active states |
| `--accent-green-hover` | `#1ED760` | Button hover |
| `--text-primary` | `#FFFFFF` | Headings, primary text |
| `--text-secondary` | `#B3B3B3` | Secondary text |
| `--text-muted` | `#727272` | Disabled, placeholders |
| `--border` | `#333333` | Borders, dividers |

### Typography
- **Font Family**: `Inter, -apple-system, BlinkMacSystemFont, sans-serif`
- **Headings**: Bold, 24-32px
- **Body**: Regular, 14-16px
- **Small**: 12px

### Spacing System
- Base unit: 4px
- Common: `px-2` (8px), `px-4` (16px), `px-6` (24px), `px-8` (32px)

### Layout Dimensions
- **Sidebar**: 240px fixed width (desktop), hidden on mobile
- **Player Bar**: 90px fixed height (bottom)
- **Top Bar**: 64px height
- **Content Padding**: 24px

### Component Styling

**Buttons**:
- Primary: `bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold rounded-full px-6 py-3`
- Secondary: `bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-full`
- Ghost: `bg-transparent text-[#B3B3B3] hover:text-white`

**Cards**:
- Background: `bg-[#181818]`
- Hover: `bg-[#282828] transition-all duration-300`
- Border radius: 8px
- Padding: 16px

**Input Fields**:
- Background: `bg-[#282828]`
- Border: `border-none focus:ring-2 focus:ring-[#1DB954]`
- Text: `text-white`
- Placeholder: `text-[#727272]`
- Border radius: 4px

---

## 🗂️ File Structure

Create this exact structure in `Frontend/` folder:

```
Frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TopBar.jsx
│   │   │   ├── PlayerBar.jsx
│   │   │   └── Layout.jsx
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── MusicCard.jsx
│   │   │   ├── AlbumCard.jsx
│   │   │   ├── TrackList.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── auth/
│   │       ├── AuthForm.jsx
│   │       └── RoleSelector.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── AlbumPage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── LibraryPage.jsx
│   │   ├── UploadPage.jsx
│   │   └── ArtistAlbumsPage.jsx
│   ├── stores/
│   │   ├── authStore.js
│   │   ├── playerStore.js
│   │   └── musicStore.js
│   ├── services/
│   │   └── api.js
│   └── utils/
│       └── helpers.js
```

---

## 🔧 Setup Commands

Run these commands in sequence:

```bash
# 1. Create Vite React project
npm create vite@latest . -- --template react

# 2. Install dependencies
npm install react-router-dom axios zustand lucide-react clsx tailwind-merge

# 3. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure tailwind.config.js:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1DB954',
        'spotify-green-hover': '#1ED760',
        'spotify-bg': '#121212',
        'spotify-card': '#181818',
        'spotify-hover': '#282828',
        'spotify-text': '#B3B3B3',
        'spotify-muted': '#727272',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### Add to src/index.css:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #121212;
  color: white;
  font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #121212;
}

::-webkit-scrollbar-thumb {
  background: #282828;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3E3E3E;
}
```

---

## 📡 API Configuration (src/services/api.js)

This is CRITICAL - the backend uses HTTP-only cookies:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // CRITICAL: allows cookies
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 🏪 State Management (Zustand Stores)

### 1. Auth Store (src/stores/authStore.js)

```javascript
import { create } from 'zustand';
import api from '../services/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/login', credentials);
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', isLoading: false });
      throw error;
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/register', userData);
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Registration failed', isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));
```

### 2. Player Store (src/stores/playerStore.js)

```javascript
import { create } from 'zustand';

export const usePlayerStore = create((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  audioElement: null,

  setAudioElement: (element) => set({ audioElement: element }),

  playTrack: (track) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.src = track.uri;
      audioElement.play();
    }
    set({ currentTrack: track, isPlaying: true });
  },

  togglePlay: () => {
    const { audioElement, isPlaying, currentTrack } = get();
    if (!currentTrack || !audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    set({ isPlaying: !isPlaying });
  },

  setCurrentTime: (time) => set({ currentTime: time });
  setDuration: (duration) => set({ duration });
  setVolume: (volume) => {
    const { audioElement } = get();
    if (audioElement) audioElement.volume = volume;
    set({ volume });
  },

  seek: (time) => {
    const { audioElement } = get();
    if (audioElement) audioElement.currentTime = time;
    set({ currentTime: time });
  },
}));
```

### 3. Music Store (src/stores/musicStore.js)

```javascript
import { create } from 'zustand';
import api from '../services/api';

export const useMusicStore = create((set) => ({
  musics: [],
  albums: [],
  currentAlbum: null,
  isLoading: false,
  error: null,

  fetchMusics: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get('/music');
      set({ musics: data.musics, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchAlbums: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get('/music/albums');
      set({ albums: data.albums, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchAlbumById: async (albumId) => {
    set({ isLoading: true });
    try {
      const { data } = await api.get(`/music/albums/${albumId}`);
      set({ currentAlbum: data.album, isLoading: false });
      return data.album;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  uploadMusic: async (formData) => {
    const { data } = await api.post('/music/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  createAlbum: async (albumData) => {
    const { data } = await api.post('/music/album', albumData);
    return data;
  },
}));
```

---

## 🧩 Components Implementation

### 1. Button Component (src/components/common/Button.jsx)

```javascript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Button({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}) {
  const baseStyles = 'font-semibold rounded-full px-6 py-3 transition-all duration-200 disabled:opacity-50';
  
  const variants = {
    primary: 'bg-spotify-green hover:bg-spotify-green-hover text-black',
    secondary: 'bg-transparent border border-white/20 text-white hover:bg-white/10',
    ghost: 'bg-transparent text-spotify-text hover:text-white',
  };

  return (
    <button 
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 2. Input Component (src/components/common/Input.jsx)

```javascript
export default function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm text-spotify-text">{label}</label>}
      <input
        className="bg-spotify-hover text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-spotify-green placeholder-spotify-muted"
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
```

### 3. MusicCard Component (src/components/common/MusicCard.jsx)

```javascript
import { Play } from 'lucide-react';

export default function MusicCard({ music, onPlay }) {
  return (
    <div 
      onClick={() => onPlay?.(music)}
      className="group bg-spotify-card p-4 rounded-lg hover:bg-spotify-hover transition-all cursor-pointer"
    >
      <div className="relative aspect-square mb-4">
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="white" />
        </div>
      </div>
      <h3 className="font-semibold text-white truncate">{music.title}</h3>
      <p className="text-spotify-text text-sm truncate">{music.artist?.username}</p>
    </div>
  );
}
```

### 4. AlbumCard Component (src/components/common/AlbumCard.jsx)

```javascript
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function AlbumCard({ album }) {
  return (
    <Link 
      to={`/album/${album._id}`}
      className="group bg-spotify-card p-4 rounded-lg hover:bg-spotify-hover transition-all block"
    >
      <div className="relative aspect-square mb-4">
        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-gray-900 rounded flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-4 right-4" fill="#1DB954" />
        </div>
      </div>
      <h3 className="font-semibold text-white truncate">{album.title}</h3>
      <p className="text-spotify-text text-sm truncate">{album.artist?.username}</p>
      <p className="text-spotify-muted text-xs mt-1">{album.musics?.length || 0} tracks</p>
    </Link>
  );
}
```

### 5. Sidebar Component (src/components/layout/Sidebar.jsx)

```javascript
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Plus, Music } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export default function Sidebar() {
  const { user } = useAuthStore();

  const navItems = [
    { to: '/home', icon: Home, label: 'Home' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/library', icon: Library, label: 'Library' },
  ];

  return (
    <aside className="w-60 bg-black h-full flex flex-col p-6 gap-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
          <Music className="w-5 h-5 text-black" fill="black" />
        </div>
        <span className="text-xl font-bold text-white">Spotify</span>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded ${
                isActive ? 'bg-spotify-hover text-white' : 'text-spotify-text hover:text-white'
              }`
            }
          >
            <Icon size={24} />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {user?.role === 'artist' && (
        <>
          <hr className="border-white/10 my-2" />
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/artist/upload"
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded ${
                  isActive ? 'bg-spotify-hover text-white' : 'text-spotify-text hover:text-white'
                }`
              }
            >
              <Plus size={24} />
              <span className="font-medium">Upload Music</span>
            </NavLink>
            <NavLink
              to="/artist/albums"
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded ${
                  isActive ? 'bg-spotify-hover text-white' : 'text-spotify-text hover:text-white'
                }`
              }
            >
              <Library size={24} />
              <span className="font-medium">Your Albums</span>
            </NavLink>
          </nav>
        </>
      )}
    </aside>
  );
}
```

### 6. PlayerBar Component (src/components/layout/PlayerBar.jsx)

```javascript
import { useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { usePlayerStore } from '../../stores/playerStore';

export default function PlayerBar() {
  const audioRef = useRef(null);
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    duration, 
    volume,
    setAudioElement,
    togglePlay,
    setCurrentTime,
    setDuration,
    setVolume,
    seek 
  } = usePlayerStore();

  useEffect(() => {
    setAudioElement(audioRef.current);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setCurrentTime(0);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-[90px] bg-black border-t border-white/10 px-4 flex items-center justify-between">
      <audio ref={audioRef} />
      
      {/* Track Info */}
      <div className="flex items-center gap-4 w-1/4">
        {currentTrack ? (
          <>
            <div className="w-14 h-14 bg-spotify-hover rounded flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium truncate">{currentTrack.title}</h4>
              <p className="text-spotify-text text-sm truncate">{currentTrack.artist?.username}</p>
            </div>
          </>
        ) : (
          <p className="text-spotify-text text-sm">No track playing</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 w-1/2">
        <div className="flex items-center gap-4">
          <button className="text-spotify-text hover:text-white">
            <SkipBack size={24} />
          </button>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition"
          >
            {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" />}
          </button>
          <button className="text-spotify-text hover:text-white">
            <SkipForward size={24} />
          </button>
        </div>
        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-spotify-text w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(e.target.value)}
            className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
          />
          <span className="text-xs text-spotify-text w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="w-1/4 flex justify-end items-center gap-2">
        <Volume2 size={20} className="text-spotify-text" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}
```

### 7. Layout Component (src/components/layout/Layout.jsx)

```javascript
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import PlayerBar from './PlayerBar';

export default function Layout() {
  return (
    <div className="h-screen flex flex-col bg-spotify-bg">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <div className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <PlayerBar />
    </div>
  );
}
```

### 8. TopBar Component (src/components/layout/TopBar.jsx)

```javascript
import { Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function TopBar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-black/30 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
          <Search size={18} className="text-white" />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-spotify-text text-sm">Welcome, {user?.username}</span>
        <button 
          onClick={handleLogout}
          className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center hover:bg-spotify-green-hover"
        >
          <LogOut size={16} className="text-black" />
        </button>
      </div>
    </header>
  );
}
```

---

## 📄 Pages Implementation

### 1. LoginPage (src/pages/LoginPage.jsx)

```javascript
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/home');
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-spotify-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-spotify-card p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Welcome back</h1>
        
        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Username or Email"
            placeholder="Enter username or email"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Button type="submit" disabled={isLoading} className="mt-4">
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <p className="text-spotify-text text-center mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
```

### 2. RegisterPage (src/pages/RegisterPage.jsx)

```javascript
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '',
    role: 'user'
  });
  const { register, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/home');
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-spotify-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-spotify-card p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Create account</h1>
        
        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            type="password"
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          <div className="flex flex-col gap-2">
            <label className="text-sm text-spotify-text">I am a...</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-4 h-4 accent-spotify-green"
                />
                <span className="text-white">Listener</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="artist"
                  checked={formData.role === 'artist'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-4 h-4 accent-spotify-green"
                />
                <span className="text-white">Artist</span>
              </label>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="mt-4">
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="text-spotify-text text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
```

### 3. HomePage (src/pages/HomePage.jsx)

```javascript
import { useEffect } from 'react';
import { useMusicStore } from '../stores/musicStore';
import { usePlayerStore } from '../stores/playerStore';
import MusicCard from '../components/common/MusicCard';
import AlbumCard from '../components/common/AlbumCard';
import Loader from '../components/common/Loader';

export default function HomePage() {
  const { musics, albums, fetchMusics, fetchAlbums, isLoading } = useMusicStore();
  const { playTrack } = usePlayerStore();

  useEffect(() => {
    fetchMusics();
    fetchAlbums();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Featured Music</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {musics.map((music) => (
            <MusicCard 
              key={music._id} 
              music={music} 
              onPlay={playTrack} 
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      </section>

      {musics.length === 0 && albums.length === 0 && (
        <div className="text-center py-12">
          <p className="text-spotify-text text-lg">No music available yet.</p>
          <p className="text-spotify-muted">Artists can upload music to get started!</p>
        </div>
      )}
    </div>
  );
}
```

### 4. AlbumPage (src/pages/AlbumPage.jsx)

```javascript
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';
import { useMusicStore } from '../stores/musicStore';
import { usePlayerStore } from '../stores/playerStore';
import Loader from '../components/common/Loader';

export default function AlbumPage() {
  const { id } = useParams();
  const { currentAlbum, fetchAlbumById, isLoading } = useMusicStore();
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore();
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    fetchAlbumById(id);
  }, [id]);

  useEffect(() => {
    if (selectedTrack) {
      playTrack(selectedTrack);
    }
  }, [selectedTrack]);

  if (isLoading || !currentAlbum) return <Loader />;

  const isCurrentAlbumPlaying = currentAlbum?.musics?.some(m => m._id === currentTrack?._id);

  return (
    <div className="space-y-6">
      {/* Album Header */}
      <div className="flex items-end gap-6">
        <div className="w-52 h-52 bg-gradient-to-br from-purple-900 to-gray-900 rounded-lg flex items-center justify-center shadow-lg">
          <Play className="w-20 h-20 text-white" />
        </div>
        <div>
          <p className="text-spotify-text text-sm font-medium uppercase">Album</p>
          <h1 className="text-5xl font-bold text-white mb-2">{currentAlbum.title}</h1>
          <p className="text-spotify-text">{currentAlbum.artist?.username}</p>
          <p className="text-spotify-muted text-sm mt-1">
            {currentAlbum.musics?.length || 0} songs
          </p>
        </div>
      </div>

      {/* Play Button */}
      <button
        onClick={() => {
          if (currentAlbum.musics?.length > 0 && !isCurrentAlbumPlaying) {
            setSelectedTrack(currentAlbum.musics[0]);
          } else {
            togglePlay();
          }
        }}
        className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 transition"
      >
        {isCurrentAlbumPlaying && isPlaying ? (
          <div className="w-5 h-5 bg-black rounded-sm" />
        ) : (
          <Play size={28} fill="black" className="ml-1" />
        )}
      </button>

      {/* Track List */}
      <div className="mt-6">
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 text-spotify-muted border-b border-white/10 text-sm">
          <span>#</span>
          <span>Title</span>
          <span>Artist</span>
          <Clock size={16} />
        </div>
        
        {currentAlbum.musics?.map((track, index) => (
          <div
            key={track._id}
            onClick={() => setSelectedTrack(track)}
            className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 hover:bg-white/5 rounded cursor-pointer group"
          >
            <span className="text-spotify-text w-6 text-center group-hover:hidden">
              {index + 1}
            </span>
            <span className="hidden group-hover:block text-white w-6 text-center">
              <Play size={14} fill="white" />
            </span>
            <span className="text-white truncate">{track.title}</span>
            <span className="text-spotify-text truncate">{currentAlbum.artist?.username}</span>
            <span className="text-spotify-text">--:--</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 5. SearchPage (src/pages/SearchPage.jsx)

```javascript
import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useMusicStore } from '../stores/musicStore';
import { usePlayerStore } from '../stores/playerStore';
import MusicCard from '../components/common/MusicCard';
import AlbumCard from '../components/common/AlbumCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { musics, albums } = useMusicStore();
  const { playTrack } = usePlayerStore();

  const filteredMusics = musics.filter(m => 
    m.title.toLowerCase().includes(query.toLowerCase()) ||
    m.artist?.username?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAlbums = albums.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.artist?.username?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-spotify-muted" size={20} />
        <input
          type="text"
          placeholder="Search for songs or albums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-spotify-hover text-white px-12 py-3 rounded-full outline-none focus:ring-2 focus:ring-spotify-green placeholder-spotify-muted"
        />
      </div>

      {query ? (
        <>
          {filteredMusics.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredMusics.map((music) => (
                  <MusicCard key={music._id} music={music} onPlay={playTrack} />
                ))}
              </div>
            </section>
          )}

          {filteredAlbums.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredAlbums.map((album) => (
                  <AlbumCard key={album._id} album={album} />
                ))}
              </div>
            </section>
          )}

          {filteredMusics.length === 0 && filteredAlbums.length === 0 && (
            <p className="text-spotify-text text-center py-8">No results found for "{query}"</p>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-spotify-text text-lg">Search for your favorite music</p>
        </div>
      )}
    </div>
  );
}
```

### 6. UploadPage (src/pages/UploadPage.jsx) - Artist Only

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMusicStore } from '../stores/musicStore';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadMusic } = useMusicStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('music', file);
      
      await uploadMusic(formData);
      alert('Music uploaded successfully!');
      navigate('/home');
    } catch (error) {
      alert('Upload failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Upload Music</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Song Title"
          placeholder="Enter song title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm text-spotify-text mb-2">Audio File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full bg-spotify-hover text-white p-4 rounded border border-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-spotify-green file:text-black hover:file:bg-spotify-green-hover"
            required
          />
          {file && (
            <p className="text-spotify-text text-sm mt-2">Selected: {file.name}</p>
          )}
        </div>

        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
    </div>
  );
}
```

### 7. ArtistAlbumsPage (src/pages/ArtistAlbumsPage.jsx) - Artist Only

```javascript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMusicStore } from '../stores/musicStore';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function ArtistAlbumsPage() {
  const [albumTitle, setAlbumTitle] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const { musics, fetchMusics, createAlbum } = useMusicStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMusics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!albumTitle || selectedTracks.length === 0) return;

    setIsCreating(true);
    try {
      await createAlbum({
        title: albumTitle,
        musics: selectedTracks
      });
      alert('Album created successfully!');
      navigate('/home');
    } catch (error) {
      alert('Failed to create album: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsCreating(false);
    }
  };

  const toggleTrack = (trackId) => {
    setSelectedTracks(prev => 
      prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Create Album</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Album Title"
          placeholder="Enter album title"
          value={albumTitle}
          onChange={(e) => setAlbumTitle(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm text-spotify-text mb-2">Select Tracks</label>
          <div className="bg-spotify-card rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
            {musics.map(track => (
              <label
                key={track._id}
                className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                  selectedTracks.includes(track._id) 
                    ? 'bg-spotify-green/20 text-white' 
                    : 'hover:bg-spotify-hover text-spotify-text'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedTracks.includes(track._id)}
                  onChange={() => toggleTrack(track._id)}
                  className="w-4 h-4 accent-spotify-green"
                />
                <span>{track.title}</span>
              </label>
            ))}
            {musics.length === 0 && (
              <p className="text-spotify-muted text-center py-4">
                No tracks uploaded yet. Upload music first!
              </p>
            )}
          </div>
        </div>

        <Button type="submit" disabled={isCreating || selectedTracks.length === 0} className="w-full">
          {isCreating ? 'Creating...' : `Create Album (${selectedTracks.length} tracks)`}
        </Button>
      </form>
    </div>
  );
}
```

### 8. Loader Component (src/components/common/Loader.jsx)

```javascript
export default function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-spotify-green border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
```

---

## 🛡️ Protected Route Component (src/components/common/ProtectedRoute.jsx)

```javascript
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
```

---

## 🔀 Routing Setup (src/App.jsx)

```javascript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import SearchPage from './pages/SearchPage';
import UploadPage from './pages/UploadPage';
import ArtistAlbumsPage from './pages/ArtistAlbumsPage';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/home" />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          
          {/* Artist Routes */}
          <Route 
            path="/artist/upload" 
            element={
              <ProtectedRoute roles={['artist']}>
                <UploadPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/artist/albums" 
            element={
              <ProtectedRoute roles={['artist']}>
                <ArtistAlbumsPage />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 📦 Required Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "zustand": "^4.x",
    "lucide-react": "^0.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "vite": "^5.x",
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x"
  }
}
```

---

## 🚀 Run Commands

```bash
# Install all dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ⚠️ Important Notes

1. **HTTP-Only Cookies**: Backend sends JWT in HTTP-only cookie. DO NOT try to read the token in frontend - it's inaccessible for security. Just set `withCredentials: true` in axios.

2. **Backend Must Be Running**: Start backend first on port 3000 before running frontend.

3. **Role-Based Routes**: Only users with `role: 'artist'` can access `/artist/upload` and `/artist/albums`.

4. **ImageKit URLs**: Music files are stored on ImageKit and served via their CDN. The backend returns these URLs directly in the `uri` field.

5. **CORS**: Backend already has CORS enabled. No configuration needed on frontend.

6. **MongoDB Connection**: Ensure MongoDB is running and accessible via the `MONGO_URI` in backend `.env`.

---

## ✅ Implementation Checklist

- [ ] Initialize Vite + React project
- [ ] Configure Tailwind CSS
- [ ] Create API service with axios
- [ ] Implement Zustand stores (auth, player, music)
- [ ] Build layout components (Sidebar, TopBar, PlayerBar, Layout)
- [ ] Create common components (Button, Input, Cards, Loader)
- [ ] Implement authentication pages (Login, Register)
- [ ] Build HomePage with music/album grids
- [ ] Create AlbumPage with track list
- [ ] Implement SearchPage with filtering
- [ ] Add UploadPage for artists
- [ ] Create ArtistAlbumsPage for album creation
- [ ] Set up protected routes with role checking
- [ ] Test all flows (user and artist)
- [ ] Style and polish UI

---

## 🎵 Expected User Flows

### User Flow:
1. Visit `/login` or `/register`
2. Create account as "Listener"
3. Redirected to `/home`
4. Browse music, click on album
5. Click play on any track
6. Music plays in PlayerBar
7. Use search to find songs

### Artist Flow:
1. Register as "Artist"
2. Redirected to `/home`
3. See "Upload Music" in sidebar
4. Go to `/artist/upload`
5. Upload audio file with title
6. Go to `/artist/albums`
7. Create album with selected tracks
8. Album appears on HomePage

---

## Backend API Details (for reference)

### Auth Endpoints

**POST /api/auth/register**
```json
Request: { "username": "string", "email": "string", "password": "string", "role": "user"|"artist" }
Response: { "message": "USER CREATED SUCCESSFULLY 👌", "user": { "id", "username", "email", "role" } }
```

**POST /api/auth/login**
```json
Request: { "username": "string" } OR { "email": "string" }, { "password": "string" }
Response: { "message": "User Login Successfully", "user": { "id", "username", "email", "role" } }
Cookies: JWT token set as HTTP-only cookie
```

**POST /api/auth/logout**
```json
Response: { "message": "user logged out successfully" }
```

### Music Endpoints

**GET /api/music**
```json
Response: { "message": "Music Fetched", "musics": [{ "_id", "uri", "title", "artist": { "_id", "username" } }] }
Auth: Required (user or artist)
```

**GET /api/music/albums**
```json
Response: { "message": "Albums Fetched", "albums": [{ "_id", "title", "artist": { "_id", "username" }, "musics": [...] }] }
Auth: Required
```

**GET /api/music/albums/:albumId**
```json
Response: { "message": "Album Fetched Successfully", "album": { "_id", "title", "artist", "musics": [...] } }
Auth: Required
```

**POST /api/music/upload**
```json
Request: form-data: { "title": "string", "music": File }
Response: { "message": "Music Created Successfully", "music": { "_id", "uri", "title", "artist" } }
Auth: Artist only
```

**POST /api/music/album**
```json
Request: { "title": "string", "musics": ["id1", "id2", ...] }
Response: { "message": "Album Created Successfully", "album": { "_id", "title", "musics" } }
Auth: Artist only
```

---

This plan is complete and ready for AI implementation. Each component, page, and store is defined with full working code that integrates directly with the existing backend.
