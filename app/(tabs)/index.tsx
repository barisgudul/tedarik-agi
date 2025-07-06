// app/(tabs)/index.tsx
import React, { useMemo, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

// Bileşenleri ve verileri import et
import BannerCarousel from '../../components/BannerCarousel';
import ProductCard from '../../components/ProductCard';
import { StarRating } from '../../components/StarRating'; // StarRating bileşenini import et
import { products as allProducts, sellers as allSellers } from '../../data/sampleProducts';
import { Product, Seller } from '../../types';
import { useFilterStore } from '../../store/filterStore';
import { spacing, colors, typography, borderRadius, shadows } from '../../constants/styles';
import { LinearGradient } from 'expo-linear-gradient';

// --- YENİ BİLGİLENDİRİCİ VE ŞIK SATICI KARTI ---
const StylishSellerCard = ({ seller, onPress, index }: { seller: Seller; onPress: () => void; index: number; }) => {
  return (
    <Animated.View entering={FadeInUp.delay(100 * index).duration(600)}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <ImageBackground
          source={seller.coverImage}
          style={sellerStyles.card}
          imageStyle={sellerStyles.cardImage}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.9)']} // Gradyanı daha belirgin yaptık
            style={sellerStyles.gradient}
          />
          <View style={sellerStyles.cardContent}>
            <Image source={seller.logo} style={sellerStyles.logo} />
            <View style={sellerStyles.textContainer}>
              <Text style={sellerStyles.sellerName}>{seller.name}</Text>
              {/* Puan ve Yorum Bilgisi */}
              <View style={sellerStyles.statsContainer}>
                <StarRating rating={seller.rating} size={16} />
                <Text style={sellerStyles.statsText}>{seller.rating.toFixed(1)}</Text>
                <Text style={sellerStyles.statsTextMuted}>({seller.reviews} yorum)</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Veri tipi
type ProductRow = Product[];

export default function Home() {
  const router = useRouter();
  const listRef = useRef<FlatList>(null);
  
  const showProducts = useFilterStore((state) => state.showProducts);
  const viewMode = useFilterStore((state) => state.viewMode);
  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  
  // --- YUMUŞAK GEÇİŞ ANİMASYONU İÇİN PAYLAŞILAN DEĞER ---
  const listOpacity = useSharedValue(1);

  const animatedListStyle = useAnimatedStyle(() => {
    return {
      opacity: listOpacity.value,
    };
  });
  
  // --- FİLTRELEME İŞLEMİ VE GEÇİŞ KOREOGRAFİSİ ---
  const handleFilterChange = useCallback((newCategory: string) => {
    // 1. Listenin opaklığını yumuşak bir şekilde sıfıra indir
    listOpacity.value = withTiming(0, { duration: 200 });

    // 2. Liste en üste kaydırılsın
    listRef.current?.scrollToOffset({ offset: 0, animated: true });

    // 3. Kısa bir gecikmenin ardından (animasyonun bitmesine yakın) state'i güncelle
    setTimeout(() => {
      showProducts(newCategory);
      // 4. State güncellendikten ve yeni içerik hazırlandıktan sonra opaklığı geri getir
      listOpacity.value = withTiming(1, { duration: 300 });
    }, 250); // Bu süre, opacity animasyonu + scroll animasyonu için zaman tanır
  }, [showProducts, listOpacity]);

  // --- OPTİMUM SATICI SIRALAMASI ---
  const sortedSellers = useMemo(() => {
    const BASE_RATING = 4.0; // Minimum kabul edilebilir puan
    return [...allSellers].sort((a, b) => {
      const scoreA = (a.rating - BASE_RATING) * Math.log(a.reviews + 1);
      const scoreB = (b.rating - BASE_RATING) * Math.log(b.reviews + 1);
      return scoreB - scoreA; // Yüksek skorlu olan önce gelsin
    });
  }, []); // Sadece bir kere hesaplanacak

  // Ürünleri filtrele
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return allProducts;
    return allProducts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Ürünleri 1-2-1-2 düzenine sok
  const productRows = useMemo(() => {
    const rows: ProductRow[] = [];
    let i = 0;
    while (i < filteredProducts.length) {
      if (filteredProducts[i]) { rows.push([filteredProducts[i]]); i++; }
      if (filteredProducts[i]) {
        const smallRow: Product[] = [filteredProducts[i]]; i++;
        if (filteredProducts[i]) { smallRow.push(filteredProducts[i]); i++; }
        rows.push(smallRow);
      }
    }
    return rows;
  }, [filteredProducts]);

  // --- RENDER FONKSİYONLARI ---
  const renderProductRow = ({ item }: { item: ProductRow }) => {
    if (item.length === 1) {
      const product = item[0];
      return (
        <View style={styles.rowWrapper}>
          <ProductCard product={product} variant="featured" onPress={() => router.push(`/product/${product.id}`)} />
        </View>
      );
    }
    if (item.length > 1) {
      return (
        <View style={[styles.rowWrapper, styles.smallRowContainer]}>
          <View style={styles.smallCardWrapper}>
            <ProductCard product={item[0]} variant="default" onPress={() => router.push(`/product/${item[0].id}`)} />
          </View>
          <View style={styles.smallCardWrapper}>
            {item[1] && <ProductCard product={item[1]} variant="default" onPress={() => router.push(`/product/${item[1].id}`)} />}
          </View>
        </View>
      );
    }
    return null;
  };

  const renderSellerRow = ({ item, index }: { item: Seller, index: number }) => {
    return (
      <View style={styles.rowWrapper}>
        <StylishSellerCard seller={item} index={index} onPress={() => router.push(`/seller/${item.id}`)} />
      </View>
    );
  };

  // ANA RENDER FONKSİYONU
  // Buradaki FlatList'e ref ve animasyonlu stili ekliyoruz.
  const renderList = (data: any, renderItem: any) => (
    <Animated.View style={[styles.listContainer, animatedListStyle]}>
        <FlatList
          ref={listRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => viewMode === 'sellers' ? item.id : `row-${index}-${item[0].id}`}
          ListHeaderComponent={() => (
            viewMode === 'sellers' ? (
              <View style={styles.collectionHeader}>
                <Text style={styles.collectionTitle}>Öne Çıkan Satıcılar</Text>
                <Text style={styles.collectionSubtitle}>Kullanıcılarımızın favorilerini keşfedin.</Text>
              </View>
            ) : (
              <>
                {/* BannerCarousel'a handleFilterChange fonksiyonunu prop olarak gönderiyoruz */}
                <BannerCarousel onCategorySelect={handleFilterChange} />
                <View style={styles.collectionHeader}>
                  <Text style={styles.collectionTitle}>Yeni Sezon Koleksiyonu</Text>
                  <Text style={styles.collectionSubtitle}>Özenle seçilmiş parçaları keşfedin.</Text>
                </View>
              </>
            )
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Bu kategoride ürün bulunamadı.</Text>}
        />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {viewMode === 'sellers' 
        ? renderList(sortedSellers, renderSellerRow)
        : renderList(productRows, renderProductRow)}
    </View>
  );
}

// STİL DEĞİŞİKLİKLERİ
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background.DEFAULT,
  },
  listContainer: {
    flex: 1,
  },
  collectionHeader: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.md, },
  collectionTitle: { ...typography.h2, color: colors.text.primary, },
  collectionSubtitle: { ...typography.body, color: colors.text.secondary, },
  rowWrapper: { paddingHorizontal: spacing.lg, marginBottom: spacing.lg, },
  smallRowContainer: { flexDirection: 'row', justifyContent: 'space-between', },
  smallCardWrapper: { width: '48.5%', },
  emptyText: { ...typography.body, textAlign: 'center', marginTop: spacing.xxl, color: colors.text.secondary, },
});

// GÜNCELLENMİŞ SATICI KARTI STİLLERİ
const sellerStyles = StyleSheet.create({
  card: {
    height: 220,
    borderRadius: borderRadius.xl,
    justifyContent: 'flex-end',
    ...shadows.medium,
    backgroundColor: colors.border,
  },
  cardImage: {
    borderRadius: borderRadius.xl,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: borderRadius.xl,
  },
  cardContent: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-end', // İçeriği hem alta hem sola yasla
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.9)',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
    paddingBottom: spacing.xs, // Logo ile hiza için hafif boşluk
  },
  sellerName: {
    ...typography.h2,
    fontSize: 22,
    color: colors.text.onDark,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Metne okunabilirlik için gölge
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  statsText: {
    fontSize: 14,
    color: colors.text.onDark,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  statsTextMuted: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    marginLeft: spacing.sm,
  },
  // Bu stil artık kullanılmıyor, silebilirsiniz veya bırakabilirsiniz.
  sellerMotto: {}
});