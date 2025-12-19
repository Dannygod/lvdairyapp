/**
 * Love Diary - Custom Bottom Tab Bar
 * Soft, romantic tab navigation
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

interface TabItem {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFilled: keyof typeof Ionicons.glyphMap;
}

const TABS: TabItem[] = [
  { name: 'Diary', label: 'Diary', icon: 'book-outline', iconFilled: 'book' },
  { name: 'Timeline', label: 'Timeline', icon: 'time-outline', iconFilled: 'time' },
  { name: 'Write', label: '', icon: 'add', iconFilled: 'add' }, // Center action button
  { name: 'Challenges', label: 'Challenges', icon: 'heart-circle-outline', iconFilled: 'heart-circle' },
  { name: 'Profile', label: 'Us', icon: 'people-outline', iconFilled: 'people' },
];

interface BottomTabBarProps {
  currentTab: string;
  onTabPress: (tabName: string) => void;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ currentTab, onTabPress }) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows, layout } = theme;
  const insets = useSafeAreaInsets();

  const scaleValues = React.useRef(
    TABS.map(() => new Animated.Value(1))
  ).current;

  const handlePress = (index: number, tabName: string) => {
    Animated.sequence([
      Animated.timing(scaleValues[index], {
        toValue: 0.9,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onTabPress(tabName);
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        borderTopLeftRadius: borderRadius.xxl,
        borderTopRightRadius: borderRadius.xxl,
        paddingBottom: insets.bottom || spacing.md,
        paddingTop: spacing.sm,
        paddingHorizontal: spacing.md,
        ...shadows.lg,
        // Subtle top border
        borderTopWidth: 1,
        borderTopColor: colors.ui.divider,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {TABS.map((tab, index) => {
          const isActive = currentTab === tab.name;
          const isCenter = tab.name === 'Write';

          if (isCenter) {
            // Center action button (write new entry)
            return (
              <Animated.View
                key={tab.name}
                style={{ transform: [{ scale: scaleValues[index] }] }}
              >
                <TouchableOpacity
                  onPress={() => handlePress(index, tab.name)}
                  activeOpacity={0.8}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: colors.heart.pink,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: -spacing.lg,
                    ...shadows.heart,
                  }}
                >
                  <Ionicons name="add" size={32} color={colors.white} />
                </TouchableOpacity>
              </Animated.View>
            );
          }

          return (
            <Animated.View
              key={tab.name}
              style={{ transform: [{ scale: scaleValues[index] }] }}
            >
              <TouchableOpacity
                onPress={() => handlePress(index, tab.name)}
                activeOpacity={0.7}
                style={{
                  alignItems: 'center',
                  paddingVertical: spacing.xs,
                  paddingHorizontal: spacing.sm,
                  minWidth: 64,
                }}
              >
                <View
                  style={{
                    padding: spacing.xs,
                    borderRadius: borderRadius.lg,
                    backgroundColor: isActive ? colors.primary.blush : 'transparent',
                  }}
                >
                  <Ionicons
                    name={isActive ? tab.iconFilled : tab.icon}
                    size={24}
                    color={isActive ? colors.primary.rose : colors.text.tertiary}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: isActive ? '600' : '400',
                    color: isActive ? colors.primary.rose : colors.text.tertiary,
                    marginTop: 2,
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

export default BottomTabBar;
