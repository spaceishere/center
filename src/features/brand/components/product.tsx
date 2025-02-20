"use client";

import Image from "next/image";
import { Fragment, MouseEventHandler, useMemo } from "react";
import { useAtom } from "jotai";
import { addToCartAtom } from "@/features/cart/store/cart";
import { posReadFile } from "@/lib/utils";

import { useCurrentOrder } from "@/features/primart/api/useCurrentOrder";
import { useReminder } from "@/features/primart/api/useReminder";

import { Price } from "@/components/price";
import { Button } from "@/components/ui/button";

import { ShoppingCart } from "lucide-react";

import { TProduct } from "@/features/primart/types";

interface ProductProps {
  product: TProduct;
}

export const Product = ({ product }: ProductProps) => {
  const [loading, addToCart] = useAtom(addToCartAtom);

  const {
    loading: loadingReminder,
    refetch,
    reminder,
  } = useReminder(product._id);
  const {
    refetch: refetchOrderItems,
    loading: loadingOrderItems,
    orderItems,
  } = useCurrentOrder();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event: any) => {
    if (reminder < 1) {
      return;
    }

    let item: any = product;
    event.stopPropagation();

    addToCart({ ...item, count: 1 });

    refetch();
    refetchOrderItems();
  };

  const imageUrl = useMemo(() => {
    return product?.attachment?.url || "";
  }, [product]);

  const total = useMemo(() => {
    return (
      (orderItems?.find((item: any) => item.id === product._id)?.count || 0) + 1
    );
  }, [orderItems, product]);

  const availableAddCart =
    product?.tagIds?.includes("2znBi5xWhERHPAtBXDLEy") &&
    reminder > total - 1 &&
    (!loadingReminder || !loadingOrderItems);

  return (
    <Fragment>
      <div className="relative aspect-[16/11] w-full">
        <Image
          src={posReadFile(
            imageUrl ? imageUrl : "/assets/image-placeholder.png",
          )}
          fill
          alt="product image"
          className="object-cover object-center"
        />
      </div>
      <div className="px-3 pb-4 pt-5">
        <p className="text-center font-medium">
          <Price amount={product.unitPrice.toString()} currencyCode="MNT" />
        </p>

        <p className="mt-1 line-clamp-2 h-12 px-2 text-center">
          {product.name}
        </p>

        {availableAddCart && (
          <Button
            variant={"ghost"}
            onClick={(e) => {
              onAddToCart(e);
            }}
            disabled={loading}
            className="mt-3 w-full text-primary hover:text-primary"
          >
            <ShoppingCart className="mr-2 size-5" />
            Сагсанд нэмэх
          </Button>
        )}
      </div>
    </Fragment>
  );
};
