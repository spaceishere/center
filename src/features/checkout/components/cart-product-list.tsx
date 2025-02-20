"use client";

import { useAtomValue } from "jotai";
import { cartItemAtom } from "@/features/cart/store/cart";

import CartProductCard from "./cart-product-card";

const CartProductList = () => {
  const cart = useAtomValue(cartItemAtom);
  return (
    <>
      {cart.map((cartItemAtom) => (
        <CartProductCard key={`${cartItemAtom}`} cartItemAtom={cartItemAtom} />
      ))}
    </>
  );
};

export default CartProductList;
