// Elegant Minimal Color Palette
export const colors = {
  // === Ana Renkler ===
  primary: {
    DEFAULT: '#6D28D9', // Derin, mücevher tonu bir mor (Ametist)
    light: '#8B5CF6',
    dark: '#5B21B6',
  },
  secondary: {
    DEFAULT: '#D4AF37', // Klasik, sıcak bir altın rengi
    light: '#E7C96D',
  },

  // === Nötr Renkler (Çok Önemli!) ===
  background: {
    DEFAULT: '#F9FAFB', // Çok hafif kırık, temiz bir beyaz
    dark: '#111827',     // Koyu mod için - Zengin bir "off-black"
  },
  surface: {
    DEFAULT: '#FFFFFF', // Kartlar ve pop-up'lar için saf beyaz
    dark: '#1F2937',     // Koyu mod kart yüzeyi
  },
  text: {
    primary: '#1F2937',   // Ana metin rengi - Saf siyahtan daha yumuşak
    secondary: '#6B7280', // İkincil, daha az önemli metinler
    tertiary: '#9CA3AF',  // En az önemli, placeholder gibi metinler
    onDark: '#F9FAFB',    // Koyu arka plan üzerindeki metinler
    link: '#6D28D9',      // Tıklanabilir linkler için ana renk
  },
  
  // === Vurgu ve Durum Renkleri ===
  border: '#E5E7EB',       // İnce çizgiler ve ayraçlar için
  success: '#10B981',      // Başarı durumu
  warning: '#F59E0B',      // Uyarı
  error: '#EF4444',        // Hata
};
