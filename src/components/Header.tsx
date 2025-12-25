/**
 * Love Diary - Header Component
 * Screen headers with romantic styling
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { CoupleAvatar } from './Avatar';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
  rightActions?: Array<{
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  }>;
  showCoupleAvatar?: boolean;
  partner1?: { name?: string; avatarSource?: any };
  partner2?: { name?: string; avatarSource?: any };
  transparent?: boolean;
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack,
  onBackPress,
  rightAction,
  rightActions,
  showCoupleAvatar,
  partner1,
  partner2,
  transparent,
  style,
}) => {
  const { theme, isDark } = useTheme();
  const { colors, spacing, layout } = theme;
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View
        style={[
          {
            paddingTop: insets.top + spacing.sm,
            paddingBottom: spacing.sm,
            paddingHorizontal: spacing.md,
            backgroundColor: transparent ? 'transparent' : colors.cream.light,
            borderBottomWidth: transparent ? 0 : 1,
            borderBottomColor: colors.ui.divider,
          },
          style,
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: layout.headerHeight,
          }}
        >
          {/* Left side */}
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            {showBack && (
              <TouchableOpacity
                onPress={onBackPress}
                activeOpacity={0.7}
                style={{
                  marginRight: spacing.sm,
                  padding: spacing.xs,
                }}
              >
                <Ionicons
                  name="chevron-back"
                  size={28}
                  color={colors.text.primary}
                />
              </TouchableOpacity>
            )}

            {showCoupleAvatar && (
              <CoupleAvatar
                partner1={partner1}
                partner2={partner2}
                size="sm"
                style={{ marginRight: spacing.md }}
              />
            )}

            <View style={{ flex: 1 }}>
              {title && (
                <Text
                  style={{
                    fontFamily: 'Georgia',
                    fontSize: subtitle ? 18 : 22,
                    fontWeight: '600',
                    color: colors.text.primary,
                  }}
                  numberOfLines={1}
                >
                  {title}
                </Text>
              )}
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
          </View>

          {/* Right side */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {rightActions?.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                activeOpacity={0.7}
                style={{
                  padding: spacing.xs,
                  marginLeft: spacing.xs,
                }}
              >
                <Ionicons
                  name={action.icon}
                  size={24}
                  color={colors.text.primary}
                />
              </TouchableOpacity>
            ))}

            {rightAction && (
              <TouchableOpacity
                onPress={rightAction.onPress}
                activeOpacity={0.7}
                style={{
                  padding: spacing.xs,
                }}
              >
                <Ionicons
                  name={rightAction.icon}
                  size={24}
                  color={colors.text.primary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

// Simple title header for modal screens
interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  onSave?: () => void;
  saveText?: string;
  saveDisabled?: boolean;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  onSave,
  saveText = 'Save',
  saveDisabled,
}) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: insets.top + spacing.sm,
        paddingBottom: spacing.md,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.ui.divider,
      }}
    >
      <TouchableOpacity
        onPress={onClose}
        activeOpacity={0.7}
        style={{ padding: spacing.xs }}
      >
        <Text style={{ fontSize: 16, color: colors.text.secondary }}>
          Cancel
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 17,
          fontWeight: '600',
          color: colors.text.primary,
        }}
      >
        {title}
      </Text>

      <TouchableOpacity
        onPress={onSave}
        activeOpacity={0.7}
        disabled={saveDisabled}
        style={{ padding: spacing.xs }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: saveDisabled ? colors.text.light : colors.primary.rose,
          }}
        >
          {saveText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Greeting header for home screen
interface GreetingHeaderProps {
  partnerName?: string;
  daysTogether?: number;
}

export const GreetingHeader: React.FC<GreetingHeaderProps> = ({
  partnerName,
  daysTogether,
}) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '早安';
    if (hour < 18) return '午安';
    return '晚安';
  };

  return (
    <View
      style={{
        paddingTop: insets.top + spacing.md,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.cream.light,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 14,
              color: colors.text.tertiary,
            }}
          >
            {getGreeting()} 💕
          </Text>
          <Text
            style={{
              fontFamily: 'Georgia',
              fontSize: 28,
              fontWeight: '700',
              color: colors.text.primary,
              marginTop: spacing.xxs,
            }}
          >
            紅豆與牛奶的日記
          </Text>
          {daysTogether && (
            <Text
              style={{
                fontSize: 13,
                color: colors.primary.rose,
                marginTop: spacing.xxs,
              }}
            >
              在一起的第 {daysTogether} 天 ✨
            </Text>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            padding: spacing.xs,
          }}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
