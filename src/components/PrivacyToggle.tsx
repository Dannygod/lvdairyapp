/**
 * Love Diary - Privacy Toggle Component
 * Private or shared with partner toggle
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface PrivacyToggleProps {
  isPrivate: boolean;
  onToggle: (isPrivate: boolean) => void;
  partnerName?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const PrivacyToggle: React.FC<PrivacyToggleProps> = ({
  isPrivate,
  onToggle,
  partnerName = 'Partner',
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows } = theme;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: colors.cream.base,
          borderRadius: borderRadius.xl,
          padding: spacing.xxs,
        },
        style,
      ]}
    >
      {/* Private Option */}
      <TouchableOpacity
        onPress={() => !disabled && onToggle(true)}
        activeOpacity={0.7}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          borderRadius: borderRadius.lg,
          backgroundColor: isPrivate ? colors.white : 'transparent',
          ...(isPrivate && shadows.xs),
        }}
      >
        <Ionicons
          name={isPrivate ? 'lock-closed' : 'lock-closed-outline'}
          size={18}
          color={isPrivate ? colors.primary.rose : colors.text.tertiary}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: isPrivate ? '600' : '400',
            color: isPrivate ? colors.text.primary : colors.text.tertiary,
            marginLeft: spacing.xs,
          }}
        >
          Private
        </Text>
      </TouchableOpacity>

      {/* Shared Option */}
      <TouchableOpacity
        onPress={() => !disabled && onToggle(false)}
        activeOpacity={0.7}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          borderRadius: borderRadius.lg,
          backgroundColor: !isPrivate ? colors.white : 'transparent',
          ...(!isPrivate && shadows.xs),
        }}
      >
        <Ionicons
          name={!isPrivate ? 'heart' : 'heart-outline'}
          size={18}
          color={!isPrivate ? colors.heart.pink : colors.text.tertiary}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: !isPrivate ? '600' : '400',
            color: !isPrivate ? colors.text.primary : colors.text.tertiary,
            marginLeft: spacing.xs,
          }}
        >
          Share
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Compact privacy indicator
interface PrivacyIndicatorProps {
  isPrivate: boolean;
  size?: 'small' | 'medium';
}

export const PrivacyIndicator: React.FC<PrivacyIndicatorProps> = ({
  isPrivate,
  size = 'small',
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  const iconSize = size === 'small' ? 14 : 18;
  const padding = size === 'small' ? spacing.xxs : spacing.xs;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isPrivate ? colors.cream.dark : colors.primary.blush,
        borderRadius: borderRadius.round,
        paddingVertical: padding,
        paddingHorizontal: spacing.xs,
      }}
    >
      <Ionicons
        name={isPrivate ? 'lock-closed' : 'heart'}
        size={iconSize}
        color={isPrivate ? colors.text.tertiary : colors.heart.pink}
      />
      {size === 'medium' && (
        <Text
          style={{
            fontSize: 11,
            color: isPrivate ? colors.text.tertiary : colors.heart.pink,
            marginLeft: 4,
            fontWeight: '500',
          }}
        >
          {isPrivate ? 'Private' : 'Shared'}
        </Text>
      )}
    </View>
  );
};

// Simple switch-style toggle
interface PrivacySwitchProps {
  isPrivate: boolean;
  onToggle: (isPrivate: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const PrivacySwitch: React.FC<PrivacySwitchProps> = ({
  isPrivate,
  onToggle,
  label = 'Keep this entry private',
  disabled = false,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  const translateX = React.useRef(new Animated.Value(isPrivate ? 20 : 0)).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: isPrivate ? 20 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 10,
    }).start();
  }, [isPrivate]);

  return (
    <TouchableOpacity
      onPress={() => !disabled && onToggle(!isPrivate)}
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons
          name="lock-closed"
          size={18}
          color={isPrivate ? colors.primary.rose : colors.text.tertiary}
          style={{ marginRight: spacing.sm }}
        />
        <Text
          style={{
            fontSize: 15,
            color: colors.text.primary,
          }}
        >
          {label}
        </Text>
      </View>

      <View
        style={{
          width: 48,
          height: 28,
          borderRadius: 14,
          backgroundColor: isPrivate ? colors.primary.rose : colors.cream.dark,
          padding: 2,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: colors.white,
            transform: [{ translateX }],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons
            name={isPrivate ? 'lock-closed' : 'lock-open'}
            size={12}
            color={isPrivate ? colors.primary.rose : colors.text.light}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default PrivacyToggle;
