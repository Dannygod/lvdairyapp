/**
 * Love Diary - Button Components
 * Soft, inviting button styles
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'heart' | 'soft';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, shadows, layout } = theme;

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: colors.primary.rose,
            ...shadows.sm,
          },
          text: { color: colors.white },
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: colors.cream.base,
            borderWidth: 1.5,
            borderColor: colors.primary.rose,
          },
          text: { color: colors.primary.rose },
        };
      case 'ghost':
        return {
          container: { backgroundColor: 'transparent' },
          text: { color: colors.primary.rose },
        };
      case 'heart':
        return {
          container: {
            backgroundColor: colors.heart.pink,
            ...shadows.heart,
          },
          text: { color: colors.white },
        };
      case 'soft':
        return {
          container: {
            backgroundColor: colors.primary.blush,
          },
          text: { color: colors.primary.roseDark },
        };
      default:
        return {
          container: { backgroundColor: colors.primary.rose },
          text: { color: colors.white },
        };
    }
  };

  const getSizeStyles = (): { container: ViewStyle; text: TextStyle; iconSize: number } => {
    switch (size) {
      case 'small':
        return {
          container: {
            height: layout.buttonHeight.small,
            paddingHorizontal: spacing.md,
          },
          text: { fontSize: 13, fontWeight: '600' },
          iconSize: 16,
        };
      case 'large':
        return {
          container: {
            height: layout.buttonHeight.large,
            paddingHorizontal: spacing.xl,
          },
          text: { fontSize: 17, fontWeight: '600' },
          iconSize: 24,
        };
      default:
        return {
          container: {
            height: layout.buttonHeight.medium,
            paddingHorizontal: spacing.lg,
          },
          text: { fontSize: 15, fontWeight: '600' },
          iconSize: 20,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.xl,
    opacity: disabled ? 0.5 : 1,
    ...sizeStyles.container,
    ...variantStyles.container,
    ...(fullWidth && { width: '100%' }),
    ...style,
  };

  const textStyleCombined: TextStyle = {
    ...sizeStyles.text,
    ...variantStyles.text,
    ...textStyle,
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.text.color} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={sizeStyles.iconSize}
              color={variantStyles.text.color}
              style={{ marginRight: spacing.xs }}
            />
          )}
          <Text style={textStyleCombined}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={sizeStyles.iconSize}
              color={variantStyles.text.color}
              style={{ marginLeft: spacing.xs }}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

// Icon Button
interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 24,
  color,
  backgroundColor,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          width: size + 16,
          height: size + 16,
          borderRadius: (size + 16) / 2,
          backgroundColor: backgroundColor || theme.colors.primary.blush,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Ionicons
        name={icon}
        size={size}
        color={color || theme.colors.primary.rose}
      />
    </TouchableOpacity>
  );
};

// Heart Button (for reactions)
interface HeartButtonProps {
  filled?: boolean;
  onPress: () => void;
  size?: number;
  animated?: boolean;
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  filled = false,
  onPress,
  size = 28,
  animated = true,
}) => {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = React.useState(filled);

  const handlePress = () => {
    setIsPressed(!isPressed);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{
        padding: 8,
      }}
    >
      <Ionicons
        name={isPressed ? 'heart' : 'heart-outline'}
        size={size}
        color={isPressed ? theme.colors.heart.pink : theme.colors.text.tertiary}
      />
    </TouchableOpacity>
  );
};

export default Button;
