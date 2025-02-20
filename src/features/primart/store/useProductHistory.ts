import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

import { TProduct } from "../types";

interface ProductHistoryStore {
  products: TProduct[];
  addProduct: (product: TProduct) => void;
}

export const useProductHistory = create(
  persist<ProductHistoryStore>(
    (set, get) => ({
      products: [],
      addProduct: (product) => {
        const isFindedItem = get().products.find(
          (item) => item._id === product._id,
        );

        if (!isFindedItem) {
          set({ products: [product, ...get().products.slice(0, 5)] });
        } else {
          set({
            products: [
              product,
              ...get().products.filter((p) => p._id !== product._id),
            ],
          });
        }
      },
    }),
    {
      name: "pcph",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
