/**
 * Love Diary - Color Palette
 * Soft, intimate, romantic colors designed for emotional warmth
 */

export const colors = {
  // Primary Romance Palette
  primary: {
    rose: '#E8A0A0',
    roseLight: '#F5D5D5',
    roseDark: '#C97878',
    blush: '#FFE4E6',
    peach: '#FFDAB9',
  },

  // Warm Neutrals
  cream: {
    light: '#FFFAF5',
    base: '#FFF5EB',
    dark: '#F5EDE4',
  },

  // Soft Accent Colors
  accent: {
    lavender: '#E6E6FA',
    mint: '#E0F5E9',
    sky: '#E6F3FF',
    honey: '#FFF3CD',
    coral: '#FFB4A2',
  },

  // Heart & Love Colors
  heart: {
    pink: '#FF6B8A',
    red: '#E55A5A',
    softRed: '#F28B82',
  },

  // Text Colors
  text: {
    primary: '#4A3F3F',
    secondary: '#7D6B6B',
    tertiary: '#A69494',
    light: '#C4B4B4',
    inverse: '#FFFFFF',
  },

  // UI Colors
  ui: {
    border: '#F0E6E6',
    divider: '#F5EDED',
    shadow: 'rgba(139, 109, 109, 0.08)',
    overlay: 'rgba(74, 63, 63, 0.5)',
    success: '#7EC8A3',
    warning: '#F5C77E',
    error: '#E88B8B',
  },

  // Background Gradients
  gradients: {
    sunrise: ['#FFE4E6', '#FFF5EB', '#FFFAF5'],
    sunset: ['#F5D5D5', '#FFE4E6', '#E6E6FA'],
    warmth: ['#FFF5EB', '#FFE4E6', '#F5D5D5'],
    love: ['#FFE4E6', '#F5D5D5', '#E8A0A0'],
  },

  // Status & Mood Colors
  mood: {
    joyful: '#FFD93D',
    loving: '#FF6B8A',
    peaceful: '#A8D8EA',
    grateful: '#7EC8A3',
    nostalgic: '#E6E6FA',
    cozy: '#FFDAB9',
  },

  // White & Transparent
  white: '#FFFFFF',
  transparent: 'transparent',
};

// Night Mode Colors
export const darkColors = {
  // Primary Romance Palette (muted for night)
  primary: {
    rose: '#B87878',
    roseLight: '#C99A9A',
    roseDark: '#8B5A5A',
    blush: '#3D3032',
    peach: '#4A3D32',
  },

  // Dark Backgrounds
  cream: {
    light: '#1E1A1A',
    base: '#151212',
    dark: '#0D0B0B',
  },

  // Soft Accent Colors (muted)
  accent: {
    lavender: '#2D2D3A',
    mint: '#1E2D24',
    sky: '#1E2530',
    honey: '#2D2820',
    coral: '#3D2D28',
  },

  // Heart Colors (softer glow)
  heart: {
    pink: '#D45A75',
    red: '#C04A4A',
    softRed: '#C87878',
  },

  // Text Colors (for dark mode)
  text: {
    primary: '#F5EDED',
    secondary: '#C4B4B4',
    tertiary: '#8B7878',
    light: '#5A4A4A',
    inverse: '#1E1A1A',
  },

  // UI Colors
  ui: {
    border: '#2D2525',
    divider: '#252020',
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    success: '#5A9A78',
    warning: '#C9A05A',
    error: '#C87070',
  },

  // Dark Gradients
  gradients: {
    sunrise: ['#1E1A1A', '#201818', '#221919'],
    sunset: ['#251E1E', '#221A1A', '#201818'],
    warmth: ['#201818', '#251E1E', '#281F1F'],
    love: ['#251E1E', '#2D2222', '#352828'],
  },

  // Mood Colors (muted for night)
  mood: {
    joyful: '#C9A032',
    loving: '#D45A75',
    peaceful: '#6A9AB0',
    grateful: '#5A9A78',
    nostalgic: '#7A7A9A',
    cozy: '#C9A878',
  },

  white: '#FFFFFF',
  transparent: 'transparent',
};

export type ColorPalette = typeof colors;
