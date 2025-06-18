import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { spacing, typography, borderRadius, shadows } from '../constants/styles';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: (text: string) => void;
  onClear?: () => void;
  variant?: 'default' | 'glass' | 'elevated';
  size?: 'small' | 'medium' | 'large';
  showFilters?: boolean;
  onFilterPress?: () => void;
  showVoice?: boolean;
  onVoicePress?: () => void;
  disabled?: boolean;
}

export default function SearchBar({
  placeholder = 'Ürün ara...',
  value = '',
  onChangeText,
  onSearch,
  onClear,
  variant = 'default',
  size = 'medium',
  showFilters = false,
  onFilterPress,
  showVoice = false,
  onVoicePress,
  disabled = false,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (onSearch && value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    if (onChangeText) {
      onChangeText('');
    }
    if (onClear) {
      onClear();
    }
  };

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: borderRadius.lg,
      borderWidth: 2,
      borderColor: isFocused ? colors.primary : colors.border.light,
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
      case 'glass':
        baseStyle.backgroundColor = colors.background.card;
        baseStyle.borderColor = isFocused ? colors.primary : colors.border.light;
        Object.assign(baseStyle, shadows.medium);
        break;
      case 'elevated':
        baseStyle.backgroundColor = colors.background.card;
        Object.assign(baseStyle, shadows.soft);
        break;
      default:
        baseStyle.backgroundColor = colors.background.secondary;
        Object.assign(baseStyle, shadows.subtle);
    }

    // Disabled state
    if (disabled) {
      baseStyle.backgroundColor = colors.gray;
      baseStyle.borderColor = colors.border.light;
      baseStyle.opacity = 0.6;
    }

    return baseStyle;
  };

  const getInputStyle = () => {
    const baseStyle = {
      flex: 1,
      fontSize: typography.sizes.md,
      color: colors.text.primary,
      fontWeight: '500' as const,
    };

    // Size adjustments
    switch (size) {
      case 'small':
        baseStyle.fontSize = typography.sizes.sm;
        break;
      case 'large':
        baseStyle.fontSize = typography.sizes.lg;
        break;
    }

    return baseStyle;
  };

  return (
    <View style={[styles.container, getContainerStyle()]}>
      {/* Search Icon */}
      <Ionicons 
        name="search" 
        size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
        color={isFocused ? colors.primary : colors.text.tertiary}
        style={styles.searchIcon}
      />

      {/* Search Input */}
      <TextInput
        style={[styles.input, getInputStyle()]}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Voice Button */}
      {showVoice && (
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onVoicePress}
          disabled={disabled}
        >
          <Ionicons 
            name="mic" 
            size={size === 'small' ? 16 : size === 'large' ? 20 : 18} 
            color={colors.text.tertiary} 
          />
        </TouchableOpacity>
      )}

      {/* Clear Button */}
      {value.length > 0 && (
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleClear}
          disabled={disabled}
        >
          <Ionicons 
            name="close-circle" 
            size={size === 'small' ? 16 : size === 'large' ? 20 : 18} 
            color={colors.text.tertiary} 
          />
        </TouchableOpacity>
      )}

      {/* Filter Button */}
      {showFilters && (
        <TouchableOpacity 
          style={[styles.actionButton, styles.filterButton]} 
          onPress={onFilterPress}
          disabled={disabled}
        >
          <Ionicons 
            name="filter" 
            size={size === 'small' ? 16 : size === 'large' ? 20 : 18} 
            color={colors.text.tertiary} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    padding: 0,
  },
  actionButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
    borderRadius: borderRadius.full,
  },
  filterButton: {
    backgroundColor: colors.gray[100],
    padding: spacing.sm,
  },
});
