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

// Sample diary entries data
const SAMPLE_ENTRIES = [
  {
    id: '1',
    author: {
      name: 'Sarah',
      isPartner: true,
    },
    content: {
      type: 'text' as const,
      text: 'Today we watched the sunset together from our balcony. The sky was painted in the most beautiful shades of orange and pink. In that moment, with your hand in mine, I felt so incredibly grateful for this life we\'re building together. These simple moments are what I treasure most.',
    },
    mood: 'grateful' as MoodType,
    loveIndex: 92,
    isPrivate: false,
    timestamp: '7:32 PM',
    date: 'Today',
    likes: 1,
    isLiked: true,
    comments: 2,
    reactions: [{ emoji: '💕', count: 1 }],
  },
  {
    id: '2',
    author: {
      name: 'You',
      isPartner: false,
    },
    content: {
      type: 'photo' as const,
      text: 'Our little breakfast date this morning. You make the best pancakes.',
    },
    mood: 'cozy' as MoodType,
    loveIndex: 88,
    isPrivate: false,
    timestamp: '9:15 AM',
    date: 'Today',
    likes: 1,
    isLiked: false,
    comments: 1,
    reactions: [{ emoji: '🥰', count: 1 }],
  },
  {
    id: '3',
    author: {
      name: 'Sarah',
      isPartner: true,
    },
    content: {
      type: 'voice' as const,
      text: 'A voice message for you...',
      mediaDuration: '1:24',
    },
    mood: 'loving' as MoodType,
    loveIndex: 95,
    isPrivate: false,
    timestamp: 'Yesterday',
    date: 'Dec 18',
    likes: 1,
    isLiked: true,
    comments: 0,
    reactions: [{ emoji: '❤️', count: 1 }, { emoji: '🥹', count: 1 }],
  },
  {
    id: '4',
    author: {
      name: 'You',
      isPartner: false,
    },
    content: {
      type: 'text' as const,
      text: 'I\'ve been thinking about our trip to Paris next spring. I can\'t wait to walk along the Seine with you, to share croissants at a tiny café, to see the Eiffel Tower light up at night. Every adventure is better with you by my side.',
    },
    mood: 'excited' as MoodType,
    loveIndex: 90,
    isPrivate: true,
    timestamp: '3:45 PM',
    date: 'Dec 17',
    likes: 0,
    isLiked: false,
    comments: 0,
    reactions: [],
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
      <GreetingHeader daysTogether={487} />

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
