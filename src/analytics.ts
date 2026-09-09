import { cartStore } from './cart';

export function track(name: string, payload?: Record<string, unknown>) {
  const cartSize = cartStore.items.length;
  const events = ((window as any).__events = (window as any).__events || []);
  events.push({ name, payload, cartSize, t: Date.now() });
}
