import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { spacing, typography, borderRadius, shadows } from '../constants/styles';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  location: string;
  rating?: number;
  isFavorite?: boolean;
  onPress: () => void;
  onFavoritePress?: () => void;
  onContactPress?: () => void;
  variant?: 'default' | 'compact' | 'featured';
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  location,
  rating = 0,
  isFavorite = false,
  onPress,
  onFavoritePress,
  onContactPress,
  variant = 'default',
}: ProductCardProps) {
  const hasDiscount = originalPrice && originalPrice !== price;
  const discountPercentage = hasDiscount 
    ? Math.round(((parseFloat(originalPrice.replace(/[^0-9]/g, '')) - parseFloat(price.replace(/[^0-9]/g, ''))) / parseFloat(originalPrice.replace(/[^0-9]/g, ''))) * 100)
    : 0;

  const renderCard = () => {
    switch (variant) {
      case 'compact':
        return (
          <TouchableOpacity style={styles.compactCard} onPress={onPress}>
            <Text style={styles.compactImage}>{image}</Text>
            <View style={styles.compactContent}>
              <Text style={styles.compactName} numberOfLines={1}>{name}</Text>
              <Text style={styles.compactPrice}>{price}</Text>
              <Text style={styles.compactCategory}>{category}</Text>
            </View>
          </TouchableOpacity>
        );
      
      case 'featured':
        return (
          <TouchableOpacity style={styles.featuredCard} onPress={onPress}>
            {hasDiscount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>%{discountPercentage}</Text>
              </View>
            )}
            <Text style={styles.featuredImage}>{image}</Text>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredName} numberOfLines={2}>{name}</Text>
              <View style={styles.featuredPriceContainer}>
                <Text style={styles.featuredPrice}>{price}</Text>
                {hasDiscount && (
                  <Text style={styles.featuredOriginalPrice}>{originalPrice}</Text>
                )}
              </View>
              <View style={styles.featuredMeta}>
                <Text style={styles.featuredCategory}>{category}</Text>
                <Text style={styles.featuredLocation}>📍 {location}</Text>
              </View>
              {rating > 0 && (
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color={colors.gold.primary} />
                  <Text style={styles.ratingText}>{rating}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      
      default:
        return (
          <TouchableOpacity style={styles.card} onPress={onPress}>
            {hasDiscount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>%{discountPercentage}</Text>
              </View>
            )}
            <Text style={styles.image}>{image}</Text>
            <View style={styles.content}>
              <Text style={styles.name} numberOfLines={2}>{name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{price}</Text>
                {hasDiscount && (
                  <Text style={styles.originalPrice}>{originalPrice}</Text>
                )}
              </View>
              <Text style={styles.category}>{category}</Text>
              <Text style={styles.location}>📍 {location}</Text>
              {rating > 0 && (
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color={colors.gold.primary} />
                  <Text style={styles.ratingText}>{rating}</Text>
                </View>
              )}
              <TouchableOpacity style={styles.contactButton} onPress={onContactPress}>
                <Text style={styles.contactButtonText}>İletişim</Text>
              </TouchableOpacity>
            </View>
            {onFavoritePress && (
              <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
                <Ionicons 
                  name={isFavorite ? "heart" : "heart-outline"} 
                  size={20} 
                  color={isFavorite ? colors.error : colors.text.tertiary} 
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        );
    }
  };

  return renderCard();
}

const styles = StyleSheet.create({
  // Default Card
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.md,
    position: 'relative',
  },
  image: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: typography.sizes.md,
    fontWeight: '600' as const,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: typography.sizes.lg,
    fontWeight: '700' as const,
    color: colors.gold.primary,
    marginRight: spacing.xs,
  },
  originalPrice: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  category: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  location: {
    fontSize: typography.sizes.xs,
    color: colors.text.tertiary,
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  ratingText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  contactButton: {
    backgroundColor: colors.gold.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  contactButtonText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.sm,
    fontWeight: '600' as const,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.full,
    padding: spacing.xs,
    ...shadows.sm,
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    zIndex: 1,
  },
  discountText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.xs,
    fontWeight: '700' as const,
  },

  // Compact Card
  compactCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginRight: spacing.sm,
    width: 120,
    ...shadows.sm,
  },
  compactImage: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  compactContent: {
    flex: 1,
  },
  compactName: {
    fontSize: typography.sizes.sm,
    fontWeight: '600' as const,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  compactPrice: {
    fontSize: typography.sizes.md,
    fontWeight: '700' as const,
    color: colors.gold.primary,
    marginBottom: spacing.xs,
  },
  compactCategory: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
  },

  // Featured Card
  featuredCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.lg,
    position: 'relative',
  },
  featuredImage: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  featuredContent: {
    flex: 1,
  },
  featuredName: {
    fontSize: typography.sizes.lg,
    fontWeight: '700' as const,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  featuredPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featuredPrice: {
    fontSize: typography.sizes.xl,
    fontWeight: '700' as const,
    color: colors.gold.primary,
    marginRight: spacing.sm,
  },
  featuredOriginalPrice: {
    fontSize: typography.sizes.md,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  featuredMeta: {
    marginBottom: spacing.sm,
  },
  featuredCategory: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  featuredLocation: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
  },
});
