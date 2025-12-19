/**
 * Love Diary - Write Entry Screen
 * Create new diary entries with multiple formats
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { ModalHeader } from '../components/Header';
import { DiaryTextArea } from '../components/Input';
import { MoodSelector, MoodType } from '../components/MoodSelector';
import { LoveIndexSlider } from '../components/LoveIndex';
import { PrivacyToggle } from '../components/PrivacyToggle';
import { Button } from '../components/Button';

type EntryType = 'text' | 'photo' | 'voice' | 'video';

interface WriteEntryScreenProps {
  onClose?: () => void;
  onSave?: (entry: any) => void;
}

const WriteEntryScreen: React.FC<WriteEntryScreenProps> = ({ onClose, onSave }) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const [entryType, setEntryType] = useState<EntryType>('text');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>();
  const [loveIndex, setLoveIndex] = useState(75);
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const entryTypes: { type: EntryType; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
    { type: 'text', icon: 'create-outline', label: 'Text' },
    { type: 'photo', icon: 'camera-outline', label: 'Photo' },
    { type: 'voice', icon: 'mic-outline', label: 'Voice' },
    { type: 'video', icon: 'videocam-outline', label: 'Video' },
  ];

  const handleSave = () => {
    const entry = {
      type: entryType,
      content,
      mood: selectedMood,
      loveIndex,
      isPrivate,
      media: selectedImage,
      timestamp: new Date().toISOString(),
    };
    onSave?.(entry);
  };

  const canSave = content.trim().length > 0 || selectedImage;

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream.light }}>
      <ModalHeader
        title="New Entry"
        onClose={onClose}
        onSave={handleSave}
        saveText="Share"
        saveDisabled={!canSave}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: spacing.md }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Entry type selector */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: colors.white,
              borderRadius: borderRadius.xl,
              padding: spacing.xs,
              marginBottom: spacing.lg,
              ...shadows.xs,
            }}
          >
            {entryTypes.map(({ type, icon, label }) => (
              <TouchableOpacity
                key={type}
                onPress={() => setEntryType(type)}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: spacing.sm,
                  borderRadius: borderRadius.lg,
                  backgroundColor: entryType === type ? colors.primary.blush : 'transparent',
                }}
              >
                <Ionicons
                  name={icon}
                  size={20}
                  color={entryType === type ? colors.primary.rose : colors.text.tertiary}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: entryType === type ? '600' : '400',
                    color: entryType === type ? colors.primary.rose : colors.text.tertiary,
                    marginLeft: spacing.xxs,
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Content area based on type */}
          {entryType === 'text' && (
            <DiaryTextArea
              value={content}
              onChangeText={setContent}
              placeholder="What's on your heart today?"
              showCharCount
              maxLength={2000}
            />
          )}

          {entryType === 'photo' && (
            <View style={{ marginBottom: spacing.lg }}>
              {selectedImage ? (
                <View style={{ position: 'relative' }}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={{
                      width: '100%',
                      height: 250,
                      borderRadius: borderRadius.xl,
                    }}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => setSelectedImage(null)}
                    style={{
                      position: 'absolute',
                      top: spacing.sm,
                      right: spacing.sm,
                      backgroundColor: colors.ui.overlay,
                      borderRadius: 16,
                      padding: spacing.xs,
                    }}
                  >
                    <Ionicons name="close" size={20} color={colors.white} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    // Image picker would go here
                  }}
                  style={{
                    height: 200,
                    backgroundColor: colors.white,
                    borderRadius: borderRadius.xl,
                    borderWidth: 2,
                    borderStyle: 'dashed',
                    borderColor: colors.ui.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      backgroundColor: colors.primary.blush,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: spacing.sm,
                    }}
                  >
                    <Ionicons name="camera" size={28} color={colors.primary.rose} />
                  </View>
                  <Text style={{ fontSize: 15, color: colors.text.secondary }}>
                    Tap to add a photo
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.text.tertiary, marginTop: 4 }}>
                    Capture this moment
                  </Text>
                </TouchableOpacity>
              )}

              <DiaryTextArea
                value={content}
                onChangeText={setContent}
                placeholder="Add a caption..."
                minHeight={80}
                style={{ marginTop: spacing.md }}
              />
            </View>
          )}

          {entryType === 'voice' && (
            <View style={{ marginBottom: spacing.lg }}>
              <View
                style={{
                  backgroundColor: colors.white,
                  borderRadius: borderRadius.xxl,
                  padding: spacing.xl,
                  alignItems: 'center',
                  ...shadows.sm,
                }}
              >
                <TouchableOpacity
                  onPress={() => setIsRecording(!isRecording)}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: isRecording ? colors.heart.red : colors.primary.rose,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...shadows.md,
                  }}
                >
                  <Ionicons
                    name={isRecording ? 'stop' : 'mic'}
                    size={36}
                    color={colors.white}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 15,
                    color: colors.text.secondary,
                    marginTop: spacing.md,
                  }}
                >
                  {isRecording ? 'Recording... Tap to stop' : 'Tap to record a voice note'}
                </Text>

                {isRecording && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: spacing.sm,
                    }}
                  >
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: colors.heart.red,
                        marginRight: spacing.xs,
                      }}
                    />
                    <Text style={{ fontSize: 24, color: colors.text.primary, fontWeight: '300' }}>
                      0:00
                    </Text>
                  </View>
                )}
              </View>

              <DiaryTextArea
                value={content}
                onChangeText={setContent}
                placeholder="Add a note about this voice message..."
                minHeight={60}
                style={{ marginTop: spacing.md }}
              />
            </View>
          )}

          {entryType === 'video' && (
            <View style={{ marginBottom: spacing.lg }}>
              <TouchableOpacity
                onPress={() => {
                  // Video capture would go here
                }}
                style={{
                  height: 200,
                  backgroundColor: colors.white,
                  borderRadius: borderRadius.xl,
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderColor: colors.ui.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: colors.primary.blush,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: spacing.sm,
                  }}
                >
                  <Ionicons name="videocam" size={28} color={colors.primary.rose} />
                </View>
                <Text style={{ fontSize: 15, color: colors.text.secondary }}>
                  Tap to record a video
                </Text>
                <Text style={{ fontSize: 12, color: colors.text.tertiary, marginTop: 4 }}>
                  Up to 30 seconds
                </Text>
              </TouchableOpacity>

              <DiaryTextArea
                value={content}
                onChangeText={setContent}
                placeholder="Add a caption..."
                minHeight={80}
                style={{ marginTop: spacing.md }}
              />
            </View>
          )}

          {/* Mood selector */}
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: borderRadius.xl,
              padding: spacing.md,
              marginTop: spacing.md,
              ...shadows.xs,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: colors.text.secondary,
                marginBottom: spacing.sm,
              }}
            >
              How are you feeling?
            </Text>
            <MoodSelector
              selectedMood={selectedMood}
              onMoodSelect={setSelectedMood}
              showLabels={false}
            />
          </View>

          {/* Love index */}
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: borderRadius.xl,
              padding: spacing.md,
              marginTop: spacing.md,
              ...shadows.xs,
            }}
          >
            <LoveIndexSlider
              value={loveIndex}
              onChange={setLoveIndex}
            />
          </View>

          {/* Privacy toggle */}
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: borderRadius.xl,
              padding: spacing.md,
              marginTop: spacing.md,
              ...shadows.xs,
            }}
          >
            <PrivacyToggle
              isPrivate={isPrivate}
              onToggle={setIsPrivate}
            />
          </View>

          {/* Extra padding at bottom */}
          <View style={{ height: spacing.xxxl }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default WriteEntryScreen;
