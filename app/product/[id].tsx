// product/[id].tsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, useWindowDimensions, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { products, sellers } from '../../data/sampleProducts';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/styles';
import { StarRating } from '../../components/StarRating';
import { useFilterStore } from '../../store/filterStore';

export default function ThePodiumPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    // --- DÜZELTME 1: Store'dan doğru fonksiyonu alıyoruz ---
    // Artık 'setSelectedCategory' yok, onun yerine 'showProducts' var.
    const showProducts = useFilterStore((state) => state.showProducts);

    const product = useMemo(() => products.find((p) => p.id === id), [id]);
    const seller = useMemo(() => sellers.find(s => s.id === product?.sellerId), [product]);

    // KATEGORİYE DÖNÜŞ FONKSİYONU
    const handleCategoryPress = (category: string) => {
        // --- DÜZELTME 2: Eski fonksiyonu yeni fonksiyon ile değiştiriyoruz ---
        showProducts(category);
        router.dismissAll(); // Bu, tüm modal pencereleri kapatıp ana sekmeye döner.
    };

    // GERİ BUTONU FONKSİYONU
    const handleGoHome = () => {
        // --- DÜZELTME 3: Eski fonksiyonu yeni fonksiyon ile değiştiriyoruz ---
        showProducts('all'); // Anasayfaya dönerken tüm ürünleri göster
        router.dismissAll();
    };

    if (!product || !seller) {
        return <View style={styles.centered}><ActivityIndicator /></View>;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Image source={product.image} style={styles.backgroundImage} />
            <BlurView intensity={90} tint="light" style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.floatingHeaderContainer}>
                <Animated.View entering={FadeIn.duration(800)}>
                    <BlurView intensity={80} tint="light" style={styles.pillContainer}>
                        {/* Geri butonu artık handleGoHome fonksiyonunu kullanıyor */}
                        <TouchableOpacity onPress={handleGoHome} style={styles.pillButton}>
                            <Ionicons name="arrow-back-outline" size={22} color={colors.text.primary} />
                        </TouchableOpacity>
                        <View style={styles.pillDivider} />
                        <TouchableOpacity onPress={() => { /* Paylaşma işlevi */ }} style={styles.pillButton}>
                            <Ionicons name="share-outline" size={22} color={colors.text.primary} />
                        </TouchableOpacity>
                    </BlurView>
                </Animated.View>
            </SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ height: 120 }} />
                <View style={styles.showcaseContainer}>
                    <Animated.View style={styles.imageCard} entering={FadeIn.duration(1000).delay(200)}>
                        <Image source={product.image} style={styles.showcaseImage} />
                    </Animated.View>
                    <Animated.Text style={styles.productName} entering={FadeIn.duration(800).delay(400)}>
                        {product.name}
                    </Animated.Text>
                    <Animated.Text style={styles.productPrice} entering={FadeIn.duration(800).delay(500)}>
                        {product.price}
                    </Animated.Text>
                </View>
                <Animated.View style={styles.detailsContainer} entering={FadeIn.duration(800).delay(600)}>
                    {/* Satıcı Kartı */}
                    <TouchableOpacity 
                        style={[styles.detailCard, { marginBottom: spacing.lg }]} 
                        // --- DEĞİŞİKLİK BURADA ---
                        onPress={() => router.replace(`/seller/${seller.id}`)}
                        activeOpacity={0.8}
                    >
                        <Image source={seller.logo} style={styles.detailCardLogo} />
                        <View style={styles.detailCardTextContainer}>
                            <Text style={styles.detailCardLabel}>Satıcı</Text>
                            <Text style={styles.detailCardValue}>{seller.name}</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={22} color={colors.text.secondary} />
                    </TouchableOpacity>
                    {/* Bilgi İkilisi */}
                    <View style={styles.infoRow}>
                        {/* Koleksiyon Kartı */}
                        <TouchableOpacity
                            style={[styles.detailCard, styles.halfCard]}
                            onPress={() => handleCategoryPress(product.category)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.detailCardTextContainer}>
                               <Text style={styles.detailCardLabel}>Koleksiyon</Text>
                               <Text style={styles.detailCardValue}>{product.category}</Text>
                            </View>
                            <Ionicons name="arrow-forward" size={22} color={colors.text.secondary} />
                        </TouchableOpacity>
                        {/* Puan Kartı */}
                        <View style={[styles.detailCard, styles.halfCard]}>
                             <View style={styles.detailCardTextContainer}>
                                <Text style={styles.detailCardLabel}>Değerlendirme</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <StarRating rating={seller.rating} size={16} />
                                    <Text style={styles.ratingText}>{seller.rating.toFixed(1)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Açıklama */}
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>
                           {seller.motto}. Bu eşsiz parça, modern tasarımı ve klasik işçiliği bir araya getirerek zamansız bir zarafet sunar.
                        </Text>
                    </View>
                </Animated.View>
                <View style={{ height: 150 }} />
            </ScrollView>
            <SafeAreaView style={styles.footerContainer}>
                <Animated.View style={styles.footer} entering={FadeIn.duration(1000).delay(800)}>
                    <TouchableOpacity style={styles.buyButton} activeOpacity={0.8}>
                        <Text style={styles.buyButtonText}>SATIN AL</Text>
                    </TouchableOpacity>
                </Animated.View>
            </SafeAreaView>
        </View>
    );
}

// Stillerde değişiklik yapmaya gerek yok, aynı kalabilirler.
const styles = StyleSheet.create({
    container: { flex: 1 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    backgroundImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', resizeMode: 'cover' },
    floatingHeaderContainer: { position: 'absolute', top: 10, left: 0, right: 0, zIndex: 10, alignItems: 'center' },
    pillContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: `${colors.surface.DEFAULT}80`, borderRadius: 99, ...shadows.subtle, overflow: 'hidden', borderWidth: 1, borderColor: `${colors.surface.DEFAULT}99` },
    pillButton: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
    pillDivider: { width: 1, height: '40%', backgroundColor: `${colors.border}99` },
    showcaseContainer: { alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: spacing.sm, marginBottom: spacing.xxl },
    imageCard: { width: '100%', height: 400, borderRadius: borderRadius.xl, backgroundColor: colors.surface.DEFAULT, ...shadows.medium, shadowColor: '#000000', shadowOpacity: 0.2, shadowRadius: 25, marginBottom: spacing.xl, },
    showcaseImage: { width: '100%', height: '100%', resizeMode: 'cover', borderRadius: borderRadius.xl, },
    productName: { ...typography.h1, color: colors.text.primary, fontSize: 36, textAlign: 'center', lineHeight: 44, },
    productPrice: { ...typography.h2, color: colors.text.secondary, fontSize: 22, marginTop: spacing.sm, fontWeight: '400', },
    detailsContainer: { 
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
    },
    detailCard: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: `${colors.surface.DEFAULT}cc`, 
        padding: spacing.md, 
        borderRadius: borderRadius.lg, 
        borderWidth: 1, 
        borderColor: `${colors.border}80`, 
    },
    detailCardLogo: { width: 40, height: 40, borderRadius: 20, marginRight: spacing.md, },
    detailCardTextContainer: { flex: 1, },
    detailCardLabel: { color: colors.text.secondary, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
    detailCardValue: { color: colors.text.primary, fontSize: 16, fontWeight: '500', },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: -spacing.xs,
    },
    halfCard: {
        width: '49%',
        marginHorizontal: spacing.xs,
        paddingVertical: spacing.lg,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    ratingText: {
        marginLeft: spacing.sm,
        color: colors.text.secondary,
        fontWeight: '500',
    },
    descriptionContainer: {
        marginTop: spacing.lg,
        padding: spacing.lg,
        backgroundColor: `${colors.surface.DEFAULT}99`,
        borderRadius: borderRadius.lg,
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 26,
        color: colors.text.secondary,
    },
    footerContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, },
    footer: { padding: spacing.md, },
    buyButton: { backgroundColor: colors.primary.dark, alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: borderRadius.xl, ...shadows.medium, shadowColor: colors.primary.dark, },
    buyButtonText: { color: colors.text.onDark, fontSize: 16, fontWeight: 'bold', letterSpacing: 1.5, },
});