/**
 * Love Diary - Profile Screen (Us)
 * Couple profile and settings
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import { CoupleAvatar, Avatar } from '../components/Avatar';
import { Button } from '../components/Button';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showArrow?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showArrow = true,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress && !rightElement}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.primary.blush,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: spacing.md,
        }}
      >
        <Ionicons name={icon} size={20} color={colors.primary.rose} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            color: colors.text.primary,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              fontSize: 12,
              color: colors.text.tertiary,
              marginTop: 2,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement}
      {showArrow && !rightElement && (
        <Ionicons name="chevron-forward" size={20} color={colors.text.light} />
      )}
    </TouchableOpacity>
  );
};

const ProfileScreen: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);

  const stats = {
    diaryEntries: 248,
    photos: 1247,
    challenges: 15,
    streakDays: 12,
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream.light }}>
      <Header
        title="Us"
        rightAction={{ icon: 'settings-outline', onPress: () => {} }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Couple Profile Card */}
        <LinearGradient
          colors={colors.gradients.love}
          style={{
            marginHorizontal: spacing.md,
            marginVertical: spacing.lg,
            borderRadius: borderRadius.xxl,
            padding: spacing.xl,
            alignItems: 'center',
            ...shadows.md,
          }}
        >
          <CoupleAvatar
            partner1={{ name: 'You' }}
            partner2={{ name: 'Sarah' }}
            size="xl"
          />
          <Text
            style={{
              fontFamily: 'Georgia',
              fontSize: 24,
              fontWeight: '700',
              color: colors.text.primary,
              marginTop: spacing.lg,
            }}
          >
            You & Sarah 💕
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.text.secondary,
              marginTop: spacing.xs,
            }}
          >
            Together since July 15, 2023
          </Text>

          {/* Stats */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: spacing.lg,
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: colors.heart.pink,
                }}
              >
                {stats.diaryEntries}
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
                  color: colors.heart.pink,
                }}
              >
                {stats.photos}
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
                {stats.challenges}
              </Text>
              <Text style={{ fontSize: 11, color: colors.text.tertiary }}>
                Challenges
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
                {stats.streakDays}🔥
              </Text>
              <Text style={{ fontSize: 11, color: colors.text.tertiary }}>
                Streak
              </Text>
            </View>
          </View>

          <Button
            title="Edit Couple Profile"
            onPress={() => {}}
            variant="soft"
            size="small"
            style={{ marginTop: spacing.lg }}
          />
        </LinearGradient>

        {/* Individual Profiles */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: spacing.md,
            marginBottom: spacing.lg,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: colors.white,
              borderRadius: borderRadius.xl,
              padding: spacing.md,
              marginRight: spacing.sm,
              alignItems: 'center',
              ...shadows.sm,
            }}
          >
            <Avatar name="You" size="lg" showBorder />
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: colors.text.primary,
                marginTop: spacing.sm,
              }}
            >
              You
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.text.tertiary,
              }}
            >
              View Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: colors.white,
              borderRadius: borderRadius.xl,
              padding: spacing.md,
              marginLeft: spacing.sm,
              alignItems: 'center',
              ...shadows.sm,
            }}
          >
            <Avatar name="Sarah" size="lg" showBorder />
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: colors.text.primary,
                marginTop: spacing.sm,
              }}
            >
              Sarah
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.text.tertiary,
              }}
            >
              View Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: borderRadius.xl,
            marginHorizontal: spacing.md,
            marginBottom: spacing.md,
            ...shadows.sm,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: colors.text.tertiary,
              letterSpacing: 1,
              textTransform: 'uppercase',
              paddingHorizontal: spacing.md,
              paddingTop: spacing.md,
              paddingBottom: spacing.xs,
            }}
          >
            Appearance
          </Text>
          <SettingItem
            icon="moon-outline"
            title="Night Mode"
            subtitle={isDark ? 'On' : 'Off'}
            rightElement={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.cream.dark, true: colors.primary.roseLight }}
                thumbColor={isDark ? colors.primary.rose : colors.white}
              />
            }
            showArrow={false}
          />
          <SettingItem
            icon="color-palette-outline"
            title="Theme"
            subtitle="Rose Garden"
            onPress={() => {}}
          />
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: borderRadius.xl,
            marginHorizontal: spacing.md,
            marginBottom: spacing.md,
            ...shadows.sm,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: colors.text.tertiary,
              letterSpacing: 1,
              textTransform: 'uppercase',
              paddingHorizontal: spacing.md,
              paddingTop: spacing.md,
              paddingBottom: spacing.xs,
            }}
          >
            Notifications
          </Text>
          <SettingItem
            icon="notifications-outline"
            title="Push Notifications"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.cream.dark, true: colors.primary.roseLight }}
                thumbColor={notificationsEnabled ? colors.primary.rose : colors.white}
              />
            }
            showArrow={false}
          />
          <SettingItem
            icon="time-outline"
            title="Daily Reminder"
            subtitle="8:00 PM"
            rightElement={
              <Switch
                value={dailyReminder}
                onValueChange={setDailyReminder}
                trackColor={{ false: colors.cream.dark, true: colors.primary.roseLight }}
                thumbColor={dailyReminder ? colors.primary.rose : colors.white}
              />
            }
            showArrow={false}
          />
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: borderRadius.xl,
            marginHorizontal: spacing.md,
            marginBottom: spacing.md,
            ...shadows.sm,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: colors.text.tertiary,
              letterSpacing: 1,
              textTransform: 'uppercase',
              paddingHorizontal: spacing.md,
              paddingTop: spacing.md,
              paddingBottom: spacing.xs,
            }}
          >
            Privacy & Security
          </Text>
          <SettingItem
            icon="lock-closed-outline"
            title="App Lock"
            subtitle="Face ID enabled"
            onPress={() => {}}
          />
          <SettingItem
            icon="shield-checkmark-outline"
            title="Privacy Settings"
            onPress={() => {}}
          />
          <SettingItem
            icon="cloud-outline"
            title="Backup & Sync"
            subtitle="Last backup: Today"
            onPress={() => {}}
          />
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: borderRadius.xl,
            marginHorizontal: spacing.md,
            marginBottom: spacing.md,
            ...shadows.sm,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: colors.text.tertiary,
              letterSpacing: 1,
              textTransform: 'uppercase',
              paddingHorizontal: spacing.md,
              paddingTop: spacing.md,
              paddingBottom: spacing.xs,
            }}
          >
            Support
          </Text>
          <SettingItem
            icon="help-circle-outline"
            title="Help & FAQ"
            onPress={() => {}}
          />
          <SettingItem
            icon="chatbubble-ellipses-outline"
            title="Contact Us"
            onPress={() => {}}
          />
          <SettingItem
            icon="heart-outline"
            title="Rate Love Diary"
            onPress={() => {}}
          />
        </View>

        {/* Version */}
        <Text
          style={{
            fontSize: 12,
            color: colors.text.light,
            textAlign: 'center',
            marginTop: spacing.md,
          }}
        >
          Love Diary v1.0.0
        </Text>
        <Text
          style={{
            fontSize: 11,
            color: colors.text.light,
            textAlign: 'center',
            marginTop: spacing.xxs,
          }}
        >
          Made with 💕
        </Text>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
