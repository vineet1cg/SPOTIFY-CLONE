# Spotify Clone

A full-stack music streaming application built with Node.js, Express, MongoDB, and React.

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (HTTP-only cookies)
- **File Storage**: ImageKit
- **Middleware**: Multer (file uploads)

### Frontend
- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand / React Context
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Features

### Authentication
- User registration with role selection (user/artist)
- Login with username or email
- JWT-based authentication with HTTP-only cookies
- Logout functionality

### For Users
- Browse all available music
- View and explore albums
- Play music
- Search functionality

### For Artists
- Upload music files
- Create albums with existing tracks
- Manage their music library

## Project Structure

```
SPOTIFY/
├── BACKEND/
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # File upload services
│   │   └── db/             # Database connection
│   ├── server.js           # Entry point
│   └── package.json
├── FRONTEND/              # React application (to be created)
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- ImageKit account (for file storage)

### Backend Setup

```bash
cd BACKEND
npm install
```

Create a `.env` file in BACKEND:

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
```

### Frontend Setup

```bash
cd FRONTEND
npm create vite@latest . -- --template react
npm install
npm run dev
```

## API Endpoints

### Auth Routes (`/api/auth`)
| Method | Endpoint   | Description          |
|--------|------------|----------------------|
| POST   | /register  | Register new user    |
| POST   | /login     | User login           |
| POST   | /logout    | User logout          |

### Music Routes (`/api/music`)
| Method | Endpoint      | Description           | Auth       |
|--------|---------------|-----------------------|------------|
| POST   | /upload       | Upload new music      | Artist     |
| POST   | /album        | Create new album      | Artist     |
| GET    | /             | Get all music         | User       |
| GET    | /albums       | Get all albums        | User       |
| GET    | /albums/:id   | Get album by ID       | User       |

## License

ISC
