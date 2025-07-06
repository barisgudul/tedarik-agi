// app/seller/[id].tsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

import { sellers, products as allProducts } from '../../data/sampleProducts';
import { ProductWithSellerId } from '../../types';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/styles';
import ProductCard from '../../components/ProductCard';
import { StarRating } from '../../components/StarRating'; // --- ADIM 1: StarRating'i import et ---

export default function SellerProfilePage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const seller = useMemo(() => sellers.find(s => s.id === id), [id]);
    const sellerProducts = useMemo(() => {
        if (!seller) return [];
        const products = (allProducts as ProductWithSellerId[]).filter(p => p.sellerId === id);
        return products.map(p => ({ ...p, seller }));
    }, [id, seller]);

    const handleGoBack = () => {
        if (router.canGoBack()) router.back();
        else router.replace('/(tabs)');
    };
    
    if (!seller) {
        return <View style={styles.container}><ActivityIndicator color={colors.primary.DEFAULT} /></View>;
    }
    
    const ListHeader = () => (
        <>
            <View style={{ height: 120 }} />
            <View style={styles.profileHeader}>
                <Image source={seller.logo} style={styles.profileLogo} />
                <Text style={styles.profileName}>{seller.name}</Text>
                <Text style={styles.profileMotto}>"{seller.motto}"</Text>
                <View style={styles.statsContainer}>
                    {/* --- ADIM 2: Puan Kutusunu Güncelle --- */}
                    <View style={styles.statBox}>
                        {/* Sayısal puan yerine StarRating bileşenini kullan */}
                        <StarRating rating={seller.rating} size={20} />
                        <Text style={styles.statLabel}>Puan ({seller.rating.toFixed(1)})</Text>
                    </View>
                    {/* Diğer kutular aynı kalıyor */}
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
            <Text style={styles.productsTitle}>Tüm Ürünleri</Text>
        </>
    );

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            
            <Image source={seller.coverImage} style={styles.backgroundImage} />
            <BlurView intensity={90} tint="light" style={StyleSheet.absoluteFill} />
            
            <Animated.View style={{flex: 1}} entering={FadeIn.duration(400)}>
                <SafeAreaView style={styles.floatingHeaderContainer}>
                    <BlurView intensity={80} tint="light" style={styles.pillContainer}>
                        <TouchableOpacity onPress={handleGoBack} style={styles.pillButton}>
                            <Ionicons name="arrow-back-outline" size={22} color={colors.text.primary} />
                        </TouchableOpacity>
                        <View style={styles.pillDivider} />
                        <TouchableOpacity onPress={() => { /* Paylaşma işlevi */ }} style={styles.pillButton}>
                            <Ionicons name="share-outline" size={22} color={colors.text.primary} />
                        </TouchableOpacity>
                    </BlurView>
                </SafeAreaView>
                
                <FlatList
                    data={sellerProducts}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    ListHeaderComponent={ListHeader}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
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
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.DEFAULT,
    },
    // --- ADIM 3: statBox stilini ayarla (daha iyi hizalama için) ---
    statBox: {
        alignItems: 'center',
        flex: 1, // Kutuların eşit genişlikte olmasını sağla
        paddingVertical: spacing.sm,
    },
    // Diğer tüm stiller aynı
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: { 
        ...StyleSheet.absoluteFillObject, 
        width: '100%', 
        height: '100%', 
        resizeMode: 'cover'
    },
    floatingHeaderContainer: { position: 'absolute', top: 10, left: 0, right: 0, zIndex: 10, alignItems: 'center' },
    pillContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: `${colors.surface.DEFAULT}80`, borderRadius: 99, ...shadows.subtle, overflow: 'hidden', borderWidth: 1, borderColor: `${colors.surface.DEFAULT}99` },
    pillButton: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
    pillDivider: { width: 1, height: '40%', backgroundColor: `${colors.border}99` },
    profileHeader: {
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        backgroundColor: 'transparent',
    },
    profileLogo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: spacing.md,
        borderWidth: 3,
        borderColor: colors.surface.DEFAULT,
        ...shadows.medium,
    },
    profileName: {
        ...typography.h1,
        fontSize: 28,
        color: colors.text.primary,
        ...shadows.subtle,
    },
    profileMotto: {
        ...typography.body,
        color: colors.text.secondary,
        marginTop: spacing.xs,
        marginBottom: spacing.lg,
        textAlign: 'center'
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center', // dikeyde ortala
        width: '100%',
        marginTop: spacing.md,
        padding: spacing.md,
        backgroundColor: `${colors.surface.DEFAULT}cc`,
        borderRadius: borderRadius.lg,
        borderWidth: 1, 
        borderColor: `${colors.border}80`, 
    },
    statValue: {
        ...typography.h2,
        fontSize: 20,
        height: 24, // Yıldızlarla aynı hizada durması için sabit yükseklik ver
        textAlignVertical: 'center',
    },
    statLabel: {
        ...typography.body,
        fontSize: 12,
        color: colors.text.tertiary,
        marginTop: 8, // Yıldızlardan sonra biraz boşluk
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
}); 