/**
 * Love Diary - Reactions Component
 * Heart reactions, emoji responses, comments
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ViewStyle,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Avatar } from './Avatar';

// Available emoji reactions
const EMOJI_REACTIONS = ['❤️', '🥰', '😍', '🤗', '💕', '💖', '✨', '🌸'];

interface ReactionsBarProps {
  likes: number;
  isLiked: boolean;
  onLikePress: () => void;
  onCommentPress: () => void;
  onEmojiPress?: () => void;
  commentCount?: number;
  style?: ViewStyle;
}

export const ReactionsBar: React.FC<ReactionsBarProps> = ({
  likes,
  isLiked,
  onLikePress,
  onCommentPress,
  onEmojiPress,
  commentCount = 0,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  const [scale] = useState(new Animated.Value(1));

  const handleLikePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onLikePress();
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.ui.divider,
        },
        style,
      ]}
    >
      {/* Heart reaction */}
      <TouchableOpacity
        onPress={handleLikePress}
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: spacing.lg,
        }}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? colors.heart.pink : colors.text.tertiary}
          />
        </Animated.View>
        {likes > 0 && (
          <Text
            style={{
              fontSize: 14,
              color: isLiked ? colors.heart.pink : colors.text.tertiary,
              marginLeft: spacing.xxs,
              fontWeight: '500',
            }}
          >
            {likes}
          </Text>
        )}
      </TouchableOpacity>

      {/* Comment button */}
      <TouchableOpacity
        onPress={onCommentPress}
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: spacing.lg,
        }}
      >
        <Ionicons
          name="chatbubble-outline"
          size={22}
          color={colors.text.tertiary}
        />
        {commentCount > 0 && (
          <Text
            style={{
              fontSize: 14,
              color: colors.text.tertiary,
              marginLeft: spacing.xxs,
            }}
          >
            {commentCount}
          </Text>
        )}
      </TouchableOpacity>

      {/* Emoji reaction trigger */}
      {onEmojiPress && (
        <TouchableOpacity onPress={onEmojiPress} activeOpacity={0.7}>
          <Ionicons
            name="happy-outline"
            size={22}
            color={colors.text.tertiary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Emoji picker for reactions
interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  selectedEmojis?: string[];
  visible: boolean;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onSelect,
  selectedEmojis = [],
  visible,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  if (!visible) return null;

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.sm,
        ...shadows.md,
      }}
    >
      {EMOJI_REACTIONS.map((emoji) => {
        const isSelected = selectedEmojis.includes(emoji);
        return (
          <TouchableOpacity
            key={emoji}
            onPress={() => onSelect(emoji)}
            activeOpacity={0.7}
            style={{
              padding: spacing.xs,
              backgroundColor: isSelected ? colors.primary.blush : 'transparent',
              borderRadius: borderRadius.md,
              marginHorizontal: 2,
            }}
          >
            <Text style={{ fontSize: 24 }}>{emoji}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Display received reactions
interface ReactionDisplayProps {
  reactions: { emoji: string; count: number }[];
  onReactionPress?: (emoji: string) => void;
}

export const ReactionDisplay: React.FC<ReactionDisplayProps> = ({
  reactions,
  onReactionPress,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  if (reactions.length === 0) return null;

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.sm }}>
      {reactions.map(({ emoji, count }) => (
        <TouchableOpacity
          key={emoji}
          onPress={() => onReactionPress?.(emoji)}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primary.blush,
            borderRadius: borderRadius.round,
            paddingVertical: spacing.xxs,
            paddingHorizontal: spacing.xs,
            marginRight: spacing.xs,
            marginBottom: spacing.xxs,
          }}
        >
          <Text style={{ fontSize: 14 }}>{emoji}</Text>
          {count > 1 && (
            <Text
              style={{
                fontSize: 12,
                color: colors.text.secondary,
                marginLeft: 4,
              }}
            >
              {count}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Comment component
interface CommentProps {
  author: {
    name: string;
    avatarSource?: any;
    isPartner?: boolean;
  };
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
}

export const Comment: React.FC<CommentProps> = ({
  author,
  content,
  timestamp,
  reactions,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: spacing.md,
      }}
    >
      <Avatar
        source={author.avatarSource}
        name={author.name}
        size="sm"
        showBorder={author.isPartner}
      />
      <View
        style={{
          flex: 1,
          marginLeft: spacing.sm,
          backgroundColor: author.isPartner ? colors.primary.blush : colors.cream.base,
          borderRadius: borderRadius.lg,
          padding: spacing.sm,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.xxs,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: colors.text.primary,
            }}
          >
            {author.name}
            {author.isPartner && (
              <Text style={{ color: colors.heart.pink }}> 💕</Text>
            )}
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: colors.text.tertiary,
            }}
          >
            {timestamp}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            color: colors.text.primary,
            lineHeight: 20,
          }}
        >
          {content}
        </Text>
        {reactions && <ReactionDisplay reactions={reactions} />}
      </View>
    </View>
  );
};

// Comment input
interface CommentInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  avatarSource?: any;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Write a loving note...',
  avatarSource,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.sm,
        borderWidth: 1,
        borderColor: colors.ui.border,
      }}
    >
      <Avatar source={avatarSource} size="sm" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.light}
        style={{
          flex: 1,
          marginHorizontal: spacing.sm,
          fontSize: 15,
          color: colors.text.primary,
          maxHeight: 100,
        }}
        multiline
      />
      <TouchableOpacity
        onPress={onSubmit}
        disabled={!value.trim()}
        activeOpacity={0.7}
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: value.trim() ? colors.primary.rose : colors.cream.dark,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons
          name="send"
          size={18}
          color={value.trim() ? colors.white : colors.text.light}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ReactionsBar;
