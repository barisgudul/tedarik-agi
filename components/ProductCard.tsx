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
import { spacing, typography, borderRadius, shadows, commonStyles } from '../constants/styles';

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
  variant?: 'default' | 'compact' | 'featured' | 'premium';
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
            <View style={styles.compactImageContainer}>
              <Text style={styles.compactImage}>{image}</Text>
            </View>
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
            <View style={styles.featuredImageContainer}>
              <Text style={styles.featuredImage}>{image}</Text>
            </View>
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
                  <Ionicons name="star" size={14} color={colors.primary} />
                  <Text style={styles.ratingText}>{rating}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );

      case 'premium':
        return (
          <TouchableOpacity style={styles.premiumCard} onPress={onPress}>
            {hasDiscount && (
              <View style={styles.premiumDiscountBadge}>
                <Text style={styles.premiumDiscountText}>%{discountPercentage}</Text>
              </View>
            )}
            <View style={styles.premiumImageContainer}>
              <Text style={styles.premiumImage}>{image}</Text>
              {onFavoritePress && (
                <TouchableOpacity style={styles.premiumFavoriteButton} onPress={onFavoritePress}>
                  <Ionicons 
                    name={isFavorite ? "heart" : "heart-outline"} 
                    size={24} 
                    color={isFavorite ? colors.error : colors.text.inverse} 
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.premiumContent}>
              <View style={styles.premiumHeader}>
                <Text style={styles.premiumName} numberOfLines={2}>{name}</Text>
                <View style={styles.premiumPriceContainer}>
                  <Text style={styles.premiumPrice}>{price}</Text>
                  {hasDiscount && (
                    <Text style={styles.premiumOriginalPrice}>{originalPrice}</Text>
                  )}
                </View>
              </View>
              <View style={styles.premiumMeta}>
                <View style={styles.premiumCategoryContainer}>
                  <Text style={styles.premiumCategory}>{category}</Text>
                </View>
                <View style={styles.premiumLocationContainer}>
                  <Ionicons name="location" size={14} color={colors.text.tertiary} />
                  <Text style={styles.premiumLocation}>{location}</Text>
                </View>
              </View>
              {rating > 0 && (
                <View style={styles.premiumRatingContainer}>
                  <Ionicons name="star" size={16} color={colors.primary} />
                  <Text style={styles.premiumRatingText}>{rating}</Text>
                </View>
              )}
              {onContactPress && (
                <TouchableOpacity style={styles.premiumContactButton} onPress={onContactPress}>
                  <Ionicons name="chatbubble-outline" size={16} color={colors.text.inverse} />
                  <Text style={styles.premiumContactButtonText}>İletişim</Text>
                </TouchableOpacity>
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
            <View style={styles.imageContainer}>
              <Text style={styles.image}>{image}</Text>
            </View>
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
                  <Ionicons name="star" size={14} color={colors.primary} />
                  <Text style={styles.ratingText}>{rating}</Text>
                </View>
              )}
              {onContactPress && (
                <TouchableOpacity style={styles.contactButton} onPress={onContactPress}>
                  <Text style={styles.contactButtonText}>İletişim</Text>
                </TouchableOpacity>
              )}
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
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.soft,
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  imageContainer: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    backgroundColor: colors.gray,
  },
  image: {
    fontSize: 60,
    textAlign: 'center',
    padding: spacing.lg,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: typography.sizes.lg,
    fontWeight: '700' as const,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeights.tight,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  price: {
    fontSize: typography.sizes.xl,
    fontWeight: '800' as const,
    color: colors.primary,
    marginRight: spacing.sm,
  },
  originalPrice: {
    fontSize: typography.sizes.md,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
    fontWeight: '500' as const,
  },
  category: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    fontWeight: '600' as const,
  },
  location: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    marginBottom: spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ratingText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
    fontWeight: '600' as const,
  },
  contactButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.subtle,
  },
  contactButtonText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.sm,
    fontWeight: '600' as const,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.full,
    padding: spacing.xs,
    ...shadows.subtle,
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
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
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.subtle,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  compactImageContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  compactImage: {
    fontSize: 30,
    textAlign: 'center',
  },
  compactContent: {
    flex: 1,
  },
  compactName: {
    fontSize: typography.sizes.md,
    fontWeight: '600' as const,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  compactPrice: {
    fontSize: typography.sizes.lg,
    fontWeight: '700' as const,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  compactCategory: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },

  // Featured Card
  featuredCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.medium,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  featuredImageContainer: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    backgroundColor: colors.gray[100],
  },
  featuredImage: {
    fontSize: 80,
    textAlign: 'center',
    padding: spacing.xl,
  },
  featuredContent: {
    flex: 1,
  },
  featuredName: {
    fontSize: typography.sizes.xl,
    fontWeight: '800' as const,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeights.tight,
  },
  featuredPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featuredPrice: {
    fontSize: typography.sizes.xxl,
    fontWeight: '900' as const,
    color: colors.primary,
    marginRight: spacing.md,
  },
  featuredOriginalPrice: {
    fontSize: typography.sizes.lg,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
    fontWeight: '500' as const,
  },
  featuredMeta: {
    marginBottom: spacing.md,
  },
  featuredCategory: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    fontWeight: '600' as const,
  },
  featuredLocation: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
  },

  // Premium Card
  premiumCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.medium,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  premiumImageContainer: {
    position: 'relative',
    backgroundColor: colors.gray[100],
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumImage: {
    fontSize: 100,
    textAlign: 'center',
  },
  premiumFavoriteButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.full,
    padding: spacing.sm,
    ...shadows.subtle,
  },
  premiumDiscountBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    zIndex: 1,
    ...shadows.subtle,
  },
  premiumDiscountText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.sm,
    fontWeight: '800' as const,
  },
  premiumContent: {
    padding: spacing.xl,
  },
  premiumHeader: {
    marginBottom: spacing.lg,
  },
  premiumName: {
    fontSize: typography.sizes.xxl,
    fontWeight: '900' as const,
    color: colors.text.primary,
    marginBottom: spacing.md,
    lineHeight: typography.lineHeights.tight,
  },
  premiumPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumPrice: {
    fontSize: typography.sizes.xxl,
    fontWeight: '900' as const,
    color: colors.primary,
    marginRight: spacing.lg,
  },
  premiumOriginalPrice: {
    fontSize: typography.sizes.xl,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
    fontWeight: '500' as const,
  },
  premiumMeta: {
    marginBottom: spacing.lg,
  },
  premiumCategoryContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  premiumCategory: {
    fontSize: typography.sizes.sm,
    color: colors.text.inverse,
    fontWeight: '700' as const,
  },
  premiumLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumLocation: {
    fontSize: typography.sizes.md,
    color: colors.text.tertiary,
    marginLeft: spacing.xs,
  },
  premiumRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  premiumRatingText: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
    fontWeight: '600' as const,
  },
  premiumContactButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.subtle,
  },
  premiumContactButtonText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.md,
    fontWeight: '700' as const,
    marginLeft: spacing.sm,
  },
});
