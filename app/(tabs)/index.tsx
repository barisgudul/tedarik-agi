// app/(tabs)/index.tsx - KESİN 1 BÜYÜK, 2 KÜÇÜK DÜZENİ
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BannerCarousel from '../../components/BannerCarousel';
import ProductCard from '../../components/ProductCard';
import { products as allProducts } from '../../data/sampleProducts';
import { Product } from '../../types';
import { useRouter } from 'expo-router';
import { useFilterStore } from '../../store/filterStore';
import { spacing, colors, typography } from '../../constants/styles';

// Veri tipi: Ya tek bir ürün (büyük satır) ya da iki ürün (küçük satır)
type ProductRow = Product[];

export default function Home() {
  const router = useRouter();
  const selectedCategory = useFilterStore((state) => state.selectedCategory);

  // Filtrelenmiş ürünleri al
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return allProducts;
    return allProducts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Ürünleri [ [büyük_1], [küçük_1, küçük_2], [büyük_2], [küçük_3, küçük_4], ... ] formatına dönüştür
  const productRows = useMemo(() => {
    const rows: ProductRow[] = [];
    let i = 0;
    while (i < filteredProducts.length) {
      // Büyük satır (tek eleman)
      if (filteredProducts[i]) {
        rows.push([filteredProducts[i]]);
        i++;
      }
      // Küçük satır (iki eleman)
      if (filteredProducts[i]) {
        const smallRow: Product[] = [filteredProducts[i]];
        i++;
        if (filteredProducts[i]) {
          smallRow.push(filteredProducts[i]);
          i++;
        }
        rows.push(smallRow);
      }
    }
    return rows;
  }, [filteredProducts]);

  const renderRow = ({ item }: { item: ProductRow }) => {
    // Eğer satırda tek bir ürün varsa, bu bizim "büyük" satırımızdır.
    if (item.length === 1) {
      const product = item[0];
      return (
        <View style={styles.rowWrapper}>
          <ProductCard product={product} variant="featured" onPress={() => router.push(`/product/${product.id}`)} />
        </View>
      );
    }

    // Eğer satırda iki ürün varsa, bu bizim "küçük" satırımızdır.
    if (item.length > 1) {
      return (
        <View style={[styles.rowWrapper, styles.smallRowContainer]}>
          <View style={styles.smallCardWrapper}>
            <ProductCard product={item[0]} variant="default" onPress={() => router.push(`/product/${item[0].id}`)} />
          </View>
          <View style={styles.smallCardWrapper}>
            {/* Eğer tek ürün kaldıysa boşluk render etme */}
            {item[1] && <ProductCard product={item[1]} variant="default" onPress={() => router.push(`/product/${item[1].id}`)} />}
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={() => (
        <>
          <BannerCarousel />
          <View style={styles.collectionHeader}>
            <Text style={styles.collectionTitle}>Yeni Sezon Koleksiyonu</Text>
            <Text style={styles.collectionSubtitle}>Özenle seçilmiş parçaları keşfedin.</Text>
          </View>
        </>
      )}
      data={productRows}
      renderItem={renderRow}
      keyExtractor={(item, index) => `row-${index}-${item[0].id}`}
      ListEmptyComponent={<Text style={styles.emptyText}>Bu kategoride ürün bulunamadı.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.DEFAULT,
  },
  collectionHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  collectionTitle: { ...typography.h2, color: colors.text.primary },
  collectionSubtitle: { ...typography.body, color: colors.text.secondary },
  rowWrapper: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  smallRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCardWrapper: {
    width: '48.5%', // Arada %3'lük bir boşluk bırakır
  },
  emptyText: {
    ...typography.body,
    textAlign: 'center',
    marginTop: spacing.xxl,
    color: colors.text.secondary,
  },
});
