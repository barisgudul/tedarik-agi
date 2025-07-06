// store/filterStore.ts
import { create } from 'zustand';

interface FilterState {
  viewMode: 'products' | 'sellers';
  selectedCategory: string | 'all';
  
  showProducts: (category: string | 'all') => void;
  showSellers: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  viewMode: 'products',
  selectedCategory: 'all',
  
  showProducts: (category) => set({ viewMode: 'products', selectedCategory: category }),
  
  showSellers: () => set({ viewMode: 'sellers', selectedCategory: 'all' }),
}));
