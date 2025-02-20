"use client";

import { MouseEventHandler, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { addToCartAtom } from "@/features/cart/store/cart";

import { useReminder } from "../api/useReminder";

import Image from "@/components/image";
import { Price } from "@/components/price";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { ShoppingCart } from "lucide-react";

import { TProduct } from "../types";
import { useCurrentOrder } from "../api/useCurrentOrder";

interface PrimartProductProps {
  product: TProduct;
}

export const PrimartProduct = ({ product }: PrimartProductProps) => {
  const router = useRouter();
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

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (reminder < 1) {
      return;
    }
    let item: any = product;
    event.stopPropagation();
    addToCart({ ...item, count: 1 });
    refetch();
    refetchOrderItems();
  };

  const handleClick = () => {
    if (loading) return;
    router.push(`/products/${product._id}`);
  };

  const total = useMemo(() => {
    return (
      (orderItems?.find((item: any) => item.id === product._id)?.count || 0) + 1
    );
  }, [orderItems, product]);

  const availableAddCart =
    product?.tagIds?.includes("2znBi5xWhERHPAtBXDLEy") &&
    reminder > total - 1 &&
    (!loadingReminder || !loadingOrderItems);

  const out =
    product?.tagIds?.includes("2znBi5xWhERHPAtBXDLEy") &&
    reminder <= total - 1 &&
    (!loadingReminder || !loadingOrderItems);

  return (
    <div
      className="group relative w-full cursor-pointer overflow-hidden rounded-[12px] border border-gray-200 transition-opacity duration-200 hover:opacity-90"
      onClick={handleClick}
    >
      {product.tagIds?.includes("fWzbXys3SyHudEjLRCIm2") && (
        <div className="absolute right-0 top-0 z-10 m-2 rounded-sm bg-red-50 px-2 py-1 text-xs text-red-600">
          Онцлох
        </div>
      )}
      <div className="px-5 pt-5">
        <div className="relative flex aspect-[1] w-full items-center justify-center">
          <Image
            src={product.attachment?.url}
            qualityWidth="300"
            alt="product image"
            className="object-cover object-center transition-transform duration-200 group-hover:scale-110"
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
              variant="ghost"
              onClick={onAddToCart}
              disabled={loadingReminder ? true : reminder > 0 ? loading : false}
              className="mt-3 w-full text-primary hover:text-primary"
            >
              <ShoppingCart className="mr-2 size-5" />
              Сагсанд нэмэх
            </Button>
          )}

          {out && (
            <Button
              variant="ghost"
              onClick={onAddToCart}
              disabled={reminder > 0 ? loading : false}
              className="mt-3 w-full text-primary hover:bg-white hover:text-primary"
            >
              Үлдэгдэл дууссан байна.
            </Button>
          )}

          {!availableAddCart && <div className="h-11 w-full" />}
        </div>
      </div>
    </div>
  );
};

export const PrimartProductSkeleton = () => {
  return (
    <div className="w-full cursor-pointer overflow-hidden rounded-[12px] border border-gray-200">
      <Skeleton className="aspect-[4/3] w-full" />

      <div className="flex w-full flex-col items-center gap-y-2 px-3 pb-3 pt-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-11 w-4/5" />
        <Skeleton className="h-9 w-[140px]" />
      </div>
    </div>
  );
};
