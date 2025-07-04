// constants/styles.ts
import { colors } from './colors';
export { colors };

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  // Hafif, zarif bir "kalkıklık" hissi için
  subtle: {
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  // Daha belirgin kartlar veya interaktif elemanlar için
  medium: {
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: colors.text.primary,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: colors.text.primary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.text.primary,
  },
};