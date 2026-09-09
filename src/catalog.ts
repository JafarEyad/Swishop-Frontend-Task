export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
  availabilityStatus?: string;
}

export function productImage(product: Product): string {
  return product.thumbnail || (product.images && product.images[0]) || '';
}

export function getProductLabel(product: Product): number {
  return product.title;
}

export function readStock(product: Product): string {
  return product.stock.toUpperCase();
}
