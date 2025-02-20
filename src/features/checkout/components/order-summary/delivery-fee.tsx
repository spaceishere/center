"use client";

import { useAtomValue } from "jotai";

import { cartTotalAtom } from "@/features/cart/store/cart";
import { deliveryItemAtom } from "@/features/order/store/order";

import { Price } from "@/components/price";

const DeliveryFee = () => {
  const totalAmount = useAtomValue(cartTotalAtom);
  const deliveryProduct = useAtomValue(deliveryItemAtom);

  return (
    <>
      <div className="flex items-start justify-between">
        <span>Захиалгын төлбөр</span>
        <Price
          amount={(deliveryProduct
            ? totalAmount - deliveryProduct.unitPrice
            : totalAmount
          ).toString()}
        />
      </div>
    </>
  );
};

export default DeliveryFee;
