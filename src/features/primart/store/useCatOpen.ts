import { create } from "zustand";

interface CatOpenStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCatOpen = create<CatOpenStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
