/**
 * Love Diary - Diary Screen
 * Main diary feed showing entries from both partners
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { GreetingHeader } from '../components/Header';
import { DiaryEntry } from '../components/DiaryEntry';
import { MoodTags, MoodType } from '../components/MoodSelector';
import { SearchInput } from '../components/Input';

// Sample diary entries data - 紅豆與牛奶的日記
const SAMPLE_ENTRIES = [
  {
    id: '1',
    author: {
      name: '紅豆',
      isPartner: false,
    },
    content: {
      type: 'text' as const,
      text: '今天去Zara買衣服，然後一起看電影、逛街。每次和牛奶在一起的時候都覺得時間過得好快，希望這樣的日子可以一直持續下去。',
    },
    mood: 'joyful' as MoodType,
    loveIndex: 95,
    isPrivate: false,
    timestamp: '9:30 PM',
    date: '12月20日',
    likes: 1,
    isLiked: true,
    comments: 1,
    reactions: [{ emoji: '💕', count: 1 }],
  },
  {
    id: '2',
    author: {
      name: '紅豆',
      isPartner: false,
    },
    content: {
      type: 'photo' as const,
      text: '吃蛋包飯，然後去東門吃河粉。牛奶說很好吃，看她開心的樣子我也很開心。',
    },
    mood: 'cozy' as MoodType,
    loveIndex: 92,
    isPrivate: false,
    timestamp: '7:00 PM',
    date: '12月14日',
    likes: 1,
    isLiked: true,
    comments: 0,
    reactions: [{ emoji: '🥰', count: 1 }],
  },
  {
    id: '3',
    author: {
      name: '紅豆',
      isPartner: false,
    },
    content: {
      type: 'text' as const,
      text: '去小紅書推薦的咖啡廳，一起讀書，牽著手手。她很認真看書的樣子真的好可愛，我忍不住一直偷看她。',
    },
    mood: 'peaceful' as MoodType,
    loveIndex: 93,
    isPrivate: false,
    timestamp: '4:20 PM',
    date: '12月9日',
    likes: 1,
    isLiked: true,
    comments: 1,
    reactions: [{ emoji: '☕', count: 1 }, { emoji: '💕', count: 1 }],
  },
  {
    id: '4',
    author: {
      name: '紅豆',
      isPartner: false,
    },
    content: {
      type: 'text' as const,
      text: '開始每天打電話了！雖然有時候太忙沒有辦法，但聽到她的聲音就覺得很安心。晚安，我的牛奶。',
    },
    mood: 'loving' as MoodType,
    loveIndex: 90,
    isPrivate: true,
    timestamp: '11:30 PM',
    date: '12月8日',
    likes: 0,
    isLiked: false,
    comments: 0,
    reactions: [],
  },
  {
    id: '5',
    author: {
      name: '紅豆',
      isPartner: false,
    },
    content: {
      type: 'photo' as const,
      text: '去中山咖啡廳，然後買衣服、逛街、吃居酒屋！還巧遇之前的同學。她幫我買了外套和褲子，我好幸福。',
    },
    mood: 'excited' as MoodType,
    loveIndex: 96,
    isPrivate: false,
    timestamp: '10:00 PM',
    date: '12月6日',
    likes: 1,
    isLiked: true,
    comments: 2,
    reactions: [{ emoji: '✨', count: 1 }, { emoji: '🥰', count: 1 }],
  },
  {
    id: '6',
    author: {
      name: '紅豆',
      isPartner: false,
    },
    content: {
      type: 'text' as const,
      text: '今天去貓咖！然後逛夜市，牽了小手手，喝同一杯奶昔。最後載她回家。一整天都好開心，她真的好可愛。',
    },
    mood: 'romantic' as MoodType,
    loveIndex: 98,
    isPrivate: false,
    timestamp: '11:00 PM',
    date: '12月2日',
    likes: 1,
    isLiked: true,
    comments: 1,
    reactions: [{ emoji: '💕', count: 1 }, { emoji: '🐱', count: 1 }],
  },
  {
    id: '7',
    author: {
      name: '紅豆',
      isPartner: false,
    },
    content: {
      type: 'text' as const,
      text: '關於牛奶的觀察：\n• 不會跟我計較一些小錢\n• 願意跟我分享之前的故事\n• 很懂得照顧我（小舉動\n• 很認真的在咖啡廳做事（打字很快\n\n我真的很幸運能遇到她。',
    },
    mood: 'grateful' as MoodType,
    loveIndex: 95,
    isPrivate: true,
    timestamp: '10:30 PM',
    date: '11月29日',
    likes: 0,
    isLiked: false,
    comments: 0,
    reactions: [],
  },
  {
    id: '8',
    author: {
      name: '牛奶',
      isPartner: true,
    },
    content: {
      type: 'text' as const,
      text: '你通過考試了！我要幫你取名叫紅豆～因為紅豆配牛奶最好喝了 🥛❤️',
    },
    mood: 'playful' as MoodType,
    loveIndex: 100,
    isPrivate: false,
    timestamp: '8:00 PM',
    date: '11月26日',
    likes: 1,
    isLiked: true,
    comments: 1,
    reactions: [{ emoji: '❤️', count: 1 }, { emoji: '🫘', count: 1 }],
  },
];

const DiaryScreen: React.FC = () => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;

  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMoods, setSelectedMoods] = useState<MoodType[]>([]);
  const [entries, setEntries] = useState(SAMPLE_ENTRIES);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleMoodToggle = (mood: MoodType) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const handleLike = (entryId: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              isLiked: !entry.isLiked,
              likes: entry.isLiked ? entry.likes - 1 : entry.likes + 1,
            }
          : entry
      )
    );
  };

  // Filter entries
  const filteredEntries = entries.filter((entry) => {
    if (selectedMoods.length > 0 && entry.mood && !selectedMoods.includes(entry.mood)) {
      return false;
    }
    if (searchQuery && entry.content.text) {
      return entry.content.text.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream.light }}>
      <GreetingHeader daysTogether={35} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: spacing.md,
          paddingBottom: 100, // Space for bottom tab bar
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.rose}
            colors={[colors.primary.rose]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={{ marginBottom: spacing.md }}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search your memories..."
            onClear={() => setSearchQuery('')}
          />
        </View>

        {/* Mood filters */}
        <View style={{ marginBottom: spacing.md }}>
          <MoodTags selectedMoods={selectedMoods} onToggleMood={handleMoodToggle} />
        </View>

        {/* Diary entries */}
        {filteredEntries.map((entry) => (
          <DiaryEntry
            key={entry.id}
            {...entry}
            onLikePress={() => handleLike(entry.id)}
            onCommentPress={() => {}}
            onPress={() => {}}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default DiaryScreen;
