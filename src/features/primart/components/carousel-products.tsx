"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PrimartProduct, PrimartProductSkeleton } from "./primart-product";

import { TProduct } from "../types";

interface CarouselProductsProps {
  products: TProduct[];
}

export const CarouselProducts = ({ products }: CarouselProductsProps) => {
  return (
    <div className="flex w-full justify-center">
      <Carousel
        className="w-full max-w-[80%] sm:max-w-[85%] md:max-w-[90%] lg:max-w-[92%]"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {products?.filter(Boolean)?.map((product) => (
            <CarouselItem
              className="basis-[45%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              key={product._id}
            >
              <PrimartProduct product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export const CarouselProductsSkeleton = () => {
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
