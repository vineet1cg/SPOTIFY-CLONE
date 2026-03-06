# Frontend Development Plan

## Overview
Build a modern Spotify-like music streaming interface using React + Vite + Tailwind CSS. The frontend will integrate seamlessly with the existing Express backend without requiring any backend changes.

---

## Tech Stack

| Category | Technology | Version/Notes |
|----------|------------|---------------|
| Build Tool | Vite | Fast dev server, HMR |
| Framework | React | 18+ |
| Routing | React Router DOM | v6 |
| Styling | Tailwind CSS | Utility-first |
| State | Zustand | Lightweight alternative to Redux |
| HTTP | Axios | Interceptors for auth |
| Icons | Lucide React | Modern icon set |
| Audio | HTML5 Audio API | For music playback |

---

## Theme & Design System

### Color Palette (Dark Mode - Spotify-inspired)
```
--bg-primary: #121212       (Main background)
--bg-secondary: #181818     (Cards, sidebar)
--bg-tertiary: #282828     (Hover states)
--accent-green: #1DB954    (Primary accent - Spotify green)
--accent-green-hover: #1ED760
--text-primary: #FFFFFF
--text-secondary: #B3B3B3
--text-muted: #727272
--border: #333333
```

### Typography
- **Primary Font**: Inter or system-ui
- **Headings**: Bold, 24-32px
- **Body**: Regular, 14-16px
- **Small**: 12px

### Layout
- **Sidebar**: Fixed left, 240px width, collapsible on mobile
- **Main Content**: Fluid, scrollable
- **Player Bar**: Fixed bottom, 90px height
- **Responsive Breakpoints**:
  - Mobile: < 768px (sidebar hidden, bottom nav)
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page / Login redirect |
| `/login` | LoginPage | User login form |
| `/register` | RegisterPage | User registration |
| `/home` | HomePage | Main feed with music/albums |
| `/search` | SearchPage | Search music and albums |
| `/album/:id` | AlbumPage | Album details with tracklist |
| `/library` | LibraryPage | User's saved content |
| `/artist/upload` | UploadPage | Artist music upload (artist only) |
| `/artist/albums` | ArtistAlbums | Artist album management |

---

## UI Components

### Layout Components
1. **Sidebar**
   - Logo area
   - Navigation links (Home, Search, Library)
   - Playlist section (scrollable)
   - Create playlist button

2. **TopBar**
   - Navigation arrows (back/forward)
   - Search bar
   - User profile dropdown

3. **PlayerBar**
   - Current track info (art, title, artist)
   - Playback controls (prev, play/pause, next)
   - Progress bar with timestamps
   - Volume control
   - Queue button

### Shared Components
1. **MusicCard**
   - Album art (square, rounded corners)
   - Title (truncated)
   - Artist name
   - Hover: play button overlay

2. **AlbumCard**
   - Album art
   - Album title
   - Artist name
   - Track count

3. **TrackListItem**
   - Track number
   - Title + Artist
   - Duration
   - Play button on hover

4. **Button** (variants: primary, secondary, ghost)
5. **Input** (text, password, email)
6. **Modal**
7. **Loader/Spinner**
8. **Toast notifications**

### Auth Components
1. **LoginForm** - Email/username + password
2. **RegisterForm** - Username, email, password, role selector

---

## State Management (Zustand Stores)

### AuthStore
```js
{
  user: { id, username, email, role } | null,
  isAuthenticated: boolean,
  login: (credentials) => Promise,
  register: (userData) => Promise,
  logout: () => Promise,
  checkAuth: () => Promise
}
```

### PlayerStore
```js
{
  currentTrack: { id, title, uri, artist } | null,
  isPlaying: boolean,
  currentTime: number,
  duration: number,
  volume: number,
  playTrack: (track) => void,
  togglePlay: () => void,
  setVolume: (vol) => void,
  seek: (time) => void
}
```

### MusicStore
```js
{
  musics: [],
  albums: [],
  currentAlbum: null,
  fetchMusics: () => Promise,
  fetchAlbums: () => Promise,
  fetchAlbumById: (id) => Promise
}
```

---

## API Integration

### Axios Configuration
- Base URL: `http://localhost:3000/api`
- WithCredentials: true (for cookies)
- Request interceptor: Attach token from cookie (automatic)
- Response interceptor: Handle 401 redirects to login

### Key API Calls

| Action | Endpoint | Method |
|--------|----------|--------|
| Login | /auth/login | POST |
| Register | /auth/register | POST |
| Logout | /auth/logout | POST |
| Get All Music | /music | GET |
| Get All Albums | /music/albums | GET |
| Get Album | /music/albums/:id | GET |
| Upload Music | /music/upload | POST (multipart) |
| Create Album | /music/album | POST |

---

## Implementation Priority

### Phase 1: Foundation
1. Setup Vite + React + Tailwind
2. Configure React Router
3. Setup Axios instance with interceptors
4. Create Zustand stores
5. Build layout components (Sidebar, TopBar, PlayerBar)

### Phase 2: Authentication
1. Login page + form
2. Register page + form
3. Auth store with persistence
4. Protected routes
5. Role-based access (redirect artists to upload page)

### Phase 3: Core Features
1. Home page with music/album grid
2. Album detail page
3. Music player functionality
4. Search functionality

### Phase 4: Artist Features
1. Upload music page
2. Create album page
3. Artist dashboard

### Phase 5: Polish
1. Animations (framer-motion)
2. Loading states
3. Error handling / toasts
4. Responsive design adjustments

---

## File Structure (Frontend)

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx
│   │   └── PlayerBar.jsx
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── MusicCard.jsx
│   │   ├── AlbumCard.jsx
│   │   └── TrackList.jsx
│   └── auth/
│       ├── LoginForm.jsx
│       └── RegisterForm.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── HomePage.jsx
│   ├── AlbumPage.jsx
│   ├── SearchPage.jsx
│   ├── LibraryPage.jsx
│   ├── UploadPage.jsx
│   └── ArtistAlbumsPage.jsx
├── stores/
│   ├── authStore.js
│   ├── playerStore.js
│   └── musicStore.js
├── services/
│   └── api.js
├── hooks/
│   └── usePlayer.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## Key Implementation Notes

1. **No Backend Changes Required**: All API endpoints are already defined; frontend just needs to consume them
2. **Cookie-based Auth**: Backend uses HTTP-only cookies, so no need to store JWT in localStorage
3. **Role Handling**: Artists get additional routes for uploading music/albums
4. **Audio Playback**: Use HTML5 `<audio>` element with React refs for control
5. **Image URLs**: Music/album cover images come from ImageKit URLs in API response

---

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Dependencies to Install

```bash
npm create vite@latest . -- --template react
npm install react-router-dom axios zustand lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
