/**
 * Love Diary - Card Components
 * Soft, rounded cards for content containers
 */

import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  padding?: 'none' | 'small' | 'medium' | 'large';
  onPress?: () => void;
  gradientColors?: string[];
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  padding = 'medium',
  onPress,
  gradientColors,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const getPaddingValue = () => {
    switch (padding) {
      case 'none':
        return 0;
      case 'small':
        return spacing.sm;
      case 'large':
        return spacing.lg;
      default:
        return spacing.md;
    }
  };

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.white,
          ...shadows.md,
        };
      case 'outlined':
        return {
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.ui.border,
        };
      case 'gradient':
        return {};
      default:
        return {
          backgroundColor: colors.white,
          ...shadows.sm,
        };
    }
  };

  const cardStyle: ViewStyle = {
    borderRadius: borderRadius.xl,
    padding: getPaddingValue(),
    ...getVariantStyles(),
    ...style,
  };

  const content = (
    <>
      {variant === 'gradient' ? (
        <LinearGradient
          colors={gradientColors || colors.gradients.warmth}
          style={[cardStyle, { overflow: 'hidden' }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {children}
        </LinearGradient>
      ) : (
        <View style={cardStyle}>{children}</View>
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

// Diary Entry Card
interface DiaryCardProps {
  children: ReactNode;
  mood?: 'joyful' | 'loving' | 'peaceful' | 'grateful' | 'nostalgic' | 'cozy';
  isPrivate?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

export const DiaryCard: React.FC<DiaryCardProps> = ({
  children,
  mood,
  isPrivate,
  style,
  onPress,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const getMoodAccent = () => {
    if (!mood) return colors.primary.blush;
    return colors.mood[mood];
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={!onPress}
    >
      <View
        style={[
          {
            backgroundColor: colors.white,
            borderRadius: borderRadius.xl,
            padding: spacing.lg,
            ...shadows.sm,
            borderLeftWidth: 4,
            borderLeftColor: getMoodAccent(),
          },
          style,
        ]}
      >
        {isPrivate && (
          <View
            style={{
              position: 'absolute',
              top: spacing.sm,
              right: spacing.sm,
              backgroundColor: colors.primary.blush,
              borderRadius: borderRadius.round,
              padding: spacing.xxs,
            }}
          >
            {/* Lock icon indicator */}
          </View>
        )}
        {children}
      </View>
    </TouchableOpacity>
  );
};

// Photo Card (for memories)
interface PhotoCardProps {
  source: ImageSourcePropType;
  caption?: string;
  date?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  source,
  caption,
  date,
  style,
  onPress,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      disabled={!onPress}
    >
      <View
        style={[
          {
            backgroundColor: colors.white,
            borderRadius: borderRadius.xl,
            overflow: 'hidden',
            ...shadows.md,
          },
          style,
        ]}
      >
        <Image
          source={source}
          style={{
            width: '100%',
            height: 200,
            borderTopLeftRadius: borderRadius.xl,
            borderTopRightRadius: borderRadius.xl,
          }}
          resizeMode="cover"
        />
        {(caption || date) && (
          <View style={{ padding: spacing.md }}>
            {date && (
              <View
                style={{
                  fontSize: 11,
                  color: colors.text.tertiary,
                  marginBottom: spacing.xxs,
                }}
              />
            )}
            {caption && (
              <View
                style={{
                  fontSize: 14,
                  color: colors.text.primary,
                  lineHeight: 20,
                }}
              />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Timeline Card
interface TimelineCardProps {
  children: ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  milestone?: boolean;
  style?: ViewStyle;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  children,
  isFirst,
  isLast,
  milestone,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows, layout } = theme;

  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      {/* Timeline line and node */}
      <View style={{ alignItems: 'center', width: 32 }}>
        {!isFirst && (
          <View
            style={{
              width: layout.timelineLineWidth,
              height: spacing.lg,
              backgroundColor: colors.primary.roseLight,
            }}
          />
        )}
        <View
          style={{
            width: milestone ? layout.timelineNodeSize + 8 : layout.timelineNodeSize,
            height: milestone ? layout.timelineNodeSize + 8 : layout.timelineNodeSize,
            borderRadius: layout.timelineNodeSize,
            backgroundColor: milestone ? colors.heart.pink : colors.primary.rose,
            borderWidth: 3,
            borderColor: colors.white,
            ...shadows.sm,
          }}
        />
        {!isLast && (
          <View
            style={{
              width: layout.timelineLineWidth,
              flex: 1,
              backgroundColor: colors.primary.roseLight,
            }}
          />
        )}
      </View>

      {/* Card content */}
      <View
        style={{
          flex: 1,
          marginLeft: spacing.md,
          marginBottom: spacing.lg,
          backgroundColor: colors.white,
          borderRadius: borderRadius.xl,
          padding: spacing.md,
          ...shadows.sm,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default Card;
