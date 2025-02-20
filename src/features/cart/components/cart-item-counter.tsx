"use client";

import { toast } from "sonner";
import { memo } from "react";
import { useAtom } from "jotai";

import { updateCartAtom } from "@/features/cart/store/cart";
import { useReminder } from "@/features/primart/api/useReminder";

import { Price } from "@/components/price";
import { Counter, CounterButton, CounterInput } from "./counter";

const CartItemCounter = ({
  unitPrice,
  _id,
  count,
  productId,
}: {
  _id: string;
  unitPrice: number;
  count: number;
  productId: string;
}) => {
  const [loading, changeCartItem] = useAtom(updateCartAtom);

  const {
    refetch,
    loading: loadingReminder,
    reminder,
  } = useReminder(productId);

  return (
    <div className="flex h-16 flex-col justify-between">
      <Price
        className="flex justify-end space-y-2 text-right text-sm"
        amount={unitPrice * count + ""}
      />
      <Counter size="sm">
        <CounterButton
          minus
          disabled={loading}
          onClick={() => changeCartItem({ _id, count: count - 1 })}
        />
        <CounterInput
          value={count}
          disabled={loadingReminder || loading}
          onChange={(e) => {
            if (Number(e.target.value) > reminder) {
              toast.error("Үлдэгдэлээс давсан байна.");
              return;
            }
            changeCartItem({ _id, count: Number(e.target.value) });
            refetch();
          }}
        />
        <CounterButton
          disabled={loadingReminder ? true : reminder > count ? loading : true}
          onClick={() => {
            changeCartItem({ _id, count: count + 1 });
            refetch();
          }}
        />
      </Counter>
    </div>
  );
};

export default memo(CartItemCounter);
