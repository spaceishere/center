"use client";

import { cartTotalAtom } from "@/features/cart/store/cart";
import { Price } from "@/components/price";
import { useAtomValue } from "jotai";

const CartTotal = () => {
  const totalAmount = useAtomValue(cartTotalAtom);
  return <Price amount={totalAmount + ""} />;
};

export default CartTotal;
