// Satıcı tipi
export interface Seller {
  id: string;
  name: string;
  logo: any; // require() için any
  since: number;
  rating: number;
  reviews: number;
  motto: string;
}

// Ürün tipi (güncellendi)
export interface Product {
  id: string;
  name: string;
  price: string;
  image: any;
  category: string;
  location: string;
  sellerId: string; // Artık zorunlu
}

// ProductWithSellerId tipini ekle (artık Product ile aynı, seller opsiyonel)
export type ProductWithSellerId = Product;
