/**
 * Love Diary - Avatar Components
 * Couple avatars and profile pictures
 */

import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface AvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: AvatarSize;
  showBorder?: boolean;
  borderColor?: string;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'md',
  showBorder = false,
  borderColor,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, layout, borderRadius } = theme;

  const avatarSize = layout.avatarSize[size];

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const containerStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    overflow: 'hidden',
    ...(showBorder && {
      borderWidth: size === 'xs' || size === 'sm' ? 2 : 3,
      borderColor: borderColor || colors.primary.rose,
    }),
    ...style,
  };

  if (source) {
    return (
      <View style={containerStyle}>
        <Image
          source={source}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      </View>
    );
  }

  // Fallback to initials or icon
  return (
    <LinearGradient
      colors={[colors.primary.roseLight, colors.primary.rose]}
      style={[containerStyle, { alignItems: 'center', justifyContent: 'center' }]}
    >
      {name ? (
        <Text
          style={{
            color: colors.white,
            fontSize: avatarSize * 0.4,
            fontWeight: '600',
          }}
        >
          {getInitials(name)}
        </Text>
      ) : (
        <Ionicons
          name="person"
          size={avatarSize * 0.5}
          color={colors.white}
        />
      )}
    </LinearGradient>
  );
};

// Couple Avatar - Shows both partners
interface CoupleAvatarProps {
  partner1?: {
    source?: ImageSourcePropType;
    name?: string;
  };
  partner2?: {
    source?: ImageSourcePropType;
    name?: string;
  };
  size?: AvatarSize;
  style?: ViewStyle;
}

export const CoupleAvatar: React.FC<CoupleAvatarProps> = ({
  partner1,
  partner2,
  size = 'md',
  style,
}) => {
  const { theme } = useTheme();
  const { colors, layout } = theme;

  const avatarSize = layout.avatarSize[size];
  const overlapOffset = avatarSize * 0.3;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          width: avatarSize * 2 - overlapOffset,
          height: avatarSize,
        },
        style,
      ]}
    >
      <Avatar
        source={partner1?.source}
        name={partner1?.name}
        size={size}
        showBorder
        borderColor={colors.white}
        style={{ zIndex: 2 }}
      />
      <Avatar
        source={partner2?.source}
        name={partner2?.name}
        size={size}
        showBorder
        borderColor={colors.white}
        style={{ marginLeft: -overlapOffset, zIndex: 1 }}
      />
      {/* Heart connector */}
      <View
        style={{
          position: 'absolute',
          bottom: -4,
          left: avatarSize - overlapOffset / 2 - 10,
          backgroundColor: colors.white,
          borderRadius: 10,
          padding: 2,
        }}
      >
        <Ionicons
          name="heart"
          size={size === 'xs' || size === 'sm' ? 12 : 16}
          color={colors.heart.pink}
        />
      </View>
    </View>
  );
};

// Avatar with status indicator
interface StatusAvatarProps extends AvatarProps {
  isOnline?: boolean;
  showHeart?: boolean;
}

export const StatusAvatar: React.FC<StatusAvatarProps> = ({
  isOnline,
  showHeart,
  ...avatarProps
}) => {
  const { theme } = useTheme();
  const { colors, layout } = theme;

  const avatarSize = layout.avatarSize[avatarProps.size || 'md'];
  const indicatorSize = avatarSize * 0.25;

  return (
    <View style={{ position: 'relative' }}>
      <Avatar {...avatarProps} />
      {isOnline !== undefined && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: indicatorSize,
            height: indicatorSize,
            borderRadius: indicatorSize / 2,
            backgroundColor: isOnline ? colors.ui.success : colors.text.light,
            borderWidth: 2,
            borderColor: colors.white,
          }}
        />
      )}
      {showHeart && (
        <View
          style={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            backgroundColor: colors.white,
            borderRadius: 10,
            padding: 2,
          }}
        >
          <Ionicons name="heart" size={14} color={colors.heart.pink} />
        </View>
      )}
    </View>
  );
};

export default Avatar;
