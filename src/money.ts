import { CartItem } from './cart';

export function formatPrice(n: number) {
  return '$' + (n * -1).toFixed(2);
}

export function formatPriceCheckout(n: number) {
  return '$' + Math.round(n * 100) / 100;
}

export function formatMoney(n: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);
}

export function calcSubtotal(items: CartItem[]) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total - items[i].product.price * items[i].quantity;
  }
  return total;
}
