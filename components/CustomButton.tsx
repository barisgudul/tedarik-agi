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
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost';
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
      borderRadius: borderRadius.md,
      ...shadows.sm,
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingVertical = spacing.sm;
        baseStyle.paddingHorizontal = spacing.md;
        break;
      case 'large':
        baseStyle.paddingVertical = spacing.lg;
        baseStyle.paddingHorizontal = spacing.xl;
        break;
      default:
        baseStyle.paddingVertical = spacing.md;
        baseStyle.paddingHorizontal = spacing.lg;
    }

    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = colors.primary;
        break;
      case 'secondary':
        baseStyle.backgroundColor = colors.secondary;
        break;
      case 'gold':
        baseStyle.backgroundColor = colors.gold.primary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.primary;
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        break;
    }

    // Disabled state
    if (disabled) {
      baseStyle.backgroundColor = colors.gray[300];
      baseStyle.opacity = 0.6;
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
      case 'secondary':
      case 'gold':
        baseStyle.color = colors.text.inverse;
        break;
      case 'outline':
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
      baseStyle.color = colors.text.disabled;
    }

    return { ...baseStyle, ...textStyle };
  };

  const renderIcon = () => {
    if (!icon || loading) return null;

    const iconColor = variant === 'outline' || variant === 'ghost' 
      ? colors.primary 
      : colors.text.inverse;

    return (
      <Ionicons 
        name={icon} 
        size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
        color={disabled ? colors.text.disabled : iconColor}
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
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.text.inverse} 
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

const styles = StyleSheet.create({
  // Additional styles can be added here if needed
});
