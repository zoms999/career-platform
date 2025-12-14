import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem: Omit<CartItem, 'quantity'>) => {
        const items = get().items;
        const existingItem = items.find((item: CartItem) => item.id === newItem.id);

        if (existingItem) {
          set({
            items: items.map((item: CartItem) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...newItem, quantity: 1 }] });
        }
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item: CartItem) => item.id !== id) });
      },
      updateQuantity: (id: string, quantity: number) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((item: CartItem) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      totalPrice: () => {
        return get().items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
      },
      totalItems: () => {
        return get().items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
    }
  )
);
