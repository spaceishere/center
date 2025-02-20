"use client";
import { cartLengthAtom } from "@/features/cart/store/cart";
import { useAtomValue } from "jotai";

const CartCount = () => {
  const length = useAtomValue(cartLengthAtom);

  return <span suppressHydrationWarning>{length}</span>;
};

export default CartCount;
