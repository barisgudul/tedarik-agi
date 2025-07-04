import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable, Platform, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFilterStore } from '../store/filterStore';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const categories = [
    { name: 'Pırlanta', icon: 'diamond-outline' },
    { name: 'Açık Taşlar', icon: 'cube-outline' },
    { name: 'Mücevher', icon: 'key-outline' },
    { name: 'Renkli Taş', icon: 'color-palette-outline' },
    { name: 'Ziynet', icon: 'server-outline' },
    { name: 'Metaller', icon: 'grid-outline' },
    { name: 'Alyans', icon: 'heart-circle-outline' },
    { name: 'Bilezik', icon: 'watch-outline' },
    { name: 'Hurda', icon: 'trash-bin-outline' },
    { name: 'Saat', icon: 'time-outline' },
];

interface OverlayMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function OverlayMenu({ isVisible, onClose }: OverlayMenuProps) {
  const router = useRouter();
  const setSelectedCategory = useFilterStore((state) => state.setSelectedCategory);
  
  // 0: Kapalı, 1: Açık. Animasyonları yönetmek için daha esnek.
  const progress = useSharedValue(0);

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      pointerEvents: progress.value > 0 ? 'auto' : 'none',
    };
  });

  const menuAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [-320, 0], Extrapolate.CLAMP);
    return {
      transform: [{ translateX }],
    };
  });

  useEffect(() => {
    progress.value = withTiming(isVisible ? 1 : 0, { duration: 350 });
  }, [isVisible]);

  const handleCategoryPress = (categoryName: string) => {
    setSelectedCategory(categoryName);
    onClose(); 
  };
  
  return (
    <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
      {/* Arka planı buğulu hale getiren BlurView */}
      {Platform.OS === 'ios' && (
        <BlurView style={StyleSheet.absoluteFill} blurType="dark" blurAmount={5} />
      )}

      {/* Dışarıya tıklanınca kapatma işlevi */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      
      <Animated.View style={[styles.menuContainer, menuAnimatedStyle]}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.menuHeader}>
            <Text style={styles.headerTitle}>Fastkart.</Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleCategoryPress('all')}>
                <Ionicons name="grid-outline" size={24} color="#EAEAEA" />
                <Text style={styles.menuItemText}>Tüm Ürünler</Text>
            </TouchableOpacity>
            
            {categories.map((category) => (
              <TouchableOpacity key={category.name} style={styles.menuItem} onPress={() => handleCategoryPress(category.name)}>
                <Ionicons name={category.icon as any} size={24} color="#EAEAEA" />
                <Text style={styles.menuItemText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
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
    paddingVertical: 30, 
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
