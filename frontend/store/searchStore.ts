import { create } from 'zustand';

interface SearchState {
  isOpen: boolean;
  query: string;
  setOpen: (status: boolean) => void;
  setQuery: (q: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  query: '',
  setOpen: (status) => set({ isOpen: status }),
  setQuery: (q) => set({ query: q }),
}));