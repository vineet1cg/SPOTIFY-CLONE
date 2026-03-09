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
      audioElement.play().catch(err => console.error("Playback error:", err));
    }
    set({ currentTrack: track, isPlaying: true });
  },

  togglePlay: () => {
    const { audioElement, isPlaying, currentTrack } = get();
    if (!currentTrack || !audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch(err => console.error("Playback error:", err));
    }
    set({ isPlaying: !isPlaying });
  },

  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
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
