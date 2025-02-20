"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PrimartProductSkeleton } from "./primart-product";
import { CarouselProducts } from "./carousel-products";

import { TProduct } from "../types";

interface RelatedProductsContentProps {
  products: TProduct[];
}

export const RelatedProductsContent = ({
  products,
}: RelatedProductsContentProps) => {
  return (
    <div className="w-full space-y-8">
      <p>Төсөөтэй бараанууд</p>

      <CarouselProducts products={products} />
    </div>
  );
};

export const RelatedProductsContentSkeleton = () => {
  return (
    <div className="w-full space-y-8">
      <p>Төсөөтэй бараанууд</p>

      <div className="flex w-full justify-center">
        <Carousel
          className="w-full sm:max-w-[85%] md:max-w-[90%] lg:max-w-[92%]"
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {new Array(6).fill("").map((_, index) => (
              <CarouselItem
                className="basis-[45%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                key={index}
              >
                <PrimartProductSkeleton />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
