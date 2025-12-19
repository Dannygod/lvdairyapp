/**
 * Love Diary - Diary Entry Components
 * Complete diary entry display with all content types
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Avatar } from './Avatar';
import { MoodBadge, MoodType } from './MoodSelector';
import { LoveIndexBadge } from './LoveIndex';
import { PrivacyIndicator } from './PrivacyToggle';
import { ReactionsBar, ReactionDisplay } from './Reactions';

// Entry types
type EntryType = 'text' | 'photo' | 'voice' | 'video';

interface DiaryEntryProps {
  id: string;
  author: {
    name: string;
    avatarSource?: ImageSourcePropType;
    isPartner?: boolean;
  };
  content: {
    type: EntryType;
    text?: string;
    media?: ImageSourcePropType;
    mediaDuration?: string; // For voice/video
  };
  mood?: MoodType;
  loveIndex?: number;
  isPrivate: boolean;
  timestamp: string;
  date: string;
  likes: number;
  isLiked: boolean;
  comments: number;
  reactions?: { emoji: string; count: number }[];
  onPress?: () => void;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  style?: ViewStyle;
}

export const DiaryEntry: React.FC<DiaryEntryProps> = ({
  id,
  author,
  content,
  mood,
  loveIndex,
  isPrivate,
  timestamp,
  date,
  likes,
  isLiked,
  comments,
  reactions,
  onPress,
  onLikePress,
  onCommentPress,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const renderMediaContent = () => {
    switch (content.type) {
      case 'photo':
        return content.media ? (
          <TouchableOpacity activeOpacity={0.9} style={{ marginVertical: spacing.md }}>
            <Image
              source={content.media}
              style={{
                width: '100%',
                height: 200,
                borderRadius: borderRadius.lg,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : null;

      case 'voice':
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.accent.lavender,
              borderRadius: borderRadius.xl,
              padding: spacing.md,
              marginVertical: spacing.md,
            }}
          >
            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: colors.primary.rose,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="play" size={20} color={colors.white} />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <View
                style={{
                  height: 24,
                  backgroundColor: colors.primary.roseLight,
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                {/* Audio waveform placeholder */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    height: '100%',
                    paddingHorizontal: spacing.sm,
                  }}
                >
                  {[...Array(20)].map((_, i) => (
                    <View
                      key={i}
                      style={{
                        width: 3,
                        height: Math.random() * 14 + 4,
                        backgroundColor: colors.primary.rose,
                        borderRadius: 2,
                      }}
                    />
                  ))}
                </View>
              </View>
              <Text
                style={{
                  fontSize: 11,
                  color: colors.text.tertiary,
                  marginTop: spacing.xxs,
                }}
              >
                {content.mediaDuration || '0:00'}
              </Text>
            </View>
          </View>
        );

      case 'video':
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              marginVertical: spacing.md,
              borderRadius: borderRadius.lg,
              overflow: 'hidden',
              backgroundColor: colors.cream.dark,
            }}
          >
            {content.media && (
              <Image
                source={content.media}
                style={{
                  width: '100%',
                  height: 200,
                }}
                resizeMode="cover"
              />
            )}
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="play" size={28} color={colors.primary.rose} />
              </View>
            </View>
            {content.mediaDuration && (
              <View
                style={{
                  position: 'absolute',
                  bottom: spacing.sm,
                  right: spacing.sm,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  borderRadius: borderRadius.sm,
                  paddingVertical: 2,
                  paddingHorizontal: spacing.xs,
                }}
              >
                <Text style={{ fontSize: 11, color: colors.white }}>
                  {content.mediaDuration}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      disabled={!onPress}
      style={[
        {
          backgroundColor: colors.white,
          borderRadius: borderRadius.xxl,
          padding: spacing.lg,
          marginBottom: spacing.md,
          ...shadows.sm,
        },
        style,
      ]}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: spacing.md,
        }}
      >
        <Avatar
          source={author.avatarSource}
          name={author.name}
          size="md"
          showBorder={author.isPartner}
        />
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: colors.text.primary,
              }}
            >
              {author.name}
            </Text>
            {author.isPartner && (
              <Text style={{ marginLeft: 4 }}>💕</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <Text style={{ fontSize: 12, color: colors.text.tertiary }}>
              {date} • {timestamp}
            </Text>
          </View>
        </View>

        {/* Privacy & Mood indicators */}
        <View style={{ alignItems: 'flex-end' }}>
          <PrivacyIndicator isPrivate={isPrivate} />
          {mood && (
            <View style={{ marginTop: spacing.xs }}>
              <MoodBadge mood={mood} size="small" />
            </View>
          )}
        </View>
      </View>

      {/* Text content */}
      {content.text && (
        <Text
          style={{
            fontFamily: 'Georgia',
            fontSize: 16,
            lineHeight: 26,
            color: colors.text.primary,
          }}
          numberOfLines={6}
        >
          {content.text}
        </Text>
      )}

      {/* Media content */}
      {renderMediaContent()}

      {/* Love Index */}
      {loveIndex !== undefined && (
        <View style={{ marginTop: spacing.sm }}>
          <LoveIndexBadge value={loveIndex} size="small" />
        </View>
      )}

      {/* Reactions display */}
      {reactions && reactions.length > 0 && (
        <ReactionDisplay reactions={reactions} />
      )}

      {/* Actions */}
      <ReactionsBar
        likes={likes}
        isLiked={isLiked}
        onLikePress={onLikePress || (() => {})}
        onCommentPress={onCommentPress || (() => {})}
        commentCount={comments}
      />
    </TouchableOpacity>
  );
};

// Compact diary entry for lists
interface DiaryEntryCompactProps {
  mood?: MoodType;
  preview: string;
  date: string;
  hasMedia?: boolean;
  mediaType?: 'photo' | 'voice' | 'video';
  isPrivate: boolean;
  onPress?: () => void;
}

export const DiaryEntryCompact: React.FC<DiaryEntryCompactProps> = ({
  mood,
  preview,
  date,
  hasMedia,
  mediaType,
  isPrivate,
  onPress,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const getMediaIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (mediaType) {
      case 'photo':
        return 'image';
      case 'voice':
        return 'mic';
      case 'video':
        return 'videocam';
      default:
        return 'document';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.sm,
        ...shadows.xs,
      }}
    >
      {mood && <MoodBadge mood={mood} size="small" />}

      <View style={{ flex: 1, marginLeft: mood ? spacing.sm : 0 }}>
        <Text
          style={{
            fontSize: 14,
            color: colors.text.primary,
            lineHeight: 20,
          }}
          numberOfLines={2}
        >
          {preview}
        </Text>
        <Text
          style={{
            fontSize: 11,
            color: colors.text.tertiary,
            marginTop: spacing.xxs,
          }}
        >
          {date}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {hasMedia && (
          <Ionicons
            name={getMediaIcon()}
            size={16}
            color={colors.text.tertiary}
            style={{ marginRight: spacing.xs }}
          />
        )}
        {isPrivate && (
          <Ionicons
            name="lock-closed"
            size={14}
            color={colors.text.light}
          />
        )}
        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.text.light}
          style={{ marginLeft: spacing.xs }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DiaryEntry;
