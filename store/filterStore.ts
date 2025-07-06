// store/filterStore.ts
import { create } from 'zustand';
import { Seller } from '../types'; // Seller tipini import etmeyi unutma

interface FilterState {
  viewMode: 'products' | 'sellers'; // 'products' veya 'sellers'
  selectedCategory: string | 'all';
  
  // Fonksiyonları güncelle
  showProducts: (category: string | 'all') => void;
  showSellers: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  viewMode: 'products',
  selectedCategory: 'all',
  
  showProducts: (category) => set({ 
    viewMode: 'products', 
    selectedCategory: category 
  }),
  
  showSellers: () => set({ 
    viewMode: 'sellers',
    // Satıcıları gösterirken, ürün kategorisi filtresini 'all' yapalım ki karışıklık olmasın.
    selectedCategory: 'all' 
  }),
}));
