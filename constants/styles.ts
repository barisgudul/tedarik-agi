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
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

// Shadows
export const shadows = {
  subtle: {
    shadowColor: colors.shadow.subtle,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  soft: {
    shadowColor: colors.shadow.soft,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
};

// Border Radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Common Styles
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.soft,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  button: {
    primary: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: borderRadius.lg,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      ...shadows.soft,
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: colors.background.secondary,
      borderWidth: 1,
      borderColor: colors.primary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: borderRadius.lg,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      ...shadows.subtle,
    },
    accent: {
      backgroundColor: colors.accent,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: borderRadius.lg,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      ...shadows.soft,
      borderWidth: 0,
    },
    ghost: {
      backgroundColor: 'transparent',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: borderRadius.lg,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderWidth: 0,
    },
  },
  text: {
    h1: {
      fontSize: typography.sizes.display,
      fontWeight: typography.weights.bold,
      color: colors.text.primary,
      lineHeight: typography.lineHeights.tight,
    },
    h2: {
      fontSize: typography.sizes.xxl,
      fontWeight: typography.weights.bold,
      color: colors.text.primary,
      lineHeight: typography.lineHeights.tight,
    },
    h3: {
      fontSize: typography.sizes.xl,
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
  input: {
    container: {
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.lg,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    text: {
      fontSize: typography.sizes.md,
      color: colors.text.primary,
    },
    placeholder: {
      color: colors.text.tertiary,
    },
  },
  header: {
    container: {
      backgroundColor: colors.background.secondary,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      ...shadows.subtle,
    },
    title: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: colors.text.primary,
    },
  },
};
