/**
 * Love Diary - Challenges Screen
 * Couple challenges, missions, and rewards
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import {
  ChallengeCard,
  DailyPrompt,
  Badge,
  StreakIndicator,
} from '../components/Challenges';

// Sample challenges data
const DAILY_CHALLENGE = {
  prompt: 'Tell your partner one thing you admire about them that you\'ve never mentioned before.',
  category: 'communication' as const,
};

const ACTIVE_CHALLENGES = [
  {
    id: '1',
    title: 'Morning Love Notes',
    description: 'Leave a sweet note for your partner to find every morning this week.',
    type: 'weekly' as const,
    category: 'gratitude' as const,
    progress: 57,
    dueDate: 'Ends in 3 days',
    reward: 'Sweet Notes Badge',
    isActive: true,
  },
  {
    id: '2',
    title: '30 Days of Intimacy',
    description: 'Complete daily intimacy challenges to deepen your connection.',
    type: 'monthly' as const,
    category: 'intimacy' as const,
    progress: 23,
    dueDate: '23 days left',
    reward: 'Soulmates Theme',
    isActive: true,
  },
];

const AVAILABLE_CHALLENGES = [
  {
    id: '3',
    title: 'Photo Exchange',
    description: 'Send each other a photo of something that made you think of them today.',
    type: 'daily' as const,
    category: 'creative' as const,
    reward: '10 love points',
  },
  {
    id: '4',
    title: 'Adventure Day',
    description: 'Plan and go on a spontaneous adventure together this week.',
    type: 'weekly' as const,
    category: 'adventure' as const,
    reward: 'Adventurers Badge',
  },
  {
    id: '5',
    title: 'Gratitude Jar',
    description: 'Write down one thing you\'re grateful about your partner each day.',
    type: 'monthly' as const,
    category: 'gratitude' as const,
    reward: 'Gratitude Garden Theme',
  },
];

const EARNED_BADGES = [
  { id: '1', icon: '💕', title: 'First Week', earnedDate: 'Jul 22' },
  { id: '2', icon: '📝', title: 'Diary Starter', earnedDate: 'Jul 25' },
  { id: '3', icon: '🔥', title: '7 Day Streak', earnedDate: 'Aug 1' },
  { id: '4', icon: '📸', title: 'Memory Maker', earnedDate: 'Aug 15' },
  { id: '5', icon: '✨', title: 'First Month', earnedDate: 'Aug 22' },
  { id: '6', icon: '💬', title: 'Communicator', earnedDate: 'Sep 5' },
];

const LOCKED_BADGES = [
  { id: '7', icon: '🏆', title: '100 Days', isUnlocked: false },
  { id: '8', icon: '👑', title: 'Love Master', isUnlocked: false },
  { id: '9', icon: '🌟', title: '1 Year', isUnlocked: false },
];

const ChallengesScreen: React.FC = () => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const [refreshing, setRefreshing] = useState(false);
  const [showDailyPrompt, setShowDailyPrompt] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'available' | 'badges'>('active');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const weekProgress = [true, true, true, true, true, false, false];

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream.light }}>
      <Header
        title="Challenges"
        subtitle="Grow together, one challenge at a time"
        rightAction={{ icon: 'gift-outline', onPress: () => {} }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: spacing.md,
          paddingBottom: 100,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.rose}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Challenge Prompt */}
        {showDailyPrompt && (
          <DailyPrompt
            prompt={DAILY_CHALLENGE.prompt}
            category={DAILY_CHALLENGE.category}
            onAccept={() => setShowDailyPrompt(false)}
            onSkip={() => setShowDailyPrompt(false)}
            style={{ marginVertical: spacing.lg }}
          />
        )}

        {/* Streak Indicator */}
        <StreakIndicator
          currentStreak={12}
          longestStreak={23}
          weekProgress={weekProgress}
          style={{ marginBottom: spacing.lg }}
        />

        {/* Tab Navigation */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.white,
            borderRadius: borderRadius.xl,
            padding: spacing.xxs,
            marginBottom: spacing.lg,
            ...shadows.xs,
          }}
        >
          {(['active', 'available', 'badges'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                flex: 1,
                paddingVertical: spacing.sm,
                borderRadius: borderRadius.lg,
                backgroundColor: activeTab === tab ? colors.primary.blush : 'transparent',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: activeTab === tab ? '600' : '400',
                  color: activeTab === tab ? colors.primary.rose : colors.text.tertiary,
                  textTransform: 'capitalize',
                }}
              >
                {tab === 'active' ? 'In Progress' : tab === 'available' ? 'Discover' : 'Badges'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Active Challenges */}
        {activeTab === 'active' && (
          <>
            {ACTIVE_CHALLENGES.length > 0 ? (
              ACTIVE_CHALLENGES.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  {...challenge}
                  onPress={() => {}}
                  onComplete={() => {}}
                  style={{ marginBottom: spacing.md }}
                />
              ))
            ) : (
              <View
                style={{
                  backgroundColor: colors.white,
                  borderRadius: borderRadius.xl,
                  padding: spacing.xl,
                  alignItems: 'center',
                  ...shadows.sm,
                }}
              >
                <Text style={{ fontSize: 48, marginBottom: spacing.md }}>🌱</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: colors.text.primary,
                    marginBottom: spacing.xs,
                  }}
                >
                  No Active Challenges
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.text.tertiary,
                    textAlign: 'center',
                  }}
                >
                  Start a new challenge to grow closer together
                </Text>
              </View>
            )}
          </>
        )}

        {/* Available Challenges */}
        {activeTab === 'available' && (
          <>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: spacing.md,
              }}
            >
              Daily Challenges
            </Text>
            {AVAILABLE_CHALLENGES.filter((c) => c.type === 'daily').map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                {...challenge}
                onPress={() => {}}
                style={{ marginBottom: spacing.md }}
              />
            ))}

            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: spacing.md,
                marginTop: spacing.md,
              }}
            >
              Weekly Challenges
            </Text>
            {AVAILABLE_CHALLENGES.filter((c) => c.type === 'weekly').map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                {...challenge}
                onPress={() => {}}
                style={{ marginBottom: spacing.md }}
              />
            ))}

            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: spacing.md,
                marginTop: spacing.md,
              }}
            >
              30-Day Challenges
            </Text>
            {AVAILABLE_CHALLENGES.filter((c) => c.type === 'monthly').map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                {...challenge}
                onPress={() => {}}
                style={{ marginBottom: spacing.md }}
              />
            ))}
          </>
        )}

        {/* Badges */}
        {activeTab === 'badges' && (
          <>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: spacing.md,
              }}
            >
              Earned Badges
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: colors.white,
                borderRadius: borderRadius.xl,
                padding: spacing.md,
                marginBottom: spacing.lg,
                ...shadows.sm,
              }}
            >
              {EARNED_BADGES.map((badge) => (
                <View
                  key={badge.id}
                  style={{
                    width: '33.33%',
                    paddingVertical: spacing.md,
                    alignItems: 'center',
                  }}
                >
                  <Badge
                    icon={badge.icon}
                    title={badge.title}
                    earnedDate={badge.earnedDate}
                    isUnlocked
                    size="medium"
                  />
                </View>
              ))}
            </View>

            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: spacing.md,
              }}
            >
              Locked Badges
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: colors.white,
                borderRadius: borderRadius.xl,
                padding: spacing.md,
                ...shadows.sm,
              }}
            >
              {LOCKED_BADGES.map((badge) => (
                <View
                  key={badge.id}
                  style={{
                    width: '33.33%',
                    paddingVertical: spacing.md,
                    alignItems: 'center',
                  }}
                >
                  <Badge
                    icon={badge.icon}
                    title={badge.title}
                    isUnlocked={false}
                    size="medium"
                  />
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ChallengesScreen;
