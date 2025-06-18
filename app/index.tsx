import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients } from '../constants/colors';
import { spacing, typography, borderRadius, shadows } from '../constants/styles';
import ProductCard from '../components/ProductCard';
import CustomButton from '../components/CustomButton';

// Kategoriler
const categories = [
  { id: 'rings', name: 'Yüzük', icon: '💍', color: colors.primary },
  { id: 'necklaces', name: 'Kolye', icon: '📿', color: colors.secondary },
  { id: 'bracelets', name: 'Bilezik', icon: '🥇', color: colors.accent },
  { id: 'earrings', name: 'Küpe', icon: '👂', color: colors.success },
  { id: 'chains', name: 'Zincir', icon: '⛓️', color: colors.gray },
  { id: 'coins', name: 'Altın', icon: '🪙', color: colors.primary },
];

const featuredProducts = [
  {
    id: '1',
    name: 'Zarif Altın Yüzük',
    price: '25.000 TL',
    originalPrice: '30.000 TL',
    image: '💍',
    category: 'Yüzük',
    location: 'İstanbul',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Minimal Altın Bilezik',
    price: '45.000 TL',
    originalPrice: '52.000 TL',
    image: '🥇',
    category: 'Bilezik',
    location: 'Ankara',
    rating: 5.0,
  },
  {
    id: '3',
    name: 'Sade Altın Kolye',
    price: '35.000 TL',
    image: '📿',
    category: 'Kolye',
    location: 'İzmir',
    rating: 4.8,
  },
];

const trendingProducts = [
  {
    id: '4',
    name: 'Gram Altın',
    price: '5.000 TL',
    image: '🪙',
    category: 'Altın',
    location: 'Bursa',
  },
  {
    id: '5',
    name: 'Altın Set',
    price: '75.000 TL',
    image: '💎',
    category: 'Set',
    location: 'İstanbul',
  },
  {
    id: '6',
    name: 'Altın Küpe',
    price: '15.000 TL',
    image: '👂',
    category: 'Küpe',
    location: 'Ankara',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoggedIn] = useState(false);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleProductPress = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const handleContactPress = () => {
    router.push('/chat');
  };

  const handleFavoritePress = (productId: string) => {
    console.log('Toggle favorite:', productId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Tedarik Ağı</Text>
            <Text style={styles.headerSubtitle}>Modern B2B Platform</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/cart')}>
              <Ionicons name="cart-outline" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/profile')}>
              <Ionicons name="person-circle-outline" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Altın Koleksiyonları</Text>
            <Text style={styles.heroSubtitle}>
              Sektörün en zarif ve modern ürünleri burada
            </Text>
            <CustomButton
              title="Ürünleri Keşfet"
              onPress={() => router.push('/products')}
              variant="primary"
              size="large"
              icon="search"
              style={styles.heroButton}
            />
          </View>
          <View style={styles.heroIcon}>
            <Text style={styles.heroEmoji}>🥇</Text>
          </View>
        </View>

        {/* Kategoriler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && { backgroundColor: category.color }
                ]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category.id && { color: colors.text.inverse }
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Öne Çıkan Ürünler */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Öne Çıkan Ürünler</Text>
            <TouchableOpacity onPress={() => router.push('/products')}>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredProducts.map((product) => (
              <View key={product.id} style={styles.featuredProductContainer}>
                <ProductCard
                  {...product}
                  onPress={() => handleProductPress(product.id)}
                  onContactPress={handleContactPress}
                  onFavoritePress={() => handleFavoritePress(product.id)}
                  variant="featured"
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Trend Ürünler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trend Ürünler</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trendingProducts.map((product) => (
              <View key={product.id} style={styles.trendingProductContainer}>
                <ProductCard
                  {...product}
                  onPress={() => handleProductPress(product.id)}
                  onContactPress={handleContactPress}
                  variant="compact"
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* İstatistikler */}
        <View style={styles.statsSection}>
          <View style={styles.statsCard}>
            <Ionicons name="people" size={32} color={colors.primary} />
            <Text style={styles.statsNumber}>1,250+</Text>
            <Text style={styles.statsLabel}>Tedarikçi</Text>
          </View>
          <View style={styles.statsCard}>
            <Ionicons name="star" size={32} color={colors.primary} />
            <Text style={styles.statsNumber}>10,000+</Text>
            <Text style={styles.statsLabel}>Ürün</Text>
          </View>
          <View style={styles.statsCard}>
            <Ionicons name="trophy" size={32} color={colors.primary} />
            <Text style={styles.statsNumber}>4.9</Text>
            <Text style={styles.statsLabel}>Müşteri Puanı</Text>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaContent}>
            {isLoggedIn ? (
              <>
                <Text style={styles.ctaTitle}>Hoş geldiniz!</Text>
                <Text style={styles.ctaSubtitle}>Profilinizi ve siparişlerinizi görüntüleyin.</Text>
                <CustomButton
                  title="Profilim"
                  onPress={() => router.push('/profile')}
                  variant="primary"
                  size="large"
                  icon="person"
                  style={styles.ctaButton}
                />
              </>
            ) : (
              <>
                <Text style={styles.ctaTitle}>Hemen Üye Olun</Text>
                <Text style={styles.ctaSubtitle}>
                  Zarif fırsatlar ve modern hizmetler için kaydolun
                </Text>
                <CustomButton
                  title="Üye Ol"
                  onPress={() => router.push('/auth/register')}
                  variant="accent"
                  size="large"
                  icon="person-add"
                  style={styles.ctaButton}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background.secondary,
    ...shadows.subtle,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.primary,
  },
  headerSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.card,
  },
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    backgroundColor: colors.background.secondary,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.soft,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: typography.sizes.display,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  heroButton: {
    marginTop: spacing.md,
    minWidth: 180,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.lg,
  },
  heroEmoji: {
    fontSize: 40,
  },
  section: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  seeAllText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  categoryCard: {
    width: '30%',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.subtle,
    borderWidth: 1,
    borderColor: colors.border.light,
    marginBottom: spacing.md,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  categoryName: {
    fontSize: typography.sizes.sm,
    color: colors.text.primary,
    textAlign: 'center',
  },
  featuredProductContainer: {
    width: 280,
    marginRight: spacing.lg,
  },
  trendingProductContainer: {
    width: 220,
    marginRight: spacing.lg,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    backgroundColor: colors.background.secondary,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.soft,
  },
  statsCard: {
    alignItems: 'center',
    flex: 1,
  },
  statsNumber: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.primary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  statsLabel: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  ctaSection: {
    backgroundColor: colors.background.card,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
    borderRadius: borderRadius.lg,
    padding: spacing.xxl,
    ...shadows.soft,
  },
  ctaContent: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  ctaButton: {
    minWidth: 180,
  },
}); 