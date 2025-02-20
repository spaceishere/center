"use client";

import { PrimartProduct, PrimartProductSkeleton } from "./primart-product";

import { TProduct } from "../types";

interface ProductsContentProps {
  products: TProduct[];
}

export const ProductsContent = ({ products }: ProductsContentProps) => {
  return (
    <div className="grid w-full grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {products.map((product) => (
        <PrimartProduct product={product} key={product._id} />
      ))}
    </div>
  );
};

export const ProductsSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {new Array(12).fill("").map((_, index) => (
        <PrimartProductSkeleton key={index} />
      ))}
    </div>
  );
};
