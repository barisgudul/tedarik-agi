import { colors } from './colors';

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Typography
export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    display: 32,
  },
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: colors.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Border Radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 25,
  full: 9999,
};

// Common Styles
export const commonStyles = {
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  
  // Card Styles
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  
  // Button Styles
  button: {
    primary: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    secondary: {
      backgroundColor: colors.background.secondary,
      borderWidth: 1,
      borderColor: colors.primary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    gold: {
      backgroundColor: colors.gold.primary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
  },
  
  // Text Styles
  text: {
    h1: {
      fontSize: typography.sizes.display,
      fontWeight: typography.weights.bold,
      color: colors.text.primary,
      lineHeight: typography.lineHeights.tight,
    },
    h2: {
      fontSize: typography.sizes.xxxl,
      fontWeight: typography.weights.bold,
      color: colors.text.primary,
      lineHeight: typography.lineHeights.tight,
    },
    h3: {
      fontSize: typography.sizes.xxl,
      fontWeight: typography.weights.semibold,
      color: colors.text.primary,
      lineHeight: typography.lineHeights.normal,
    },
    body: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.normal,
      color: colors.text.primary,
      lineHeight: typography.lineHeights.relaxed,
    },
    caption: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.normal,
      color: colors.text.secondary,
      lineHeight: typography.lineHeights.normal,
    },
    button: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      color: colors.text.inverse,
    },
  },
  
  // Input Styles
  input: {
    container: {
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderWidth: 1,
      borderColor: colors.gray[300],
    },
    text: {
      fontSize: typography.sizes.md,
      color: colors.text.primary,
    },
    placeholder: {
      color: colors.text.tertiary,
    },
  },
  
  // Header Styles
  header: {
    container: {
      backgroundColor: colors.background.secondary,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray[200],
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
    },
    title: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: colors.text.primary,
    },
  },
  
  // Section Styles
  section: {
    container: {
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.semibold,
      color: colors.text.primary,
      marginBottom: spacing.md,
      paddingHorizontal: spacing.lg,
    },
  },
};

// Layout Helpers
export const layout = {
  center: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  spaceBetween: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  spaceAround: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    alignItems: 'center' as const,
  },
};
