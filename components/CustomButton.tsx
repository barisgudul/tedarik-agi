import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { spacing, typography, borderRadius, shadows } from '../constants/styles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}: CustomButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.lg,
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingVertical = spacing.sm;
        baseStyle.paddingHorizontal = spacing.lg;
        break;
      case 'large':
        baseStyle.paddingVertical = spacing.xl;
        baseStyle.paddingHorizontal = spacing.xxl;
        break;
      default:
        baseStyle.paddingVertical = spacing.md;
        baseStyle.paddingHorizontal = spacing.xl;
    }

    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = colors.primary;
        baseStyle.borderWidth = 0;
        Object.assign(baseStyle, shadows.soft);
        break;
      case 'secondary':
        baseStyle.backgroundColor = colors.background.secondary;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.primary;
        Object.assign(baseStyle, shadows.subtle);
        break;
      case 'accent':
        baseStyle.backgroundColor = colors.accent;
        baseStyle.borderWidth = 0;
        Object.assign(baseStyle, shadows.soft);
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 0;
        break;
    }

    // Disabled state
    if (disabled) {
      baseStyle.backgroundColor = colors.gray;
      baseStyle.opacity = 0.6;
      baseStyle.shadowOpacity = 0;
      baseStyle.elevation = 0;
    }

    return { ...baseStyle, ...style };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: typography.sizes.md,
      fontWeight: '600' as const,
      textAlign: 'center',
    };

    // Variant text colors
    switch (variant) {
      case 'primary':
      case 'accent':
        baseStyle.color = colors.text.inverse;
        break;
      case 'secondary':
        baseStyle.color = colors.primary;
        break;
      case 'ghost':
        baseStyle.color = colors.text.primary;
        break;
    }

    // Size text adjustments
    switch (size) {
      case 'small':
        baseStyle.fontSize = typography.sizes.sm;
        break;
      case 'large':
        baseStyle.fontSize = typography.sizes.lg;
        break;
    }

    // Disabled state
    if (disabled) {
      baseStyle.color = colors.text.tertiary;
    }

    return { ...baseStyle, ...textStyle };
  };

  const renderIcon = () => {
    if (!icon || loading) return null;

    let iconColor = colors.text.inverse;
    if (variant === 'secondary' || variant === 'ghost') {
      iconColor = colors.primary;
    }
    if (disabled) {
      iconColor = colors.text.tertiary;
    }
    const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
    return (
      <Ionicons
        name={icon}
        size={iconSize}
        color={iconColor}
        style={{
          marginRight: iconPosition === 'left' ? spacing.xs : 0,
          marginLeft: iconPosition === 'right' ? spacing.xs : 0,
        }}
      />
    );
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'secondary' || variant === 'ghost' ? colors.primary : colors.text.inverse}
        />
      ) : (
        <>
          {iconPosition === 'left' && renderIcon()}
          <Text style={getTextStyle()}>{title}</Text>
          {iconPosition === 'right' && renderIcon()}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
