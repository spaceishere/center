import { OrderItem } from "@/features/order/types";
import { TProduct } from "../types";
import { atom } from "jotai";
import { currentUserAtom } from "../../auth/store/auth";
import {
  cudOrderAtom,
  itemsAtom,
  loadingOrderAtom,
  productItemsAtom,
} from "@/features/order/store/order";
import { splitAtom, atomWithStorage } from "jotai/utils";

interface IUpdateItem {
  _id: string;
  count?: number;
}

export const isCartOpenAtom = atom<boolean>(false);
export const isBranchOpenAtom = atom<boolean>(false);

export const changeCartItem = (
  product: IUpdateItem,
  cart: OrderItem[],
): OrderItem[] => {
  const { _id, count } = product;

  if (typeof count === "number") {
    if (count === 0) return cart.filter((item) => item._id !== _id);

    return cart.map((item) => (item._id === _id ? { ...item, count } : item));
  }

  return cart;
};

export const addToCart = (
  product: TProduct & { count: number },
  cart: OrderItem[],
): OrderItem[] => {
  const prevItem = cart.find(({ productId }) => productId === product._id);

  if (prevItem) {
    const { _id, count } = prevItem;
    return changeCartItem({ _id, count: count + product.count }, cart);
  }

  const { unitPrice, _id, name, attachment, count, tagIds } = product;

  const cartItem = {
    _id: Math.random().toString(),
    productId: _id,
    count,
    unitPrice,
    productName: name,
    productImgUrl: attachment?.url,
    tagIds: tagIds,
  };

  return [...cart, cartItem];
};

export const localCartAtom = atomWithStorage<OrderItem[]>("localCart", []);

export const cartAtom = atom((get) =>
  get(currentUserAtom) ? get(productItemsAtom) : get(localCartAtom),
);

export const cartLengthAtom = atom((get) => get(cartAtom).length);

export const cartTotalAtom = atom<number>((get) =>
  (get(currentUserAtom) ? get(itemsAtom) : get(localCartAtom)).reduce(
    (total, item) => total + (item?.count || 0) * (item.unitPrice || 0),
    0,
  ),
);

export const cartItemAtom = splitAtom(cartAtom);

export const addToCartAtom = atom(
  (get) => get(loadingOrderAtom),
  (get, set, payload: TProduct & { count: number }) => {
    set(get(currentUserAtom) ? itemsAtom : localCartAtom, (prev) =>
      addToCart(payload, prev),
    );
    !!get(currentUserAtom) && set(cudOrderAtom, true);
  },
);

export const updateCartAtom = atom(
  (get) => get(loadingOrderAtom),
  (get, set, payload: IUpdateItem) => {
    set(get(currentUserAtom) ? itemsAtom : localCartAtom, (prev) =>
      changeCartItem(payload, prev),
    );
    !!get(currentUserAtom) && set(cudOrderAtom, true);
  },
);

export const setCartAtom = atom(
  () => "",
  (get, set, update: OrderItem[]) => {
    set(get(currentUserAtom) ? itemsAtom : localCartAtom, update);
  },
);
