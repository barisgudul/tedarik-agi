// app/(tabs)/menu.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFilterStore } from '../../store/filterStore';

const categories = [
  { name: 'Elektronik', icon: 'phone-portrait-outline' },
  { name: 'Giyim', icon: 'shirt-outline' },
  { name: 'Ev & Yaşam', icon: 'home-outline' },
  { name: 'Spor', icon: 'bicycle-outline' },
  { name: 'Kozmetik', icon: 'rose-outline' },
  { name: 'Kitap', icon: 'book-outline' },
  { name: 'Oyuncak', icon: 'game-controller-outline' },
];

export default function MenuScreen() {
  const router = useRouter();
  const setSelectedCategory = useFilterStore((state) => state.setSelectedCategory);

  const handleCategoryPress = (categoryName: string) => {
    setSelectedCategory(categoryName);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kategoriler</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={32} color="#333" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleCategoryPress('all')}>
            <Ionicons name="grid-outline" size={22} color="#555" />
            <Text style={styles.menuItemText}>Tüm Ürünler</Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.name} 
            style={styles.menuItem}
            onPress={() => handleCategoryPress(category.name)}
          >
            <Ionicons name={category.icon as any} size={22} color="#555" />
            <Text style={styles.menuItemText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
    headerTitle: { fontSize: 24, fontWeight: 'bold' },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 20 },
    menuItemText: { marginLeft: 15, fontSize: 18, fontWeight: '500', color: '#333' },
});
