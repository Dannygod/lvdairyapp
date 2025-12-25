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

// Sample milestones data - 紅豆與牛奶的時間軸
const SAMPLE_MILESTONES = [
  {
    id: '1',
    type: 'first_date' as const,
    title: '第一次認識聊天',
    date: '2024年11月20日',
    description: '一切的開始。命運讓我們相遇，從此我的世界多了一抹甜甜的牛奶色。',
  },
  {
    id: '2',
    type: 'first_kiss' as const,
    title: '第一次見面',
    date: '2024年11月26日（星期三晚上）',
    description: '終於見到本人了！她說我通過考試，要幫我取名叫紅豆。紅豆配牛奶，最搭了。',
  },
  {
    id: '3',
    type: 'travel' as const,
    title: '第一次咖啡廳約會',
    date: '2024年11月29日',
    description: '第一次一起去咖啡廳，第一次一起吃飯。發現她不會跟我計較小錢、願意分享故事、很會照顧人、做事很認真（打字超快）。',
  },
  {
    id: '4',
    type: 'custom' as const,
    title: '貓咖＆夜市約會',
    date: '2024年12月2日',
    description: '去貓咖、逛夜市、牽小手手、喝同一杯奶昔、載她回家。這天好幸福。🐱',
  },
  {
    id: '5',
    type: 'travel' as const,
    title: '中山咖啡廳＆逛街',
    date: '2024年12月6日',
    description: '去中山咖啡廳、買衣服、逛街、吃居酒屋！巧遇之前同學。她買了我的外套和褲子，好感動。',
  },
  {
    id: '6',
    type: 'anniversary' as const,
    title: '開始每天打電話',
    date: '2024年12月8日',
    description: '雖然有時候太忙沒辦法，但開始每天打電話了。聽到她的聲音就覺得很安心。',
  },
  {
    id: '7',
    type: 'custom' as const,
    title: '小紅書咖啡廳讀書',
    date: '2024年12月9日',
    description: '去小紅書推薦的咖啡廳，一起讀書、牽手手。她認真的樣子好可愛。',
  },
  {
    id: '8',
    type: 'travel' as const,
    title: '蛋包飯＆東門河粉',
    date: '2024年12月14日',
    description: '一起吃蛋包飯，然後去東門吃河粉。她說很好吃，看她開心我也開心。',
  },
  {
    id: '9',
    type: 'custom' as const,
    title: 'Zara購物＆看電影',
    date: '2024年12月20日',
    description: '去買Zara、看電影、逛街。和她在一起的時間總是過得特別快。',
  },
];

const ANNUAL_RECAP = {
  year: 2024,
  highlights: {
    totalDays: 35,
    diaryEntries: 12,
    photos: 28,
    topMoods: ['🥰', '☕', '🐱', '💕'],
    averageLoveIndex: 95,
  },
};

const TimelineScreen: React.FC = () => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline');

  const startDate = new Date('2024-11-20');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream.light }}>
      <Header
        title="紅豆與牛奶的時間軸"
        subtitle="每個瞬間都值得珍藏"
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
            我們的里程碑
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
              新增
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
