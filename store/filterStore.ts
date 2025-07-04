// store/filterStore.ts
import { create } from 'zustand';

interface FilterState {
  selectedCategory: string | 'all';
  setSelectedCategory: (category: string | 'all') => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: 'all',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
