// data/sampleProducts.ts
import { Product, Seller } from '../types';

// --- VERİTABANI ---
export const sellers: Seller[] = [
  { id: 'alya-kuyumculuk', name: "Alya Kuyumculuk", logo: require('../assets/images/sellers/seller1.png'), since: 2018, rating: 4.9, reviews: 124, motto: "Zarafetin Işıltılı Dokunuşu" },
  { id: 'elmas-isiltisi', name: "Elmas Işıltısı", logo: require('../assets/images/sellers/seller2.png'), since: 2020, rating: 4.8, reviews: 88, motto: "Doğadan Gelen Sanat" },
  { id: 'altin-atolyesi', name: "Altın Atölyesi", logo: require('../assets/images/sellers/seller3.png'), since: 2015, rating: 5.0, reviews: 250, motto: "Nesiller Boyu Süren Değer" },
];

export const products: Product[] = [
  { id: '1', name: 'Işıltılı Pırlanta Yüzük', price: '25.000 TL', image: require('../assets/images/products/product1.png'), category: 'Pırlanta', location: 'İstanbul', sellerId: 'alya-kuyumculuk' },
  { id: '2', name: 'Doğal Açık Taş Kolye', price: '12.500 TL', image: require('../assets/images/products/product2.png'), category: 'Açık Taşlar', location: 'Ankara', sellerId: 'elmas-isiltisi' },
  { id: '3', name: 'Klasik Mücevher Seti', price: '40.000 TL', image: require('../assets/images/products/product3.png'), category: 'Mücevher', location: 'İzmir', sellerId: 'altin-atolyesi' },
  { id: '4', name: 'Renkli Taşlı Küpe', price: '8.900 TL', image: require('../assets/images/products/product4.png'), category: 'Renkli Taş', location: 'Bursa', sellerId: 'alya-kuyumculuk' },
  { id: '5', name: 'Altın Ziynet Bileklik', price: '15.000 TL', image: require('../assets/images/products/product5.png'), category: 'Ziynet', location: 'Adana', sellerId: 'altin-atolyesi' },
  { id: '6', name: 'Gümüş Metal Kolye', price: '3.500 TL', image: require('../assets/images/products/product6.png'), category: 'Metaller', location: 'Antalya', sellerId: 'elmas-isiltisi' },
  { id: '7', name: 'Modern Alyans', price: '7.200 TL', image: require('../assets/images/products/product7.png'), category: 'Alyans', location: 'Konya', sellerId: 'alya-kuyumculuk' },
  { id: '8', name: 'Klasik Bilezik', price: '11.000 TL', image: require('../assets/images/products/product8.png'), category: 'Bilezik', location: 'Samsun', sellerId: 'altin-atolyesi' },
  { id: '9', name: 'Hurda Altın', price: '2.000 TL', image: require('../assets/images/products/product9.png'), category: 'Hurda', location: 'Kayseri', sellerId: 'elmas-isiltisi' },
  { id: '10', name: 'Şık Saat', price: '18.000 TL', image: require('../assets/images/products/product10.png'), category: 'Saat', location: 'Eskişehir', sellerId: 'alya-kuyumculuk' },
];
