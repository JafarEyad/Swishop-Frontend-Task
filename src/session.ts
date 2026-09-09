export type User = {
  id: string;
  email: string;
};

export const currentUser: User | null = null;

export const flags = {
  newCheckout: true,
  wishlist: true,
};
