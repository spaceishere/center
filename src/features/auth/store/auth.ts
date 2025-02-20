import { TCustomer } from "@/types";
import { atom } from "jotai";
import { TConfig } from "@/types";

export const isOpenAtom = atom<boolean>(false);

export const currentUserAtom = atom<TCustomer | null>(null);

export const loadingUserAtom = atom<boolean>(true);

export const refetchCurrentUserAtom = atom<boolean>(false);

export const configAtom = atom<TConfig | null>(null);

export const deliveryItemIdAtom = atom((get) => {
  const config = get(configAtom);
  const { productId: deliveryProductId } = config?.deliveryConfig || {};
  return deliveryProductId;
});

export const checkRemainderAtom = atom(
  (get) => get(configAtom)?.isCheckRemainder,
);
