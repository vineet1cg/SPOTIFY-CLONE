# 🎵 Spotify Clone

A full-stack music streaming application built with Node.js, Express, MongoDB, and React. 🎶

---

## 🛠️ Tech Stack

### Backend ⚙️
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB (Mongoose) | Database & ODM |
| JWT | Authentication (HTTP-only cookies) |
| ImageKit | File storage for audio files |
| Multer | File upload middleware |

### Frontend 🖥️
| Technology | Purpose |
|------------|---------|
| React + Vite | UI Framework & Build tool |
| Tailwind CSS v4 | Styling |
| Zustand | State management |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| Lucide React | Icons |

---

## ✨ Features

### 🔐 Authentication
- ➕ User registration with role selection (`user` or `artist`)
- 🔑 Login with username **or** email
- 🍪 JWT-based auth via HTTP-only cookies
- 🚪 Logout functionality

### 👤 For Users
- 🎧 Browse all available music
- 💿 View and explore albums
- ▶️ Play music with player controls
- 🔍 Search functionality
- 📚 Personal library

### 🎸 For Artists
- 📤 Upload music files
- 💿 Create albums with existing tracks
- 📚 Manage their music library

---

## 📁 Project Structure

```
SPOTIFY/
├── BACKEND/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── services/       # File upload services
│   │   └── db/             # Database connection
│   ├── server.js           # Entry point
│   └── package.json
├── Frontend/               # React + Vite + Tailwind CSS v4 app
│   ├── src/
│   │   ├── assets/         # Static assets
│   │   ├── components/     # React components
│   │   │   ├── common/     # Button, Input, Loader, ProtectedRoute, AlbumCard, MusicCard
│   │   │   └── layout/     # Layout, Sidebar, TopBar, PlayerBar
│   │   ├── pages/          # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── SearchPage.jsx
│   │   │   ├── AlbumPage.jsx
│   │   │   ├── LibraryPage.jsx
│   │   │   ├── UploadPage.jsx
│   │   │   └── ArtistAlbumsPage.jsx
│   │   ├── services/       # API client (axios)
│   │   ├── stores/         # Zustand state stores (auth, music, player)
│   │   ├── utils/          # Helper functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+) 🟢
- MongoDB (local or Atlas) 🗄️
- ImageKit account 🔗

### Backend Setup ⚡

```bash
cd BACKEND
npm install
```

Create `.env` file in `BACKEND/`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
IK_PUBLIC_KEY=your_imagekit_public_key
IK_PRIVATE_KEY=your_imagekit_private_key
IK_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the server:

```bash
npm run dev
# Server runs on http://localhost:3000 🎉
```

### Frontend Setup 🖱️

```bash
cd Frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Auth Routes (`/api/auth`) 🔐

| Method | Endpoint   | Description          | Request Body |
|--------|------------|----------------------|--------------|
| POST   | `/register`  | Register new user    | `{username, email, password, role?}` |
| POST   | `/login`     | User login           | `{username?, email?, password}` |
| POST   | `/logout`    | User logout          | (empty) |

**Response (register/login):**
```json
{
  "message": "USER CREATED SUCCESSFULLY 👌",
  "user": {
    "id": "...",
    "username": "...",
    "email": "...",
    "role": "user"
  }
}
```

> ⚠️ **Auth Note**: JWT token is set as HTTP-only cookie automatically. No manual token handling needed!

---

### Music Routes (`/api/music`) 🎵

| Method | Endpoint         | Description          | Auth      | Request Body / Params |
|--------|------------------|----------------------|-----------|----------------------|
| GET    | `/`              | Get all music        | User      | (none)               |
| GET    | `/albums`        | Get all albums       | User      | (none)               |
| GET    | `/albums/:id`    | Get album by ID      | User      | params: albumId      |
| POST   | `/upload`        | Upload new music     | **Artist**| form-data: `{title, music}` |
| POST   | `/album`         | Create new album     | **Artist**| `{title, musics: [ids]}` |

**GET / response:**
```json
{
  "message": "Music Fetched",
  "musics": [
    {
      "_id": "...",
      "uri": "https://...",
      "title": "Song Title",
      "artist": { "_id": "...", "username": "ArtistName" }
    }
  ]
}
```

**GET /albums response:**
```json
{
  "message": "Albums Fetched",
  "albums": [
    {
      "_id": "...",
      "title": "Album Title",
      "artist": { "_id": "...", "username": "ArtistName" },
      "musics": [{ "_id": "...", "title": "...", "uri": "..." }]
    }
  ]
}
```

---

## 📋 User Model Schema

```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ['user', 'artist'], default: 'user')
}
```

---

## 🎼 Music Model Schema

```javascript
{
  uri: String (required),      // ImageKit URL of audio file
  title: String (required),
  artist: ObjectId (ref: 'user', required)
}
```

---

## 💿 Album Model Schema

```javascript
{
  title: String (required),
  musics: [ObjectId (ref: 'music')],
  artist: ObjectId (ref: 'user', required)
}
```

---

## 🔒 Role-Based Access

| Role   | Access Level |
|--------|--------------|
| `user` | Can browse music, view albums, play music |
| `artist` | All user permissions + can upload music, create albums |

> 📌 Artists can also access user endpoints. Role check happens in backend middleware.

---

## 🎯 Quick Start for Frontend Dev

1. **Run backend first**: `cd BACKEND && npm run dev`
2. **Run frontend**: `cd Frontend && npm run dev`
3. **Configure CORS**: Backend uses `cors` middleware (already enabled)
4. **Use credentials**: Set `axios.defaults.withCredentials = true` for cookie auth

---

## 📄 License

ISC ©️
