"use client";

import { TProduct } from "../types";
import { CarouselProducts } from "./carousel-products";
import { useProductHistory } from "@/features/primart/store/useProductHistory";

export const LatestProducts = () => {
  const { products } = useProductHistory();

  return (
    <div className="w-full space-y-8">
      <p>Үзсэн барааны түүх</p>

      {products.length === 0 ? (
        <div className="flex w-full items-center justify-center rounded-xl border-2 border-dashed py-14">
          <p className="text-primary">Үзсэн барааны мэдээлэл алга</p>
        </div>
      ) : (
        <CarouselProducts products={products as TProduct[]} />
      )}
    </div>
  );
};
