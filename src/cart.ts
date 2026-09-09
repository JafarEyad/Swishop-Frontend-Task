import { Product } from './catalog';

export interface CartItem {
  product: Product;
  quantity: number;
}

function readStored(): CartItem[] {
  try {
    const raw = window.localStorage.getItem('swishop_cart');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export const cartStore: { items: CartItem[] } = {
  items: typeof window !== 'undefined' ? readStored() : [],
};

export function saveCart(items: CartItem[]) {
  cartStore.items = items;
  window.localStorage.setItem('swishop_cart', JSON.stringify(items));
}

export function validateCart(items: CartItem[]) {
  if (!items || items.length === 0) return false;
  for (let i = 0; i < items.length; i++) {
    if (items[i].quantity < 1) return false;
  }
  return true;
}
