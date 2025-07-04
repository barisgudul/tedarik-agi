// components/CustomHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../constants/styles';

interface CustomHeaderProps {
  onMenuPress: () => void;
}

export default function CustomHeader({ onMenuPress }: CustomHeaderProps) {
  const router = useRouter();
  const cartItemCount = 2;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Ionicons name="menu" size={32} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.logo}>Fastkart.</Text>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
            <Ionicons name="search-outline" size={26} color={colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/cart')}>
            <Ionicons name="cart-outline" size={28} color={colors.text.primary} />
            {cartItemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    backgroundColor: colors.surface.DEFAULT,
    borderBottomWidth: 1,
    borderBottomColor: colors.border 
  },
  container: { 
    height: 60, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: spacing.md, 
    backgroundColor: colors.surface.DEFAULT 
  },
  logo: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: colors.primary.DEFAULT 
  },
  rightIcons: { 
    flexDirection: 'row' 
  },
  iconButton: { 
    padding: 8 
  },
  cartBadge: { 
    position: 'absolute', 
    top: 2, right: 2, 
    backgroundColor: colors.primary.DEFAULT, 
    borderRadius: 8, 
    minWidth: 16, height: 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 2 
  },
  cartBadgeText: { 
    color: colors.text.onDark, 
    fontSize: 10, 
    fontWeight: 'bold', 
    paddingHorizontal: 2 
  },
});
