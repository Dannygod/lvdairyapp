/**
 * Love Diary - Timeline Components
 * Relationship timeline and milestone display
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

// Milestone types
type MilestoneType =
  | 'first_date'
  | 'anniversary'
  | 'first_kiss'
  | 'travel'
  | 'birthday'
  | 'first_argument'
  | 'moved_in'
  | 'engaged'
  | 'married'
  | 'baby'
  | 'custom';

const MILESTONE_ICONS: Record<MilestoneType, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  first_date: { icon: 'cafe', color: '#FFDAB9' },
  anniversary: { icon: 'heart', color: '#FF6B8A' },
  first_kiss: { icon: 'heart-circle', color: '#FFB4B4' },
  travel: { icon: 'airplane', color: '#A8D8EA' },
  birthday: { icon: 'gift', color: '#DDA0DD' },
  first_argument: { icon: 'cloud', color: '#C4B4B4' },
  moved_in: { icon: 'home', color: '#7EC8A3' },
  engaged: { icon: 'diamond', color: '#87CEEB' },
  married: { icon: 'sparkles', color: '#FFD93D' },
  baby: { icon: 'heart-half', color: '#FFB6C1' },
  custom: { icon: 'bookmark', color: '#E6E6FA' },
};

// Day counter display
interface DayCounterProps {
  startDate: Date;
  style?: ViewStyle;
}

export const DayCounter: React.FC<DayCounterProps> = ({ startDate, style }) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const calculateDays = () => {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays();

  return (
    <LinearGradient
      colors={colors.gradients.love}
      style={[
        {
          borderRadius: borderRadius.xxl,
          padding: spacing.xl,
          alignItems: 'center',
          ...shadows.md,
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          color: colors.text.secondary,
          letterSpacing: 2,
          marginBottom: spacing.xs,
        }}
      >
        在一起
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <Text
          style={{
            fontFamily: 'Georgia',
            fontSize: 56,
            fontWeight: '700',
            color: colors.heart.pink,
          }}
        >
          {days}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: colors.text.secondary,
            marginLeft: spacing.xs,
          }}
        >
          天
        </Text>
      </View>
      <Text
        style={{
          fontSize: 13,
          color: colors.text.tertiary,
          marginTop: spacing.xs,
        }}
      >
        從 {startDate.toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} 開始
      </Text>

      {/* Heart decoration */}
      <View
        style={{
          position: 'absolute',
          top: spacing.md,
          right: spacing.md,
        }}
      >
        <Text style={{ fontSize: 24 }}>💕</Text>
      </View>
    </LinearGradient>
  );
};

// Timeline milestone item
interface MilestoneItemProps {
  type: MilestoneType;
  title: string;
  date: string;
  description?: string;
  photo?: ImageSourcePropType;
  isFirst?: boolean;
  isLast?: boolean;
  onPress?: () => void;
}

export const MilestoneItem: React.FC<MilestoneItemProps> = ({
  type,
  title,
  date,
  description,
  photo,
  isFirst,
  isLast,
  onPress,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows, layout } = theme;

  const milestone = MILESTONE_ICONS[type];

  return (
    <View style={{ flexDirection: 'row' }}>
      {/* Timeline line and node */}
      <View style={{ alignItems: 'center', width: 40 }}>
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
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: milestone.color,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 3,
            borderColor: colors.white,
            ...shadows.sm,
          }}
        >
          <Ionicons name={milestone.icon} size={16} color={colors.white} />
        </View>
        {!isLast && (
          <View
            style={{
              width: layout.timelineLineWidth,
              flex: 1,
              minHeight: spacing.xl,
              backgroundColor: colors.primary.roseLight,
            }}
          />
        )}
      </View>

      {/* Content card */}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        disabled={!onPress}
        style={{
          flex: 1,
          marginLeft: spacing.md,
          marginBottom: spacing.lg,
          backgroundColor: colors.white,
          borderRadius: borderRadius.xl,
          overflow: 'hidden',
          ...shadows.sm,
        }}
      >
        {photo && (
          <Image
            source={photo}
            style={{
              width: '100%',
              height: 140,
            }}
            resizeMode="cover"
          />
        )}
        <View style={{ padding: spacing.md }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text.primary,
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: milestone.color,
                  fontWeight: '500',
                  marginTop: 2,
                }}
              >
                {date}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: milestone.color + '30',
                borderRadius: borderRadius.round,
                padding: spacing.xs,
              }}
            >
              <Ionicons name={milestone.icon} size={16} color={milestone.color} />
            </View>
          </View>
          {description && (
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                lineHeight: 20,
                marginTop: spacing.sm,
              }}
              numberOfLines={3}
            >
              {description}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Annual recap card
interface AnnualRecapProps {
  year: number;
  highlights: {
    totalDays: number;
    diaryEntries: number;
    photos: number;
    topMoods: string[];
    averageLoveIndex: number;
  };
  onPress?: () => void;
  style?: ViewStyle;
}

export const AnnualRecap: React.FC<AnnualRecapProps> = ({
  year,
  highlights,
  onPress,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={!onPress}
      style={[
        {
          backgroundColor: colors.white,
          borderRadius: borderRadius.xxl,
          overflow: 'hidden',
          ...shadows.md,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={colors.gradients.sunset}
        style={{
          padding: spacing.lg,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 12,
                color: colors.text.tertiary,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Year in Review
            </Text>
            <Text
              style={{
                fontFamily: 'Georgia',
                fontSize: 32,
                fontWeight: '700',
                color: colors.heart.pink,
              }}
            >
              {year}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.white + '80',
              borderRadius: borderRadius.round,
              padding: spacing.sm,
            }}
          >
            <Ionicons name="play" size={24} color={colors.heart.pink} />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: spacing.lg,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: colors.text.primary,
              }}
            >
              {highlights.totalDays}
            </Text>
            <Text style={{ fontSize: 11, color: colors.text.tertiary }}>
              Days
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: colors.text.primary,
              }}
            >
              {highlights.diaryEntries}
            </Text>
            <Text style={{ fontSize: 11, color: colors.text.tertiary }}>
              Entries
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: colors.text.primary,
              }}
            >
              {highlights.photos}
            </Text>
            <Text style={{ fontSize: 11, color: colors.text.tertiary }}>
              Photos
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: colors.heart.pink,
              }}
            >
              {highlights.averageLoveIndex}%
            </Text>
            <Text style={{ fontSize: 11, color: colors.text.tertiary }}>
              Love Index
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: spacing.md,
            justifyContent: 'center',
          }}
        >
          {highlights.topMoods.map((mood, index) => (
            <Text key={index} style={{ fontSize: 24, marginHorizontal: 4 }}>
              {mood}
            </Text>
          ))}
        </View>
      </LinearGradient>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.md,
          backgroundColor: colors.white,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: colors.primary.rose,
          }}
        >
          Watch Your Year Together
        </Text>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.primary.rose}
          style={{ marginLeft: spacing.xs }}
        />
      </View>
    </TouchableOpacity>
  );
};

// Memory book page flip card
interface MemoryPageProps {
  date: string;
  content: {
    photo?: ImageSourcePropType;
    quote?: string;
    mood?: string;
  };
  pageNumber: number;
  totalPages: number;
  style?: ViewStyle;
}

export const MemoryPage: React.FC<MemoryPageProps> = ({
  date,
  content,
  pageNumber,
  totalPages,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  return (
    <View
      style={[
        {
          backgroundColor: colors.cream.light,
          borderRadius: borderRadius.xl,
          overflow: 'hidden',
          ...shadows.lg,
          // Book-like appearance
          borderWidth: 1,
          borderColor: colors.ui.border,
        },
        style,
      ]}
    >
      {/* Decorative book spine effect */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: colors.primary.roseLight,
        }}
      />

      <View style={{ padding: spacing.lg, marginLeft: spacing.xxs }}>
        {/* Date header */}
        <View
          style={{
            alignItems: 'center',
            marginBottom: spacing.md,
          }}
        >
          <Text
            style={{
              fontFamily: 'Georgia',
              fontSize: 14,
              fontStyle: 'italic',
              color: colors.text.tertiary,
            }}
          >
            {date}
          </Text>
        </View>

        {/* Photo */}
        {content.photo && (
          <Image
            source={content.photo}
            style={{
              width: '100%',
              height: 200,
              borderRadius: borderRadius.lg,
              marginBottom: spacing.md,
            }}
            resizeMode="cover"
          />
        )}

        {/* Quote */}
        {content.quote && (
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: borderRadius.lg,
              padding: spacing.md,
              borderLeftWidth: 3,
              borderLeftColor: colors.primary.rose,
            }}
          >
            <Text
              style={{
                fontFamily: 'Georgia',
                fontSize: 15,
                fontStyle: 'italic',
                color: colors.text.primary,
                lineHeight: 24,
              }}
            >
              "{content.quote}"
            </Text>
          </View>
        )}

        {/* Mood */}
        {content.mood && (
          <View style={{ alignItems: 'center', marginTop: spacing.md }}>
            <Text style={{ fontSize: 28 }}>{content.mood}</Text>
          </View>
        )}

        {/* Page number */}
        <Text
          style={{
            fontSize: 11,
            color: colors.text.light,
            textAlign: 'center',
            marginTop: spacing.lg,
          }}
        >
          {pageNumber} / {totalPages}
        </Text>
      </View>
    </View>
  );
};

export default { DayCounter, MilestoneItem, AnnualRecap, MemoryPage };
