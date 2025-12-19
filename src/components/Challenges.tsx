/**
 * Love Diary - Couple Challenges Components
 * Daily missions, challenges, and rewards
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

// Challenge types
type ChallengeType = 'daily' | 'weekly' | 'monthly' | 'special';
type ChallengeCategory = 'communication' | 'intimacy' | 'adventure' | 'gratitude' | 'creative';

const CATEGORY_STYLES: Record<ChallengeCategory, { icon: keyof typeof Ionicons.glyphMap; color: string; label: string }> = {
  communication: { icon: 'chatbubble-ellipses', color: '#A8D8EA', label: 'Communication' },
  intimacy: { icon: 'heart', color: '#FFB4B4', label: 'Intimacy' },
  adventure: { icon: 'compass', color: '#98D8C8', label: 'Adventure' },
  gratitude: { icon: 'flower', color: '#DDA0DD', label: 'Gratitude' },
  creative: { icon: 'color-palette', color: '#FFD93D', label: 'Creative' },
};

// Challenge card
interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  category: ChallengeCategory;
  progress?: number; // 0-100
  dueDate?: string;
  reward?: string;
  isCompleted?: boolean;
  isActive?: boolean;
  onPress?: () => void;
  onComplete?: () => void;
  style?: ViewStyle;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  id,
  title,
  description,
  type,
  category,
  progress = 0,
  dueDate,
  reward,
  isCompleted,
  isActive,
  onPress,
  onComplete,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const categoryStyle = CATEGORY_STYLES[category];

  const getTypeLabel = () => {
    switch (type) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return '30-Day';
      case 'special':
        return 'Special';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={!onPress}
      style={[
        {
          backgroundColor: isCompleted ? colors.cream.base : colors.white,
          borderRadius: borderRadius.xxl,
          overflow: 'hidden',
          ...shadows.sm,
          opacity: isCompleted ? 0.7 : 1,
        },
        style,
      ]}
    >
      {/* Category color band */}
      <View
        style={{
          height: 4,
          backgroundColor: categoryStyle.color,
        }}
      />

      <View style={{ padding: spacing.lg }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: spacing.sm,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: categoryStyle.color + '30',
                  borderRadius: borderRadius.round,
                  paddingVertical: spacing.xxs,
                  paddingHorizontal: spacing.sm,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: spacing.xs,
                }}
              >
                <Ionicons
                  name={categoryStyle.icon}
                  size={12}
                  color={categoryStyle.color}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: categoryStyle.color,
                    fontWeight: '600',
                    marginLeft: 4,
                  }}
                >
                  {categoryStyle.label}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: colors.cream.base,
                  borderRadius: borderRadius.round,
                  paddingVertical: spacing.xxs,
                  paddingHorizontal: spacing.xs,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: colors.text.tertiary,
                    fontWeight: '500',
                  }}
                >
                  {getTypeLabel()}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: colors.text.primary,
                marginTop: spacing.sm,
              }}
            >
              {isCompleted ? '✓ ' : ''}{title}
            </Text>
          </View>

          {isActive && !isCompleted && (
            <View
              style={{
                backgroundColor: colors.ui.success + '20',
                borderRadius: borderRadius.round,
                paddingVertical: spacing.xxs,
                paddingHorizontal: spacing.xs,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: colors.ui.success,
                  fontWeight: '600',
                }}
              >
                In Progress
              </Text>
            </View>
          )}
        </View>

        {/* Description */}
        <Text
          style={{
            fontSize: 14,
            color: colors.text.secondary,
            lineHeight: 20,
            marginBottom: spacing.md,
          }}
        >
          {description}
        </Text>

        {/* Progress bar (for multi-day challenges) */}
        {type === 'monthly' && !isCompleted && (
          <View style={{ marginBottom: spacing.md }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: spacing.xxs,
              }}
            >
              <Text style={{ fontSize: 12, color: colors.text.tertiary }}>
                Progress
              </Text>
              <Text style={{ fontSize: 12, color: categoryStyle.color, fontWeight: '600' }}>
                {progress}%
              </Text>
            </View>
            <View
              style={{
                height: 6,
                backgroundColor: colors.cream.dark,
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: categoryStyle.color,
                  borderRadius: 3,
                }}
              />
            </View>
          </View>
        )}

        {/* Footer */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {dueDate && !isCompleted && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={colors.text.tertiary}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.text.tertiary,
                    marginLeft: 4,
                  }}
                >
                  {dueDate}
                </Text>
              </View>
            )}
          </View>

          {reward && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16 }}>🏆</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.text.secondary,
                  marginLeft: 4,
                }}
              >
                {reward}
              </Text>
            </View>
          )}
        </View>

        {/* Complete button */}
        {isActive && !isCompleted && onComplete && (
          <TouchableOpacity
            onPress={onComplete}
            style={{
              backgroundColor: categoryStyle.color,
              borderRadius: borderRadius.lg,
              paddingVertical: spacing.sm,
              marginTop: spacing.md,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: colors.white, fontWeight: '600' }}>
              Mark Complete
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Daily challenge prompt
interface DailyPromptProps {
  prompt: string;
  category: ChallengeCategory;
  onAccept?: () => void;
  onSkip?: () => void;
  style?: ViewStyle;
}

export const DailyPrompt: React.FC<DailyPromptProps> = ({
  prompt,
  category,
  onAccept,
  onSkip,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const categoryStyle = CATEGORY_STYLES[category];

  return (
    <LinearGradient
      colors={[categoryStyle.color + '30', colors.white]}
      style={[
        {
          borderRadius: borderRadius.xxl,
          padding: spacing.xl,
          ...shadows.md,
        },
        style,
      ]}
    >
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: categoryStyle.color,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.md,
          }}
        >
          <Ionicons name={categoryStyle.icon} size={28} color={colors.white} />
        </View>

        <Text
          style={{
            fontSize: 12,
            color: colors.text.tertiary,
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: spacing.xs,
          }}
        >
          Today's Challenge
        </Text>

        <Text
          style={{
            fontFamily: 'Georgia',
            fontSize: 20,
            fontWeight: '600',
            color: colors.text.primary,
            textAlign: 'center',
            lineHeight: 28,
            marginBottom: spacing.lg,
          }}
        >
          {prompt}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={onSkip}
            style={{
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.lg,
              marginRight: spacing.md,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: colors.text.tertiary,
              }}
            >
              Maybe Later
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onAccept}
            style={{
              backgroundColor: categoryStyle.color,
              borderRadius: borderRadius.xl,
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.xl,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: colors.white,
              }}
            >
              Let's Do It! 💪
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

// Badge/Reward component
interface BadgeProps {
  icon: string; // emoji
  title: string;
  description?: string;
  isUnlocked?: boolean;
  earnedDate?: string;
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  icon,
  title,
  description,
  isUnlocked = true,
  earnedDate,
  size = 'medium',
  onPress,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const sizeStyles = {
    small: { badge: 48, icon: 24, title: 10 },
    medium: { badge: 72, icon: 32, title: 12 },
    large: { badge: 96, icon: 44, title: 14 },
  };

  const s = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!onPress}
      style={{ alignItems: 'center' }}
    >
      <View
        style={{
          width: s.badge,
          height: s.badge,
          borderRadius: s.badge / 2,
          backgroundColor: isUnlocked ? colors.accent.honey : colors.cream.dark,
          alignItems: 'center',
          justifyContent: 'center',
          ...(isUnlocked && shadows.glow),
          opacity: isUnlocked ? 1 : 0.5,
        }}
      >
        <Text style={{ fontSize: s.icon }}>{isUnlocked ? icon : '🔒'}</Text>
      </View>
      <Text
        style={{
          fontSize: s.title,
          fontWeight: '600',
          color: isUnlocked ? colors.text.primary : colors.text.tertiary,
          marginTop: spacing.xs,
          textAlign: 'center',
        }}
        numberOfLines={2}
      >
        {title}
      </Text>
      {earnedDate && isUnlocked && size !== 'small' && (
        <Text
          style={{
            fontSize: 10,
            color: colors.text.tertiary,
            marginTop: 2,
          }}
        >
          {earnedDate}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// Progress streak indicator
interface StreakIndicatorProps {
  currentStreak: number;
  longestStreak: number;
  weekProgress: boolean[]; // Last 7 days
  style?: ViewStyle;
}

export const StreakIndicator: React.FC<StreakIndicatorProps> = ({
  currentStreak,
  longestStreak,
  weekProgress,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <View
      style={[
        {
          backgroundColor: colors.white,
          borderRadius: borderRadius.xl,
          padding: spacing.lg,
          ...shadows.sm,
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.md,
        }}
      >
        <View>
          <Text style={{ fontSize: 12, color: colors.text.tertiary }}>
            Current Streak
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: '700',
                color: colors.heart.pink,
              }}
            >
              {currentStreak}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginLeft: 4,
              }}
            >
              days 🔥
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 12, color: colors.text.tertiary }}>
            Best
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.text.primary,
            }}
          >
            {longestStreak} days
          </Text>
        </View>
      </View>

      {/* Week progress */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {weekProgress.map((completed, index) => (
          <View key={index} style={{ alignItems: 'center' }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: completed ? colors.ui.success : colors.cream.dark,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.xxs,
              }}
            >
              {completed ? (
                <Ionicons name="checkmark" size={20} color={colors.white} />
              ) : (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: colors.text.light,
                  }}
                />
              )}
            </View>
            <Text
              style={{
                fontSize: 10,
                color: completed ? colors.text.primary : colors.text.tertiary,
                fontWeight: completed ? '600' : '400',
              }}
            >
              {days[index]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default { ChallengeCard, DailyPrompt, Badge, StreakIndicator };
