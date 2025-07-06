// components/ProductCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Product } from '../types';
import { colors, spacing, borderRadius, shadows, typography } from '../constants/styles';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured';
  onPress: () => void;
}

export default function ProductCard({ product, variant = 'default', onPress }: ProductCardProps) {
  const isFeatured = variant === 'featured';
  const containerStyle = isFeatured ? styles.featuredCard : styles.defaultCard;
  const imageContainerStyle = isFeatured ? styles.featuredImageContainer : styles.defaultImageContainer;
  const nameStyle = isFeatured ? styles.featuredName : styles.defaultName;

  return (
    <Animated.View entering={FadeIn.duration(600)}>
      <TouchableOpacity style={containerStyle} onPress={onPress} activeOpacity={0.8}>
        <View style={imageContainerStyle}>
          <Image source={product.image} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={nameStyle} numberOfLines={2}>{product.name}</Text>
          {product.originalPrice ? (
            // Alt alta dikey görünüm
            <View style={styles.priceContainer}> 
              <Text style={styles.originalPrice}>{product.originalPrice}</Text>
              <Text style={styles.price}>{product.price}</Text>
            </View>
          ) : (
            // Tek fiyat varsa normal görünüm
            <Text style={[styles.price, {alignSelf: 'flex-start'}]}>{product.price}</Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// STİLLERİ İSTEĞİNE GÖRE YENİDEN DÜZENLEDİM
const styles = StyleSheet.create({
  // Ortak Stiller
  image: { width: '100%', height: '100%' },
  infoContainer: { 
    padding: spacing.md,
    // Kart içindeki fiyatların sola hizalı olması daha iyi durur
    alignItems: 'flex-start',
  },
  // --- Fiyat stilleri tamamen yenilendi ---
  priceContainer: {
    // Fiyatları sola hizalı tut
    alignItems: 'flex-start',
  },
  originalPrice: {
    fontSize: 22, // İSTEK: Üzeri çizili fiyat büyük
    fontWeight: '400',
    color: colors.text.primary, // Daha göze çarpıcı - ana metin rengi
    textDecorationLine: 'line-through',
    textDecorationColor: '#FF4444', // ÇİZGİNİN RENGİ kırmızı olsun
    textDecorationStyle: 'solid',
  },
  price: { 
    fontSize: 18, // İSTEK: İndirimli fiyat daha küçük
    fontWeight: 'bold',
    color: colors.primary.dark,
    marginTop: -2, // Üstteki fiyata biraz daha yakın olsun
  },

  // Default (Küçük Kart - 2'li satırda)
  defaultCard: {
    backgroundColor: colors.surface.DEFAULT,
    borderRadius: borderRadius.lg,
    ...shadows.subtle,
  },
  defaultImageContainer: {
    height: 190, // Küçük kartların resim yüksekliği
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.background.DEFAULT,
  },
  defaultName: {
    ...typography.label,
    minHeight: 36,
  },

  // Featured (Büyük Kart - tekli satırda)
  featuredCard: {
    backgroundColor: colors.surface.DEFAULT,
    borderRadius: borderRadius.xl,
    ...shadows.medium,
  },
  featuredImageContainer: {
    height: 380, // Büyük kartın resim yüksekliği, küçüğün tam 2 katı
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: colors.background.DEFAULT,
  },
  featuredName: {
    ...typography.h2,
    fontSize: 22,
    minHeight: 48,
  },
});
