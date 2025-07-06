import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius, typography } from '../constants/styles';

const { width: screenWidth } = Dimensions.get('window');

const HORIZONTAL_PADDING = spacing.lg;
const ITEM_WIDTH = screenWidth - (HORIZONTAL_PADDING * 2);
const ITEM_SPACING = spacing.lg;

const bannerData = [
  {
    id: '1',
    image: require('../assets/images/banners/marketing_banner.png'),
    title: 'Kampanyalı Ürünler İçin',
    buttonText: 'Koleksiyonu Keşfet',
    isCategory: true,
    categoryName: 'all', 
  },
  {
    id: '2',
    image: require('../assets/images/banners/sale_banner.png'),
    title: 'Günün Ürünü',
    subtitle: '%50\'ye Varan İndirim', // Fiyat yerine oran daha çekici
    buttonText: 'Şimdi İncele',
    isCategory: false,
    route: '/product/gunun-urunu', // Yönlendirme adresi güncellendi
  },
  {
    id: '3',
    image: require('../assets/images/banners/certified_banner.png'), 
    title: 'Geleceğinize Değer Katın',
    subtitle: 'Uluslararası sertifikalı yatırım ürünleri.',
    buttonText: 'Koleksiyonu İncele',
    isCategory: true,
    categoryName: 'Yatırım & Ziynet',
  },
];


const BannerItem = ({ item, onCategorySelect }: { 
    item: (typeof bannerData)[0];
    onCategorySelect: (category: string) => void;
}) => {
  const router = useRouter(); // router'ı burada tutabiliriz, çünkü ürün sayfasına yönlendirme yapıyor

  const handlePress = () => {
    if (item.isCategory) {
      onCategorySelect(item.categoryName as string);
    } else {
      router.push(item.route as string);
    }
  };

  return (
    <View style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
      <Image source={item.image} style={styles.backgroundImage} resizeMode="cover"/>
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
        <TouchableOpacity
          style={styles.ghostButton}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text style={styles.ghostButtonText}>{item.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


// BannerCarousel artık onCategorySelect prop'u alıyor
export default function BannerCarousel({ onCategorySelect }: { onCategorySelect: (category: string) => void }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={bannerData}
        renderItem={({ item }) => <BannerItem item={item} onCategorySelect={onCategorySelect} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
        }}
        ItemSeparatorComponent={() => <View style={{ width: ITEM_SPACING }} />}
      />
    </View>
  );
}

// Stillerde değişiklik yapmaya gerek yok.
const styles = StyleSheet.create({
    container: {
    paddingVertical: spacing.md,
    height: 200,
  },
  itemContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text.onDark,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(249, 250, 251, 0.8)',
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  ghostButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    minHeight: 45, // --- YENİ --- Yükleme ikonu geldiğinde butonun zıplamaması için
    minWidth: 150, // --- YENİ ---
    justifyContent: 'center',
    alignItems: 'center',
  },
  ghostButtonText: {
    color: colors.text.onDark,
    fontWeight: '600',
    fontSize: 15,
  },
});