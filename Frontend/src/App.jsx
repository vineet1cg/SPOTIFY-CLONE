import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Layout
import Layout from './components/layout/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import UploadPage from './pages/UploadPage';
import ArtistAlbumsPage from './pages/ArtistAlbumsPage';

// Common
import ProtectedRoute from './components/common/ProtectedRoute';
import Loader from './components/common/Loader';

function App() {
  const { checkAuth, isLoading, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-spotify-bg flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/home" replace /> : <RegisterPage />} 
        />

        {/* Protected App Routes */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
          
          {/* Artist Only Routes */}
          <Route 
            path="/artist/upload" 
            element={
              <ProtectedRoute role="artist">
                <UploadPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/artist/albums" 
            element={
              <ProtectedRoute role="artist">
                <ArtistAlbumsPage />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
