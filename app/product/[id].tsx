import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

export default function ProductDetailPage() {
  // URL'den gelen 'id' parametresini alıyoruz.
  const { id } = useLocalSearchParams<{ id: string }>();

  // Bu ekranın başlığını dinamik olarak ayarlayabiliriz.
  // Şimdilik statik bırakalım.
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Ürün Detayı: ${id}` }} />
      <Text style={styles.text}>Ürün ID: {id}</Text>
      <Text style={styles.text}>Bu sayfa yapım aşamasındadır.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
  },
});
