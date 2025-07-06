// data/sampleProducts.ts
import { Product, Seller } from '../types';

// --- SATICILAR (Kapak Fotoğrafı Eklenmiş Hali) ---
export const sellers: Seller[] = [
  { 
    id: 'alya-kuyumculuk', 
    name: "Alya Kuyumculuk", 
    logo: require('../assets/images/sellers/seller1.png'), 
    since: 2018, 
    rating: 4.9, 
    reviews: 124, 
    motto: "Zarafetin Işıltılı Dokunuşu",
    coverImage: require('../assets/images/products/product1.png') // Kapak fotoğrafı
  },
  { 
    id: 'elmas-isiltisi', 
    name: "Elmas Işıltısı", 
    logo: require('../assets/images/sellers/seller2.png'), 
    since: 2020, 
    rating: 4.8, 
    reviews: 88, 
    motto: "Doğadan Gelen Sanat",
    coverImage: require('../assets/images/products/product2.png') // Kapak fotoğrafı
  },
  { 
    id: 'altin-atolyesi', 
    name: "Altın Atölyesi", 
    logo: require('../assets/images/sellers/seller3.png'), 
    since: 2015, 
    rating: 5.0, 
    reviews: 250, 
    motto: "Nesiller Boyu Süren Değer",
    coverImage: require('../assets/images/products/product3.png') // Kapak fotoğrafı
  },
];


// --- ÜRÜNLER (Günün Ürünü Eklenmiş Hali) ---
export const products: Product[] = [
  // --- YENİ: GÜNÜN ÜRÜNÜ (ID: gunun-urunu) ---
  { 
    id: 'gunun-urunu', 
    name: 'Gecenin Kraliçesi Safir Kolye', 
    price: '7.500 TL',          // İndirimli (son) fiyat
    originalPrice: '15.000 TL', // Üzeri çizilecek eski fiyat
    image: require('../assets/images/products/gunun-urunu.png'), // Şimdilik mevcut bir görsel kullanıyoruz
    category: 'Değerli Taşlar',  // Kendi kategorisi
    sellerId: 'elmas-isiltisi' 
  },

  // Kategori: Pırlanta
  { id: '1', name: 'Işıltılı Pırlanta Yüzük', price: '25.000 TL', image: require('../assets/images/products/product1.png'), category: 'Pırlanta', sellerId: 'alya-kuyumculuk' },
  
  // Kategori: Değerli Taşlar
  { id: '2', name: 'Doğal Açık Taş Kolye', price: '12.500 TL', image: require('../assets/images/products/product2.png'), category: 'Değerli Taşlar', sellerId: 'elmas-isiltisi' },
  { id: '4', name: 'Renkli Taşlı Küpe', price: '8.900 TL', image: require('../assets/images/products/product4.png'), category: 'Değerli Taşlar', sellerId: 'alya-kuyumculuk' },
  
  // Kategori: Mücevher
  { id: '3', name: 'Klasik Mücevher Seti', price: '40.000 TL', image: require('../assets/images/products/product3.png'), category: 'Mücevher', sellerId: 'altin-atolyesi' },
  { id: '6', name: 'Gümüş Metal Kolye', price: '3.500 TL', image: require('../assets/images/products/product6.png'), category: 'Mücevher', sellerId: 'elmas-isiltisi' },
  { id: '8', name: 'Klasik Bilezik', price: '11.000 TL', image: require('../assets/images/products/product8.png'), category: 'Mücevher', sellerId: 'altin-atolyesi' },

  // Kategori: Alyans
  { id: '7', name: 'Modern Alyans', price: '7.200 TL', image: require('../assets/images/products/product7.png'), category: 'Alyans', sellerId: 'alya-kuyumculuk' },
  
  // Kategori: Saat
  { id: '10', name: 'Şık Saat', price: '18.000 TL', image: require('../assets/images/products/product10.png'), category: 'Saat', sellerId: 'alya-kuyumculuk' },
  
  // Kategori: Yatırım & Ziynet
  { id: '5', name: 'Altın Ziynet Bileklik', price: '15.000 TL', image: require('../assets/images/products/product5.png'), category: 'Yatırım & Ziynet', sellerId: 'altin-atolyesi' },
  { id: '9', name: 'Hurda Altın', price: '2.000 TL', image: require('../assets/images/products/product9.png'), category: 'Yatırım & Ziynet', sellerId: 'elmas-isiltisi' },
];