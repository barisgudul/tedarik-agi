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
import { colors } from '../constants/colors';
import { spacing, typography, borderRadius, shadows, layout } from '../constants/styles';
import ProductCard from '../components/ProductCard';
import CustomButton from '../components/CustomButton';

// Altın sektörü için özel veriler
const goldCategories = [
  { id: 'rings', name: 'Yüzük', icon: '💍', color: colors.gold.primary },
  { id: 'necklaces', name: 'Kolye', icon: '📿', color: colors.gold.secondary },
  { id: 'bracelets', name: 'Bilezik', icon: '🥇', color: colors.gold.dark },
  { id: 'earrings', name: 'Küpe', icon: '👂', color: colors.gold.accent },
  { id: 'chains', name: 'Zincir', icon: '⛓️', color: colors.gold.light },
  { id: 'coins', name: 'Altın', icon: '🪙', color: colors.gold.primary },
];

const featuredProducts = [
  {
    id: '1',
    name: '22 Ayar Altın Yüzük',
    price: '15.000 TL',
    originalPrice: '18.000 TL',
    image: '💍',
    category: 'Yüzük',
    location: 'İstanbul',
    rating: 4.8,
  },
  {
    id: '2',
    name: '24 Ayar Altın Bilezik',
    price: '25.000 TL',
    originalPrice: '28.000 TL',
    image: '🥇',
    category: 'Bilezik',
    location: 'Ankara',
    rating: 4.9,
  },
  {
    id: '3',
    name: '18 Ayar Altın Kolye',
    price: '12.000 TL',
    image: '📿',
    category: 'Kolye',
    location: 'İzmir',
    rating: 4.7,
  },
];

const trendingProducts = [
  {
    id: '4',
    name: 'Gram Altın',
    price: '2.500 TL',
    image: '🪙',
    category: 'Altın',
    location: 'Bursa',
  },
  {
    id: '5',
    name: 'Altın Set',
    price: '35.000 TL',
    image: '💎',
    category: 'Set',
    location: 'İstanbul',
  },
  {
    id: '6',
    name: 'Altın Küpe',
    price: '8.500 TL',
    image: '👂',
    category: 'Küpe',
    location: 'Ankara',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');

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
            <Text style={styles.headerSubtitle}>Altın Sektörü</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Ionicons name="person-circle-outline" size={32} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Altın Alım Satım</Text>
            <Text style={styles.heroSubtitle}>
              Güvenilir tedarikçilerden kaliteli altın ürünleri
            </Text>
            <CustomButton
              title="Ürünleri Keşfet"
              onPress={() => router.push('/products')}
              variant="gold"
              size="large"
              icon="search"
              style={styles.heroButton}
            />
          </View>
          <View style={styles.heroIcon}>
            <Text style={styles.heroEmoji}>🥇</Text>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <View style={styles.categoriesGrid}>
            {goldCategories.map((category) => (
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

        {/* Featured Products */}
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

        {/* Trending Products */}
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

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/live')}>
              <View style={[styles.actionIcon, { backgroundColor: colors.error }]}>
                <Ionicons name="radio-outline" size={24} color={colors.text.inverse} />
              </View>
              <Text style={styles.actionText}>Canlı Satış</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/chat')}>
              <View style={[styles.actionIcon, { backgroundColor: colors.secondary }]}>
                <Ionicons name="chatbubbles-outline" size={24} color={colors.text.inverse} />
              </View>
              <Text style={styles.actionText}>Mesajlar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/cart')}>
              <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
                <Ionicons name="cart-outline" size={24} color={colors.text.inverse} />
              </View>
              <Text style={styles.actionText}>Sepetim</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Ürün</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Tedarikçi</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1000+</Text>
            <Text style={styles.statLabel}>Müşteri</Text>
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
    ...layout.spaceBetween,
    padding: spacing.lg,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: '700' as const,
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.gold.primary,
    fontWeight: '600' as const,
  },
  heroSection: {
    backgroundColor: colors.gold.light,
    padding: spacing.xl,
    margin: spacing.lg,
    borderRadius: borderRadius.xl,
    ...layout.row,
    ...shadows.lg,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: typography.sizes.xxxl,
    fontWeight: '700' as const,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  heroButton: {
    alignSelf: 'flex-start',
  },
  heroIcon: {
    ...layout.center,
    width: 80,
    height: 80,
  },
  heroEmoji: {
    fontSize: 60,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    ...layout.spaceBetween,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '600' as const,
    color: colors.text.primary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: typography.sizes.md,
    fontWeight: '600' as const,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryCard: {
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    width: '30%',
    aspectRatio: 1,
    ...shadows.sm,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  categoryName: {
    fontSize: typography.sizes.sm,
    fontWeight: '600' as const,
    color: colors.text.primary,
    textAlign: 'center',
  },
  featuredProductContainer: {
    paddingHorizontal: spacing.sm,
    width: 280,
  },
  trendingProductContainer: {
    paddingHorizontal: spacing.sm,
  },
  quickActions: {
    ...layout.spaceAround,
    paddingHorizontal: spacing.lg,
  },
  actionCard: {
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.full,
    ...layout.center,
    marginBottom: spacing.sm,
  },
  actionText: {
    fontSize: typography.sizes.sm,
    fontWeight: '600' as const,
    color: colors.text.primary,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    backgroundColor: colors.background.secondary,
    margin: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: typography.sizes.xxl,
    fontWeight: '700' as const,
    color: colors.gold.primary,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
}); 