// data/sampleProducts.ts
import { Product } from '../types';

export const products: Product[] = [
  { id: '1', name: 'Işıltılı Pırlanta Yüzük', price: '25.000 TL', image: require('../assets/images/products/product1.png'), category: 'Pırlanta', location: 'İstanbul' },
  { id: '2', name: 'Doğal Açık Taş Kolye', price: '12.500 TL', image: require('../assets/images/products/product2.png'), category: 'Açık Taşlar', location: 'Ankara' },
  { id: '3', name: 'Klasik Mücevher Seti', price: '40.000 TL', image: require('../assets/images/products/product3.png'), category: 'Mücevher', location: 'İzmir' },
  { id: '4', name: 'Renkli Taşlı Küpe', price: '8.900 TL', image: require('../assets/images/products/product4.png'), category: 'Renkli Taş', location: 'Bursa' },
  { id: '5', name: 'Altın Ziynet Bileklik', price: '15.000 TL', image: require('../assets/images/products/product5.png'), category: 'Ziynet', location: 'Adana' },
  { id: '6', name: 'Gümüş Metal Kolye', price: '3.500 TL', image: require('../assets/images/products/product6.png'), category: 'Metaller', location: 'Antalya' },
  { id: '7', name: 'Modern Alyans', price: '7.200 TL', image: require('../assets/images/products/product7.png'), category: 'Alyans', location: 'Konya' },
  { id: '8', name: 'Klasik Bilezik', price: '11.000 TL', image: require('../assets/images/products/product8.png'), category: 'Bilezik', location: 'Samsun' },
  { id: '9', name: 'Hurda Altın', price: '2.000 TL', image: require('../assets/images/products/product9.png'), category: 'Hurda', location: 'Kayseri' },
  { id: '10', name: 'Şık Saat', price: '18.000 TL', image: require('../assets/images/products/product10.png'), category: 'Saat', location: 'Eskişehir' },
];
