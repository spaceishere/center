"use client";

import { useAtomValue } from "jotai";

import { cartAtom } from "@/features/cart/store/cart";

import Image from "@/components/image";
import { Badge } from "@/components/ui/badge";

const ItemsGrid = () => {
  const cart = useAtomValue(cartAtom);

  return (
    <div className="mt-4 flex items-center gap-4 pb-7">
      {cart.map((item) => (
        <div
          className="relative aspect-square w-24 overflow-hidden rounded-lg border md:w-32"
          key={item._id}
        >
          <Image
            src={item.productImgUrl}
            height={120}
            width={120}
            className="absolute inset-0 h-full w-full"
            alt="Cart item"
          />
          <Badge variant="secondary" className="absolute bottom-2 right-2">
            x{item.count}
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default ItemsGrid;
