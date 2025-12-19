/**
 * Love Diary - Theme Export
 * Central theme configuration
 */

import { colors, darkColors, ColorPalette } from './colors';
import { fontFamilies, fontSizes, fontWeights, lineHeights, letterSpacing, textStyles } from './typography';
import { spacing, borderRadius, shadows, layout, durations, easings } from './spacing';

// Light Theme
export const lightTheme = {
  colors,
  fonts: {
    families: fontFamilies,
    sizes: fontSizes,
    weights: fontWeights,
    lineHeights,
    letterSpacing,
  },
  textStyles,
  spacing,
  borderRadius,
  shadows,
  layout,
  animation: {
    durations,
    easings,
  },
  isDark: false,
};

// Dark Theme
export const darkTheme = {
  ...lightTheme,
  colors: darkColors,
  shadows: {
    ...shadows,
    // Adjust shadows for dark mode
    xs: { ...shadows.xs, shadowColor: '#000', shadowOpacity: 0.2 },
    sm: { ...shadows.sm, shadowColor: '#000', shadowOpacity: 0.25 },
    md: { ...shadows.md, shadowColor: '#000', shadowOpacity: 0.3 },
    lg: { ...shadows.lg, shadowColor: '#000', shadowOpacity: 0.35 },
    xl: { ...shadows.xl, shadowColor: '#000', shadowOpacity: 0.4 },
    glow: { ...shadows.glow, shadowColor: '#B87878', shadowOpacity: 0.4 },
    heart: { ...shadows.heart, shadowColor: '#D45A75', shadowOpacity: 0.3 },
  },
  isDark: true,
};

export type Theme = typeof lightTheme;

// Re-export everything
export { colors, darkColors };
export { fontFamilies, fontSizes, fontWeights, lineHeights, letterSpacing, textStyles };
export { spacing, borderRadius, shadows, layout, durations, easings };

// Default export
export default lightTheme;
