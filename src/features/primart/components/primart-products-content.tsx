"use client";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Button } from "@/components/ui/button";
import { PrimartProduct, PrimartProductSkeleton } from "./primart-product";

import { TProduct } from "../types";
import { useState } from "react";

interface PrimartProductsContentProps {
  products: TProduct[];
  products2: TProduct[];
}

export const PrimartProductsContent = ({
  products,
  products2,
}: PrimartProductsContentProps) => {
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const isExtraLarge = useMediaQuery("(min-width: 1280px)");
  const [isHot, setIsHot] = useState(true);

  const displayedProducts = isHot ? products : products2;

  return (
    <div className="w-full space-y-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-3 text-lg font-medium">
          <p
            className={`cursor-pointer ${isHot ? "text-primary" : ""}`}
            onClick={() => setIsHot(true)}
          >
            Эрэлттэй бараа
          </p>
          <p>|</p>
          <p
            className={`cursor-pointer ${!isHot ? "text-primary" : ""}`}
            onClick={() => setIsHot(false)}
          >
            Хүргэлттэй бараа
          </p>
        </div>

        <Button variant={"ghost"}>
          <Link href={"/products"}>Бүх барааг үзэх</Link>
        </Button>
      </div>

      <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {displayedProducts
          .slice(0, isExtraLarge ? 10 : isLarge ? 8 : 6)
          .map((product) => (
            <PrimartProduct product={product} key={product._id} />
          ))}
      </div>
    </div>
  );
};

export const PrimartProductsContentSkeleton = () => {
  return (
    <div className="w-full space-y-8">
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-medium">Эрэлттэй бараа</p>

        <Button variant={"ghost"}>
          <Link href={"/products"}>Бүх барааг үзэх</Link>
        </Button>
      </div>

      <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {new Array(6).fill("").map((_, index) => (
          <PrimartProductSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
