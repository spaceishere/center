import { create } from "zustand";

export type TCarData = {
  id: string;
  number: string;
  catId: string;
  category: { code?: string };
  colorCode?: string;
};

interface CarModalStore {
  isOpen: boolean;
  action: "edit" | "create" | undefined;
  onOpen: (value: "edit" | "create", carData?: TCarData) => void;
  onClose: () => void;
  carData: TCarData | undefined;
}

export const useCarModal = create<CarModalStore>((set) => ({
  isOpen: false,
  action: undefined,
  onOpen: (value, carData) => set({ isOpen: true, action: value, carData }),
  onClose: () => set({ isOpen: false, action: undefined, carData: undefined }),
  carData: undefined,
}));
