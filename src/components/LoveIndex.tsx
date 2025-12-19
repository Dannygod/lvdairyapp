/**
 * Love Diary - Love Index Component
 * Daily love index slider and emoji-based rating
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Animated,
  PanResponder,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

// Heart rating levels
const HEART_LEVELS = [
  { min: 0, max: 20, emoji: '💔', label: 'Distant', color: '#C4B4B4' },
  { min: 21, max: 40, emoji: '🤍', label: 'Neutral', color: '#E6E6FA' },
  { min: 41, max: 60, emoji: '💗', label: 'Warm', color: '#FFB4B4' },
  { min: 61, max: 80, emoji: '💕', label: 'Loving', color: '#FF8FAB' },
  { min: 81, max: 100, emoji: '💖', label: 'Overflowing', color: '#FF6B8A' },
];

interface LoveIndexSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  showLabel?: boolean;
  style?: ViewStyle;
}

export const LoveIndexSlider: React.FC<LoveIndexSliderProps> = ({
  value,
  onChange,
  disabled = false,
  showLabel = true,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const [sliderWidth, setSliderWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const getCurrentLevel = () => {
    return HEART_LEVELS.find((level) => value >= level.min && value <= level.max) || HEART_LEVELS[2];
  };

  const level = getCurrentLevel();

  const handleSliderPress = (event: any) => {
    if (disabled) return;
    const { locationX } = event.nativeEvent;
    const newValue = Math.round((locationX / sliderWidth) * 100);
    onChange(Math.min(100, Math.max(0, newValue)));
  };

  const thumbPosition = (value / 100) * (sliderWidth - 32);

  return (
    <View style={[{ marginVertical: spacing.md }, style]}>
      {showLabel && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.sm,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: colors.text.secondary,
            }}
          >
            Love Index
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginRight: spacing.xs }}>{level.emoji}</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: level.color,
              }}
            >
              {value}%
            </Text>
          </View>
        </View>
      )}

      <View
        onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
        onTouchStart={handleSliderPress}
        onTouchMove={(e) => {
          if (disabled) return;
          const locationX = e.nativeEvent.locationX;
          const newValue = Math.round((locationX / sliderWidth) * 100);
          onChange(Math.min(100, Math.max(0, newValue)));
        }}
        style={{
          height: 32,
          justifyContent: 'center',
        }}
      >
        {/* Track background */}
        <View
          style={{
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.cream.dark,
            overflow: 'hidden',
          }}
        >
          {/* Filled track */}
          <LinearGradient
            colors={[colors.primary.roseLight, level.color]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: '100%',
              width: `${value}%`,
              borderRadius: 4,
            }}
          />
        </View>

        {/* Thumb */}
        {sliderWidth > 0 && (
          <View
            style={{
              position: 'absolute',
              left: thumbPosition,
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: colors.white,
              alignItems: 'center',
              justifyContent: 'center',
              ...shadows.md,
              borderWidth: 2,
              borderColor: level.color,
            }}
          >
            <Text style={{ fontSize: 16 }}>{level.emoji}</Text>
          </View>
        )}
      </View>

      {showLabel && (
        <Text
          style={{
            fontSize: 13,
            color: level.color,
            textAlign: 'center',
            marginTop: spacing.xs,
            fontWeight: '500',
          }}
        >
          {level.label}
        </Text>
      )}
    </View>
  );
};

// Emoji-based love index (alternative to slider)
interface EmojiLoveIndexProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const EmojiLoveIndex: React.FC<EmojiLoveIndexProps> = ({
  value,
  onChange,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const getSelectedIndex = () => {
    return HEART_LEVELS.findIndex((level) => value >= level.min && value <= level.max);
  };

  const selectedIndex = getSelectedIndex();

  return (
    <View style={style}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          color: colors.text.secondary,
          marginBottom: spacing.sm,
        }}
      >
        How's your heart today?
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.cream.base,
          borderRadius: borderRadius.xl,
          padding: spacing.sm,
        }}
      >
        {HEART_LEVELS.map((level, index) => {
          const isSelected = selectedIndex === index;
          const midValue = Math.round((level.min + level.max) / 2);

          return (
            <TouchableOpacity
              key={level.label}
              onPress={() => !disabled && onChange(midValue)}
              activeOpacity={0.7}
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: spacing.sm,
                borderRadius: borderRadius.lg,
                backgroundColor: isSelected ? colors.white : 'transparent',
                ...(isSelected && shadows.sm),
              }}
            >
              <Text
                style={{
                  fontSize: isSelected ? 32 : 24,
                  opacity: isSelected ? 1 : 0.6,
                }}
              >
                {level.emoji}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: isSelected ? level.color : colors.text.tertiary,
                  fontWeight: isSelected ? '600' : '400',
                  marginTop: spacing.xxs,
                }}
              >
                {level.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Compact display for diary entries
interface LoveIndexBadgeProps {
  value: number;
  size?: 'small' | 'medium' | 'large';
}

export const LoveIndexBadge: React.FC<LoveIndexBadgeProps> = ({
  value,
  size = 'medium',
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  const level = HEART_LEVELS.find((l) => value >= l.min && value <= l.max) || HEART_LEVELS[2];

  const sizeStyles = {
    small: { emoji: 16, badge: 28, font: 10 },
    medium: { emoji: 20, badge: 36, font: 11 },
    large: { emoji: 28, badge: 48, font: 13 },
  };

  const s = sizeStyles[size];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: level.color + '20',
        borderRadius: borderRadius.round,
        paddingHorizontal: spacing.sm,
        height: s.badge,
      }}
    >
      <Text style={{ fontSize: s.emoji, marginRight: 4 }}>{level.emoji}</Text>
      <Text
        style={{
          fontSize: s.font,
          fontWeight: '600',
          color: level.color,
        }}
      >
        {value}%
      </Text>
    </View>
  );
};

export default LoveIndexSlider;
