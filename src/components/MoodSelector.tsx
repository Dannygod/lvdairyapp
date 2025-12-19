/**
 * Love Diary - Mood Selector Component
 * Emoji and tag-based mood selection
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

// Mood definitions
export const MOODS = {
  joyful: { emoji: '😊', label: 'Joyful', color: '#FFD93D' },
  loving: { emoji: '🥰', label: 'Loving', color: '#FF6B8A' },
  peaceful: { emoji: '😌', label: 'Peaceful', color: '#A8D8EA' },
  grateful: { emoji: '🙏', label: 'Grateful', color: '#7EC8A3' },
  nostalgic: { emoji: '🥹', label: 'Nostalgic', color: '#E6E6FA' },
  cozy: { emoji: '☕', label: 'Cozy', color: '#FFDAB9' },
  excited: { emoji: '🤩', label: 'Excited', color: '#FFB347' },
  romantic: { emoji: '💕', label: 'Romantic', color: '#FFB4B4' },
  playful: { emoji: '😜', label: 'Playful', color: '#98D8C8' },
  content: { emoji: '😊', label: 'Content', color: '#DDA0DD' },
  inspired: { emoji: '✨', label: 'Inspired', color: '#87CEEB' },
  blessed: { emoji: '🌸', label: 'Blessed', color: '#FFB6C1' },
} as const;

export type MoodType = keyof typeof MOODS;

interface MoodSelectorProps {
  selectedMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
  variant?: 'grid' | 'horizontal';
  showLabels?: boolean;
  style?: ViewStyle;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onMoodSelect,
  variant = 'horizontal',
  showLabels = true,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const moodEntries = Object.entries(MOODS) as [MoodType, typeof MOODS[MoodType]][];

  const renderMoodItem = ([mood, { emoji, label, color }]: [MoodType, typeof MOODS[MoodType]]) => {
    const isSelected = selectedMood === mood;

    return (
      <TouchableOpacity
        key={mood}
        onPress={() => onMoodSelect(mood)}
        activeOpacity={0.7}
        style={{
          alignItems: 'center',
          marginRight: variant === 'horizontal' ? spacing.md : 0,
          marginBottom: variant === 'grid' ? spacing.md : 0,
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: isSelected ? color : colors.cream.base,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: isSelected ? 0 : 1,
            borderColor: colors.ui.border,
            ...(isSelected && shadows.sm),
          }}
        >
          <Text style={{ fontSize: 28 }}>{emoji}</Text>
        </View>
        {showLabels && (
          <Text
            style={{
              fontSize: 11,
              color: isSelected ? colors.text.primary : colors.text.tertiary,
              fontWeight: isSelected ? '600' : '400',
              marginTop: spacing.xxs,
            }}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  if (variant === 'grid') {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          },
          style,
        ]}
      >
        {moodEntries.map(renderMoodItem)}
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[{ paddingVertical: spacing.xs }, style]}
    >
      {moodEntries.map(renderMoodItem)}
    </ScrollView>
  );
};

// Compact mood display for diary entries
interface MoodBadgeProps {
  mood: MoodType;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export const MoodBadge: React.FC<MoodBadgeProps> = ({
  mood,
  size = 'medium',
  showLabel = false,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  const moodData = MOODS[mood];

  const sizeStyles = {
    small: { badgeSize: 24, fontSize: 14, labelSize: 10 },
    medium: { badgeSize: 32, fontSize: 18, labelSize: 11 },
    large: { badgeSize: 40, fontSize: 24, labelSize: 12 },
  };

  const { badgeSize, fontSize, labelSize } = sizeStyles[size];

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          width: badgeSize,
          height: badgeSize,
          borderRadius: badgeSize / 2,
          backgroundColor: moodData.color + '40', // 25% opacity
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize }}>{moodData.emoji}</Text>
      </View>
      {showLabel && (
        <Text
          style={{
            fontSize: labelSize,
            color: colors.text.secondary,
            marginLeft: spacing.xs,
          }}
        >
          {moodData.label}
        </Text>
      )}
    </View>
  );
};

// Mood tags for filtering
interface MoodTagsProps {
  selectedMoods: MoodType[];
  onToggleMood: (mood: MoodType) => void;
}

export const MoodTags: React.FC<MoodTagsProps> = ({
  selectedMoods,
  onToggleMood,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: spacing.xs }}
    >
      {(Object.entries(MOODS) as [MoodType, typeof MOODS[MoodType]][]).map(
        ([mood, { emoji, label, color }]) => {
          const isSelected = selectedMoods.includes(mood);

          return (
            <TouchableOpacity
              key={mood}
              onPress={() => onToggleMood(mood)}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing.xs,
                paddingHorizontal: spacing.sm,
                borderRadius: borderRadius.round,
                backgroundColor: isSelected ? color + '30' : colors.cream.base,
                borderWidth: 1,
                borderColor: isSelected ? color : colors.ui.border,
                marginRight: spacing.xs,
              }}
            >
              <Text style={{ fontSize: 14, marginRight: 4 }}>{emoji}</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: isSelected ? colors.text.primary : colors.text.secondary,
                  fontWeight: isSelected ? '500' : '400',
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        }
      )}
    </ScrollView>
  );
};

export default MoodSelector;
