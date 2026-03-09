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
