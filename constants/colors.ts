// Ana Renkler
export const colors = {
  // Altın Sektörü Renkleri
  gold: {
    primary: '#FFD700',      // Altın sarısı
    secondary: '#FFA500',    // Turuncu altın
    dark: '#B8860B',         // Koyu altın
    light: '#FFF8DC',        // Açık altın
    accent: '#DAA520',       // Altın vurgu
  },

  // Genel Renkler
  primary: '#007AFF',        // Ana mavi
  secondary: '#4CAF50',      // Yeşil
  success: '#4CAF50',        // Başarı
  warning: '#FF9800',        // Uyarı
  error: '#F44336',          // Hata
  info: '#2196F3',           // Bilgi

  // Nötr Renkler
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Arka Plan Renkleri
  background: {
    primary: '#F8F9FA',
    secondary: '#FFFFFF',
    card: '#FFFFFF',
    modal: 'rgba(0, 0, 0, 0.5)',
  },

  // Metin Renkleri
  text: {
    primary: '#333333',
    secondary: '#666666',
    tertiary: '#999999',
    inverse: '#FFFFFF',
    disabled: '#CCCCCC',
  },

  // Gölge Renkleri
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.15)',
    dark: 'rgba(0, 0, 0, 0.25)',
  },
};

// Sektör Renkleri
export const sectorColors = {
  jewelry: colors.gold.primary,
  food: '#4CAF50',
  textile: '#2196F3',
  electronics: '#9C27B0',
  construction: '#FF9800',
  automotive: '#F44336',
};

// Gradient Renkleri
export const gradients = {
  gold: {
    primary: ['#FFD700', '#FFA500'],
    secondary: ['#FFF8DC', '#FFD700'],
    dark: ['#B8860B', '#DAA520'],
  },
  blue: {
    primary: ['#007AFF', '#0056CC'],
    secondary: ['#E3F2FD', '#007AFF'],
  },
};
