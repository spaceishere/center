"use client";
import Link from "next/link";
import { useAtom, useAtomValue, type Atom } from "jotai";
import { updateCartAtom } from "@/features/cart/store/cart";
import { useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import queries from "@/gql/product/queries";
import Image from "@/components/image";
import { Price } from "@/components/price";
import { withDeliveryAtom } from "@/features/checkout/store/branch";
import {
  Counter,
  CounterButton,
  CounterInput,
} from "@/features/cart/components/counter";

import { OrderItem } from "@/features/order/types";

import { TagIcon } from "lucide-react";
import { useEffect } from "react";

const CartProductCard = ({
  cartItemAtom,
}: {
  cartItemAtom: Atom<OrderItem>;
}) => {
  const {
    _id,
    productName,
    unitPrice,
    count,
    productImgUrl,
    discountAmount,
    productId,
  } = useAtomValue(cartItemAtom);
  const [loading, changeCartItem] = useAtom(updateCartAtom);
  const { data } = useQuery(queries.productTags, {
    variables: { _id: productId },
  });
  const tagIds = data?.productDetail?.tagIds;

  const [withDelivery, setWithDelivery] = useAtom(withDeliveryAtom);
  useEffect(() => {
    if (!tagIds?.includes("2znBi5xWhERHPAtBXDLEy")) {
      if (count === 0) {
        setWithDelivery((prev) => Math.max(0, prev - 1));
      } else {
        setWithDelivery((prev) => prev + 1);
      }
    }

    return () => {
      if (!tagIds?.includes("2znBi5xWhERHPAtBXDLEy")) {
        setWithDelivery((prev) => Math.max(0, prev - 1));
      }
    };
  }, [count, tagIds, setWithDelivery]);

  return (
    <div className="relative flex min-w-[320px] border-b border-neutral-200 py-4 first:border-t last:mb-0 last:border-b-0 hover:shadow-lg md:px-4 md:last:border-b">
      <div className="relative w-[100px] overflow-hidden rounded-md md:w-[176px]">
        <Link href={`/product/${productId}`}>
          <Image src={productImgUrl} alt="" width={300} height={300} />
        </Link>
        {(discountAmount || 0) > 0 && (
          <div className="absolute left-0 top-0 inline-flex items-center bg-indigo-600 py-1 pl-1.5 pr-2 text-xs font-medium text-white">
            <TagIcon className="mr-1 h-3 w-3" />
            {(
              ((discountAmount || 0) / (unitPrice + (discountAmount || 0))) *
              100
            ).toFixed(1)}
            % Хямдрал
          </div>
        )}
      </div>
      <div className="flex min-w-[180px] flex-1 flex-col pl-4">
        <Button
          className="mb-2 justify-start px-0 text-lg md:mb-0"
          asChild
          variant="link"
        >
          <Link href={`/product/${_id}`}>{productName}</Link>
        </Button>
        <div className="flex flex-wrap items-center gap-2 md:mt-auto md:w-full md:flex-nowrap md:justify-between">
          <Counter>
            <CounterButton
              disabled={loading}
              minus
              onClick={() => changeCartItem({ _id, count: count - 1 })}
            />
            <CounterInput
              value={count}
              onChange={(e) =>
                changeCartItem({ _id, count: Number(e.target.value) })
              }
              disabled={loading}
            />
            <CounterButton
              onClick={() => changeCartItem({ _id, count: count + 1 })}
              disabled={loading}
            />
          </Counter>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => changeCartItem({ _id, count: 0 })}
            disabled={loading}
          >
            Хасах
          </Button>
          <span className="text-sm font-bold md:order-1 md:ml-auto md:text-lg">
            <Price amount={unitPrice.toString()} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
