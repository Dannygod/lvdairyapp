/**
 * Love Diary - Spacing & Layout System
 * Generous whitespace for a calm, breathable experience
 */

// Base spacing unit (4px)
const baseUnit = 4;

// Spacing Scale
export const spacing = {
  none: 0,
  xxs: baseUnit, // 4
  xs: baseUnit * 2, // 8
  sm: baseUnit * 3, // 12
  md: baseUnit * 4, // 16
  lg: baseUnit * 6, // 24
  xl: baseUnit * 8, // 32
  xxl: baseUnit * 10, // 40
  xxxl: baseUnit * 12, // 48
  huge: baseUnit * 16, // 64
  massive: baseUnit * 20, // 80
};

// Border Radius - Soft, rounded corners
export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  round: 9999, // Fully rounded (pills, circles)
};

// Shadows - Soft, subtle elevation
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#8B6D6D',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#8B6D6D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#8B6D6D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#8B6D6D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#8B6D6D',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  // Special romantic glow
  glow: {
    shadowColor: '#E8A0A0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  // Heart shadow
  heart: {
    shadowColor: '#FF6B8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
};

// Layout Dimensions
export const layout = {
  // Screen padding
  screenPadding: spacing.md,
  screenPaddingLarge: spacing.lg,

  // Card dimensions
  cardPadding: spacing.md,
  cardPaddingLarge: spacing.lg,

  // Button heights
  buttonHeight: {
    small: 36,
    medium: 44,
    large: 52,
  },

  // Input heights
  inputHeight: {
    small: 40,
    medium: 48,
    large: 56,
  },

  // Icon sizes
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },

  // Avatar sizes
  avatarSize: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
    xxl: 96,
  },

  // Bottom tab bar
  tabBarHeight: 64,
  tabBarPadding: spacing.xs,

  // Header
  headerHeight: 56,

  // Diary entry card
  diaryCardMinHeight: 120,

  // Timeline
  timelineNodeSize: 16,
  timelineLineWidth: 2,
};

// Animation Durations
export const durations = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  gentle: 800,
  dramatic: 1200,
};

// Animation Easings
export const easings = {
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  spring: 'spring',
};
