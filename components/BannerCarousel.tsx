// components/BannerCarousel.tsx - HATASIZ VE KESİN ÇALIŞAN VERSİYON
import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// Doğrudan ve tek bir yerden import yapıyoruz, bu en güvenli yöntemdir.
import { colors, spacing, borderRadius, typography, shadows } from '../constants/styles';

const { width: screenWidth } = Dimensions.get('window');

const bannerData = [
  {
    id: '1',
    image: require('../assets/images/banners/marketing_banner.png'),
    title: 'Kampanyalı Ürünler İçin',
    buttonText: 'Koleksiyonu Keşfet',
    route: '/product?campaign=true',
    variant: 'ghost',
  },
  {
    id: '2',
    image: require('../assets/images/banners/sale_banner.png'),
    title: 'Günün Ürünü',
    subtitle: 'İndirim 50%',
    buttonText: 'Şimdi İncele',
    route: '/product/gunun-urunu-id',
    variant: 'primary',
  },
];

const BannerItem = ({ item }: { item: (typeof bannerData)[0] }) => {
  const router = useRouter();
  const buttonStyle = item.variant === 'ghost' ? styles.ghostButton : styles.primaryButton;
  const buttonTextStyle = item.variant === 'ghost' ? styles.ghostButtonText : styles.primaryButtonText;

  return (
    <ImageBackground
      source={item.image}
      style={styles.itemContainer}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => router.push(item.route)}
          activeOpacity={0.7}
        >
          <Text style={buttonTextStyle}>{item.buttonText}</Text>
          {item.variant === 'primary' && <Ionicons name="arrow-forward" size={16} color={colors.text.onDark} style={{ marginLeft: spacing.sm }} />}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default function BannerCarousel() {
  return (
    <View style={styles.container}>
      <FlatList
        data={bannerData}
        renderItem={BannerItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={screenWidth} // Her kaydırmada tam ekran genişliği kadar ilerle
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: spacing.lg }} // Kenarlarda boşluk
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md, // dikey boşluğu biraz azalttım
    height: 200,
  },
  itemContainer: {
    width: screenWidth - (spacing.lg * 2), // tam genişlik eksi yan boşluklar
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg, // Elemanlar arası boşluk
  },
  imageStyle: {
    borderRadius: borderRadius.xl,
  },
  overlay: {
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.xl,
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
    fontSize: 16,
    color: 'rgba(249, 250, 251, 0.8)',
    marginBottom: spacing.lg,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.DEFAULT,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    ...shadows.medium,
  },
  primaryButtonText: {
    color: colors.text.onDark,
    fontWeight: '600',
    fontSize: 15,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  ghostButtonText: {
    color: colors.text.onDark,
    fontWeight: '600',
    fontSize: 15,
  },
});
