// app/(tabs)/cart.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from '../../constants/styles';
import { products } from '../../data/sampleProducts';

export default function CartPage() {
  // Use first two products from sampleProducts for visual-only display
  const visibleProducts = [products[0], products[1]];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sepetim</Text>
        <Text style={styles.itemCount}>{visibleProducts.length} ürün</Text>
      </View>

      <View style={styles.content}>
        {visibleProducts.map((product) => (
          <View key={product.id} style={styles.cartItem}>
            <Image source={product.image} style={styles.productImage} resizeMode="cover" />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{product.name}</Text>
              <Text style={styles.itemPrice}>{product.price} • Adet: 1</Text>
            </View>
          </View>
        ))}

        {/* Alt Butonlar */}
        <View style={styles.bottomActions}>
          <View style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Ödemeye Geç</Text>
          </View>

          <View style={styles.continueShoppingButton}>
            <Text style={styles.continueShoppingButtonText}>Alışverişe Devam Et</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.DEFAULT,
  },
  header: {
    backgroundColor: colors.surface.DEFAULT,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    ...shadows.subtle,
  },
  headerTitle: {
    ...typography.h1,
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  itemCount: {
    ...typography.body,
    color: colors.text.tertiary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface.DEFAULT,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.subtle,
  },
  productImage: {
    width: 84,
    height: 84,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  itemPrice: {
    ...typography.body,
    color: colors.primary.dark,
    fontWeight: '600',
  },
  checkoutButtonText: {
    ...typography.label,
    color: colors.text.onDark,
    fontSize: 16,
    fontWeight: '700',
  },
  continueShoppingButton: {
    width: '100%',
    backgroundColor: colors.surface.DEFAULT,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary.DEFAULT,
  },
  continueShoppingButtonText: {
    ...typography.label,
    color: colors.primary.DEFAULT,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomActions: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: spacing.md,
  },
  checkoutButton: {
    width: '100%',
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    ...shadows.subtle,
  },
});
