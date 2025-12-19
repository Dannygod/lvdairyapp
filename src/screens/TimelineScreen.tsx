/**
 * Love Diary - Timeline Screen
 * Visual timeline of relationship milestones
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
import { DayCounter, MilestoneItem, AnnualRecap } from '../components/Timeline';
import { Button } from '../components/Button';

// Sample milestones data
const SAMPLE_MILESTONES = [
  {
    id: '1',
    type: 'first_date' as const,
    title: 'Our First Date',
    date: 'July 15, 2023',
    description: 'Coffee at the little café downtown. I was so nervous, but when you laughed at my terrible joke, I knew everything would be okay.',
  },
  {
    id: '2',
    type: 'first_kiss' as const,
    title: 'First Kiss',
    date: 'July 28, 2023',
    description: 'Under the stars at the beach. Time stopped for just that moment.',
  },
  {
    id: '3',
    type: 'travel' as const,
    title: 'Road Trip to the Mountains',
    date: 'September 5, 2023',
    description: 'Our first adventure together. Getting lost on those mountain roads was the best thing that ever happened to us.',
  },
  {
    id: '4',
    type: 'first_argument' as const,
    title: 'We Worked Through It',
    date: 'October 12, 2023',
    description: 'Our first real disagreement, but we learned how to communicate better. It made us stronger.',
  },
  {
    id: '5',
    type: 'anniversary' as const,
    title: '6 Month Anniversary',
    date: 'January 15, 2024',
    description: 'Half a year of love, laughter, and growing together. Here\'s to many more.',
  },
  {
    id: '6',
    type: 'birthday' as const,
    title: 'Your Birthday Surprise',
    date: 'March 22, 2024',
    description: 'The look on your face when you walked into the surprise party was priceless!',
  },
  {
    id: '7',
    type: 'moved_in' as const,
    title: 'Moving In Together',
    date: 'June 1, 2024',
    description: 'Our little apartment became a home the moment we were both in it.',
  },
  {
    id: '8',
    type: 'anniversary' as const,
    title: 'One Year Anniversary',
    date: 'July 15, 2024',
    description: 'One year of falling more in love every single day. You\'re my favorite person.',
  },
];

const ANNUAL_RECAP = {
  year: 2024,
  highlights: {
    totalDays: 365,
    diaryEntries: 248,
    photos: 1247,
    topMoods: ['🥰', '☕', '✨', '💕'],
    averageLoveIndex: 89,
  },
};

const TimelineScreen: React.FC = () => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline');

  const startDate = new Date('2023-07-15');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream.light }}>
      <Header
        title="Our Timeline"
        subtitle="Every moment matters"
        rightActions={[
          { icon: 'add-circle-outline', onPress: () => {} },
          { icon: 'share-outline', onPress: () => {} },
        ]}
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
        {/* Day Counter */}
        <DayCounter startDate={startDate} style={{ marginVertical: spacing.lg }} />

        {/* View toggle */}
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
          <TouchableOpacity
            onPress={() => setViewMode('timeline')}
            style={{
              flex: 1,
              paddingVertical: spacing.sm,
              borderRadius: borderRadius.lg,
              backgroundColor: viewMode === 'timeline' ? colors.primary.blush : 'transparent',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: viewMode === 'timeline' ? '600' : '400',
                color: viewMode === 'timeline' ? colors.primary.rose : colors.text.tertiary,
              }}
            >
              Timeline
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setViewMode('calendar')}
            style={{
              flex: 1,
              paddingVertical: spacing.sm,
              borderRadius: borderRadius.lg,
              backgroundColor: viewMode === 'calendar' ? colors.primary.blush : 'transparent',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: viewMode === 'calendar' ? '600' : '400',
                color: viewMode === 'calendar' ? colors.primary.rose : colors.text.tertiary,
              }}
            >
              Calendar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Annual Recap Card */}
        <AnnualRecap
          year={ANNUAL_RECAP.year}
          highlights={ANNUAL_RECAP.highlights}
          onPress={() => {}}
          style={{ marginBottom: spacing.xl }}
        />

        {/* Section header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.md,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.text.primary,
            }}
          >
            Our Milestones
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: colors.primary.rose,
                marginRight: spacing.xxs,
              }}
            >
              Add New
            </Text>
            <Ionicons name="add" size={18} color={colors.primary.rose} />
          </TouchableOpacity>
        </View>

        {/* Milestones */}
        {SAMPLE_MILESTONES.map((milestone, index) => (
          <MilestoneItem
            key={milestone.id}
            type={milestone.type}
            title={milestone.title}
            date={milestone.date}
            description={milestone.description}
            isFirst={index === 0}
            isLast={index === SAMPLE_MILESTONES.length - 1}
            onPress={() => {}}
          />
        ))}

        {/* Export button */}
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: borderRadius.xl,
            padding: spacing.lg,
            marginTop: spacing.md,
            alignItems: 'center',
            ...shadows.sm,
          }}
        >
          <Text style={{ fontSize: 28, marginBottom: spacing.sm }}>🎬</Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: colors.text.primary,
              marginBottom: spacing.xs,
            }}
          >
            Create Memory Video
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: colors.text.tertiary,
              textAlign: 'center',
              marginBottom: spacing.md,
            }}
          >
            Turn your timeline into a beautiful commemorative video to share or keep forever
          </Text>
          <Button
            title="Create Video"
            onPress={() => {}}
            variant="primary"
            icon="film-outline"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TimelineScreen;
