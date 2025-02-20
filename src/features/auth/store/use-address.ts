import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AddressStore {
  address: string;
  setAddress: (address: string) => void;
}

export const useAddress = create(
  persist<AddressStore>(
    (set) => ({
      address: "",
      setAddress: (address: string) => set({ address }),
    }),
    {
      name: "address-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
