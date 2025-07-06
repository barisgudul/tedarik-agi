// components/OverlayMenu.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable, Platform, SafeAreaView } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useFilterStore } from '../store/filterStore';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

// Kategori verimiz, kütüphane bilgisini de içeriyor.
const categories = [
    { name: 'Pırlanta', icon: 'diamond-stone', library: 'MaterialCommunityIcons' },
    { name: 'Değerli Taşlar', icon: 'gem', library: 'FontAwesome5' },
    { name: 'Mücevher', icon: 'necklace', library: 'MaterialCommunityIcons' },
    { name: 'Alyans', icon: 'ring', library: 'MaterialCommunityIcons' },
    { name: 'Saat', icon: 'watch', library: 'MaterialCommunityIcons' },
    { name: 'Yatırım & Ziynet', icon: 'gold', library: 'MaterialCommunityIcons' },
];

// Farklı kütüphanelerden ikonları dinamik olarak render etmek için yardımcı bileşen.
// Bu yapıya dokunmuyoruz, gayet güzel çalışıyor.
const DynamicIcon = ({ library, name, size, color }: { library: string, name: string, size: number, color: string }) => {
    switch (library) {
        case 'MaterialCommunityIcons':
            return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
        case 'FontAwesome5':
            return <FontAwesome5 name={name as any} size={size} color={color} />;
        case 'Feather':
            return <Feather name={name as any} size={size} color={color} />;
        default:
            return <Feather name="alert-circle" size={size} color={color} />; // Fallback
    }
};

interface OverlayMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function OverlayMenu({ isVisible, onClose }: OverlayMenuProps) {
  // DİKKAT: store'dan yeni fonksiyonları alıyoruz
  const { showProducts, showSellers } = useFilterStore();
  
  // Bu kodlara artık ihtiyacımız yok
  // const router = useRouter(); 
  // const setSelectedCategory = useFilterStore((state) => state.setSelectedCategory);

  const progress = useSharedValue(0);

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: progress.value, pointerEvents: progress.value > 0 ? 'auto' : 'none' };
  });

  const menuAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [-320, 0], Extrapolate.CLAMP);
    return { transform: [{ translateX }] };
  });

  useEffect(() => {
    progress.value = withTiming(isVisible ? 1 : 0, { duration: 350 });
  }, [isVisible]);

  // Kategori seçildiğinde çalışacak fonksiyon
  const handleCategoryPress = (categoryName: string) => {
    showProducts(categoryName); // Yeni store fonksiyonunu kullan
    onClose();
  };

  // Satıcılar linkine basıldığında çalışacak fonksiyon
  const handleSellersPress = () => {
    showSellers(); // Yeni store fonksiyonunu kullan
    onClose();
  };

  return (
    <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
      {Platform.OS === 'ios' && <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      
      <Animated.View style={[styles.menuContainer, menuAnimatedStyle]}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.menuHeader}>
            <Text style={styles.headerTitle}>Fastkart.</Text>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* "Tüm Ürünler" linki artık showProducts('all') çağıracak */}
            <TouchableOpacity style={styles.menuItem} onPress={() => handleCategoryPress('all')}>
              <DynamicIcon library="Feather" name="grid" size={24} color="#EAEAEA" />
              <Text style={styles.menuItemText}>Tüm Ürünler</Text>
            </TouchableOpacity>
            
            {/* Kategori Listesi */}
            {categories.map((category) => (
              <TouchableOpacity key={category.name} style={styles.menuItem} onPress={() => handleCategoryPress(category.name)}>
                <DynamicIcon library={category.library} name={category.icon} size={24} color="#EAEAEA" />
                <Text style={styles.menuItemText}>{category.name}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.divider} />

            {/* Satıcı Profilleri linki artık showSellers() çağıracak */}
            <TouchableOpacity style={styles.menuItem} onPress={handleSellersPress}>
              <DynamicIcon library="MaterialCommunityIcons" name="storefront-outline" size={24} color="#EAEAEA" />
              <Text style={styles.menuItemText}>Satıcı Profilleri</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.menuFooter}>
            <Text style={styles.footerText}>© 2025 OrbitX</Text>
          </View>
        </SafeAreaView>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    backgroundColor: Platform.OS === 'android' ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 320,
    backgroundColor: '#1C1C1E',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 30,
  },
  menuHeader: { 
    paddingHorizontal: 25, 
    paddingTop: 45, 
    paddingBottom: 25, 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(255, 255, 255, 0.1)' 
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 18, 
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 5,
  },
  menuItemText: { 
    marginLeft: 20, 
    fontSize: 18, 
    fontWeight: '500', 
    color: '#F2F2F7',
  },
  // --- YENİ EKLENEN STİL ---
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 15,
    marginHorizontal: 25,
  },
  // ---
  menuFooter: {
    padding: 25,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});