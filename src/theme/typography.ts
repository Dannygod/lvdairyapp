/**
 * Love Diary - Typography System
 * Warm, readable fonts with romantic character
 */

import { Platform } from 'react-native';

// Font Families
export const fontFamilies = {
  // Primary - Warm serif for headings and intimate text
  serif: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'Georgia',
  }),

  // Secondary - Clean sans-serif for UI and body
  sans: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),

  // Decorative - For special moments
  decorative: Platform.select({
    ios: 'Snell Roundhand',
    android: 'cursive',
    default: 'cursive',
  }),
};

// Font Sizes
export const fontSizes = {
  // Display - For special moments
  display: {
    large: 48,
    medium: 40,
    small: 32,
  },

  // Headings
  heading: {
    h1: 28,
    h2: 24,
    h3: 20,
    h4: 18,
  },

  // Body Text
  body: {
    large: 17,
    medium: 15,
    small: 13,
  },

  // Supporting Text
  caption: 12,
  label: 11,
  tiny: 10,
};

// Font Weights
export const fontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// Line Heights
export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
  loose: 2,
};

// Letter Spacing
export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
};

// Pre-defined Text Styles
export const textStyles = {
  // Display Styles
  displayLarge: {
    fontFamily: fontFamilies.serif,
    fontSize: fontSizes.display.large,
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.display.large * lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },
  displayMedium: {
    fontFamily: fontFamilies.serif,
    fontSize: fontSizes.display.medium,
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.display.medium * lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },
  displaySmall: {
    fontFamily: fontFamilies.serif,
    fontSize: fontSizes.display.small,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.display.small * lineHeights.tight,
  },

  // Heading Styles
  h1: {
    fontFamily: fontFamilies.serif,
    fontSize: fontSizes.heading.h1,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.heading.h1 * lineHeights.tight,
  },
  h2: {
    fontFamily: fontFamilies.serif,
    fontSize: fontSizes.heading.h2,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.heading.h2 * lineHeights.tight,
  },
  h3: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.heading.h3,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.heading.h3 * lineHeights.normal,
  },
  h4: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.heading.h4,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.heading.h4 * lineHeights.normal,
  },

  // Body Styles
  bodyLarge: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.body.large,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.body.large * lineHeights.relaxed,
  },
  bodyMedium: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.body.medium,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.body.medium * lineHeights.relaxed,
  },
  bodySmall: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.body.small,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.body.small * lineHeights.relaxed,
  },

  // Diary Text - Special intimate reading style
  diaryText: {
    fontFamily: fontFamilies.serif,
    fontSize: fontSizes.body.large,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.body.large * lineHeights.loose,
    letterSpacing: letterSpacing.wide,
  },

  // Caption & Labels
  caption: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.caption * lineHeights.normal,
  },
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.label,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.label * lineHeights.normal,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase' as const,
  },

  // Button Text
  buttonLarge: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.body.large,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.wide,
  },
  buttonMedium: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.body.medium,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.wide,
  },
  buttonSmall: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.body.small,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.wide,
  },

  // Decorative - For special moments
  romantic: {
    fontFamily: fontFamilies.decorative,
    fontSize: fontSizes.heading.h2,
    fontWeight: fontWeights.regular,
  },
};
