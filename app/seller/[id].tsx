import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

import { sellers, products as allProducts } from '../../data/sampleProducts';
import { ProductWithSellerId } from '../../types';
import { colors } from '../../constants/colors';
import { spacing, typography, borderRadius, shadows } from '../../constants/styles';
import ProductCard from '../../components/ProductCard';

export default function SellerProfilePage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    // ID'ye göre satıcıyı ve ürünlerini bul
    const seller = useMemo(() => sellers.find(s => s.id === id), [id]);
    const sellerProducts = useMemo(() => (allProducts as ProductWithSellerId[]).filter(p => p.sellerId === id), [id]);

    // Her ürüne seller alanını ekle (Product tipine dönüştür)
    const sellerProductsWithSeller = useMemo(() => {
        if (!seller) return [];
        return sellerProducts.map(p => ({ ...p, seller }));
    }, [sellerProducts, seller]);

    if (!seller) {
        return <View style={styles.centered}><ActivityIndicator /></View>;
    }

    const ListHeader = () => (
        <Animated.View entering={FadeIn.duration(600)}>
            {/* Profil Başlığı */}
            <View style={styles.profileHeader}>
                <Image source={seller.logo} style={styles.profileLogo} />
                <Text style={styles.profileName}>{seller.name}</Text>
                <Text style={styles.profileMotto}>"{seller.motto}"</Text>
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{seller.rating.toFixed(1)}</Text>
                        <Text style={styles.statLabel}>Puan</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{sellerProducts.length}</Text>
                        <Text style={styles.statLabel}>Ürün</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{seller.since}</Text>
                        <Text style={styles.statLabel}>Başlangıç</Text>
                    </View>
                </View>
            </View>
            {/* Ürünler Başlığı */}
            <Text style={styles.productsTitle}>Tüm Ürünleri</Text>
        </Animated.View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Kendi özel header'ımız */}
            <View style={styles.header}>
                <View style={{width: 44}} />
                <Text style={styles.headerTitle}>{seller?.name}</Text>
                <TouchableOpacity onPress={() => router.dismissAll()} style={styles.closeButton}>
                    <Ionicons name="close" size={28} color={colors.text.primary} />
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.container}
                data={sellerProductsWithSeller}
                keyExtractor={(item) => item.id}
                numColumns={2}
                ListHeaderComponent={ListHeader}
                columnWrapperStyle={styles.row}
                renderItem={({ item, index }) => (
                    <Animated.View 
                        style={styles.cardContainer}
                        entering={FadeInUp.delay(100 * (index % 2))}
                    >
                        <ProductCard 
                            product={item} 
                            onPress={() => router.push(`/product/${item.id}`)}
                        />
                    </Animated.View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.DEFAULT,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeader: {
        alignItems: 'center',
        padding: spacing.xl,
        backgroundColor: colors.surface.DEFAULT,
        paddingBottom: spacing.lg,
    },
    profileLogo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: spacing.md,
        borderWidth: 3,
        borderColor: colors.primary.light,
    },
    profileName: {
        ...typography.h1,
        fontSize: 28,
    },
    profileMotto: {
        ...typography.body,
        color: colors.text.secondary,
        marginTop: spacing.xs,
        marginBottom: spacing.lg,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: spacing.md,
        paddingVertical: spacing.md,
        backgroundColor: colors.background.DEFAULT,
        borderRadius: borderRadius.lg,
    },
    statBox: {
        alignItems: 'center',
    },
    statValue: {
        ...typography.h2,
        fontSize: 20,
    },
    statLabel: {
        ...typography.body,
        fontSize: 12,
        color: colors.text.tertiary,
        marginTop: spacing.xs,
    },
    productsTitle: {
        ...typography.h2,
        paddingHorizontal: spacing.lg,
        marginTop: spacing.xl,
        marginBottom: spacing.md,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
    },
    cardContainer: {
        width: '48.5%',
        marginBottom: spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    headerTitle: {
        ...typography.h2,
        fontSize: 18,
        fontWeight: '600'
    },
    closeButton: {
        padding: spacing.xs,
    },
});
