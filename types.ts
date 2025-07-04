export interface Product {
  id: string;
  name: string;
  price: string;
  image: any; // API'den gelince string olacak, şimdilik any
  category: string;
  location: string;
}
