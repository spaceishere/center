"use client";

import { useAtomValue } from "jotai";

import { cartAtom } from "@/features/cart/store/cart";

import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/price";

const ItemsSummary = () => {
  const items = useAtomValue(cartAtom);

  return (
    <>
      {items.map((item) => (
        <div className="flex items-start justify-between" key={item._id}>
          {item.productName}
          <div className="flex w-1/3 justify-between">
            <Badge variant="secondary">x{item.count}</Badge>
            <Price amount={item.unitPrice.toString()} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemsSummary;
