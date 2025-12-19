/**
 * Love Diary - Input Components
 * Soft, inviting input fields
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  variant?: 'default' | 'outlined' | 'filled';
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  variant = 'default',
  ...props
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, layout, textStyles } = theme;
  const [isFocused, setIsFocused] = useState(false);

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: error
            ? colors.ui.error
            : isFocused
            ? colors.primary.rose
            : colors.ui.border,
        };
      case 'filled':
        return {
          backgroundColor: colors.cream.base,
          borderWidth: 0,
        };
      default:
        return {
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: error
            ? colors.ui.error
            : isFocused
            ? colors.primary.rose
            : colors.ui.border,
        };
    }
  };

  return (
    <View style={[{ marginBottom: spacing.md }, containerStyle]}>
      {label && (
        <Text
          style={{
            fontSize: 13,
            fontWeight: '500',
            color: error ? colors.ui.error : colors.text.secondary,
            marginBottom: spacing.xs,
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            height: layout.inputHeight.medium,
            borderRadius: borderRadius.lg,
            paddingHorizontal: spacing.md,
          },
          getVariantStyles(),
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? colors.primary.rose : colors.text.tertiary}
            style={{ marginRight: spacing.sm }}
          />
        )}

        <TextInput
          style={[
            {
              flex: 1,
              fontSize: 15,
              color: colors.text.primary,
            },
            inputStyle,
          ]}
          placeholderTextColor={colors.text.light}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons
              name={rightIcon}
              size={20}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>
        )}
      </View>

      {(error || hint) && (
        <Text
          style={{
            fontSize: 12,
            color: error ? colors.ui.error : colors.text.tertiary,
            marginTop: spacing.xxs,
          }}
        >
          {error || hint}
        </Text>
      )}
    </View>
  );
};

// Diary Text Area
interface DiaryTextAreaProps extends TextInputProps {
  minHeight?: number;
  maxHeight?: number;
  showCharCount?: boolean;
  maxLength?: number;
}

export const DiaryTextArea: React.FC<DiaryTextAreaProps> = ({
  minHeight = 150,
  maxHeight = 400,
  showCharCount = false,
  maxLength,
  value,
  ...props
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius, fontFamilies } = theme.fonts;
  const [height, setHeight] = useState(minHeight);

  return (
    <View>
      <TextInput
        style={{
          fontFamily: 'Georgia',
          fontSize: 17,
          lineHeight: 28,
          color: theme.colors.text.primary,
          backgroundColor: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.lg,
          minHeight,
          maxHeight,
          textAlignVertical: 'top',
          borderWidth: 1,
          borderColor: theme.colors.ui.border,
        }}
        multiline
        value={value}
        maxLength={maxLength}
        placeholderTextColor={theme.colors.text.light}
        onContentSizeChange={(e) => {
          const newHeight = e.nativeEvent.contentSize.height;
          setHeight(Math.min(Math.max(newHeight, minHeight), maxHeight));
        }}
        {...props}
      />

      {showCharCount && maxLength && (
        <Text
          style={{
            fontSize: 11,
            color: theme.colors.text.tertiary,
            textAlign: 'right',
            marginTop: theme.spacing.xxs,
          }}
        >
          {value?.length || 0} / {maxLength}
        </Text>
      )}
    </View>
  );
};

// Search Input
interface SearchInputProps extends TextInputProps {
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onClear,
  ...props
}) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.cream.base,
        borderRadius: borderRadius.round,
        paddingHorizontal: spacing.md,
        height: 44,
      }}
    >
      <Ionicons
        name="search"
        size={20}
        color={colors.text.tertiary}
        style={{ marginRight: spacing.sm }}
      />
      <TextInput
        style={{
          flex: 1,
          fontSize: 15,
          color: colors.text.primary,
        }}
        placeholderTextColor={colors.text.light}
        value={value}
        {...props}
      />
      {value && value.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <Ionicons
            name="close-circle"
            size={20}
            color={colors.text.tertiary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
