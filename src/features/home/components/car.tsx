"use client";

import Image from "next/image";
import Link from "next/link";

import { useCarProducts } from "../api/useCarProducts";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const Car = () => {
  const { products } = useCarProducts();

  const getPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "MNT",
      currencyDisplay: "narrowSymbol",
    }).format(price);
  };

  return (
    <div className="relative my-10 hidden aspect-[7/2] w-full overflow-hidden md:block">
      <Image
        fill
        src="/assets/home/prius.png"
        className="scale-[2] object-contain object-center"
        alt="car"
        draggable={false}
      />

      <HoverCard openDelay={300}>
        <HoverCardTrigger className="absolute bottom-[43%] left-[17%]">
          <div className="h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-primary lg:size-9 lg:border-[6.5px]"></div>
        </HoverCardTrigger>

        <HoverCardContent side="top" className="space-y-3">
          <h3 className="mb-2 font-bold">{products?.[3]?.name || ""}</h3>

          <div className="text-muted-foreground">
            Үнэ: {getPrice(products?.[3]?.unitPrice || 0)}
          </div>

          <Button asChild>
            <Link
              href={products?.[3] ? `/products/${products[3]._id}` : "/primart"}
            >
              дэлгүүр хэсэх
            </Link>
          </Button>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={300}>
        <HoverCardTrigger className="absolute bottom-[24%] left-[18%]">
          <div className="h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-primary lg:size-9 lg:border-[6.5px]"></div>
        </HoverCardTrigger>

        <HoverCardContent side="top" className="space-y-3">
          <h3 className="mb-2 font-bold">{products?.[1]?.name || ""}</h3>

          <div className="text-muted-foreground">
            Үнэ: {getPrice(products?.[1]?.unitPrice || 0)}
          </div>
          <Button asChild>
            <Link
              href={products?.[1] ? `/products/${products[1]._id}` : "/primart"}
            >
              дэлгүүр хэсэх
            </Link>
          </Button>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={300}>
        <HoverCardTrigger className="absolute bottom-[50%] left-[22.5%]">
          <div className="h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-primary lg:size-9 lg:border-[6.5px]"></div>
        </HoverCardTrigger>

        <HoverCardContent side="top" className="space-y-3">
          <h3 className="mb-2 font-bold">{products?.[4]?.name || ""}</h3>

          <div className="text-muted-foreground">
            Үнэ: {getPrice(products?.[4]?.unitPrice || 0)}
          </div>
          <Button asChild>
            <Link
              href={products?.[4] ? `/products/${products[4]._id}` : "/primart"}
            >
              дэлгүүр хэсэх
            </Link>
          </Button>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={300}>
        <HoverCardTrigger className="absolute bottom-[46%] left-[27%]">
          <div className="h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-primary lg:size-9 lg:border-[6.5px]"></div>
        </HoverCardTrigger>

        <HoverCardContent side="top" className="space-y-3">
          <h3 className="mb-2 font-bold">{products?.[5]?.name || ""}</h3>

          <div className="text-muted-foreground">
            Үнэ: {getPrice(products?.[5]?.unitPrice || 0)}
          </div>
          <Button asChild>
            <Link
              href={products?.[5] ? `/products/${products[5]._id}` : "/primart"}
            >
              дэлгүүр хэсэх
            </Link>
          </Button>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={300}>
        <HoverCardTrigger className="absolute bottom-[16%] left-[26.8%]">
          <div className="h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-primary lg:size-9 lg:border-[6.5px]"></div>
        </HoverCardTrigger>

        <HoverCardContent side="top" className="space-y-3">
          <h3 className="mb-2 font-bold">{products?.[9]?.name || ""}</h3>

          <div className="text-muted-foreground">
            Үнэ: {getPrice(products?.[9]?.unitPrice || 0)}
          </div>
          <Button asChild>
            <Link
              href={products?.[9] ? `/products/${products[9]._id}` : "/primart"}
            >
              дэлгүүр хэсэх
            </Link>
          </Button>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={300}>
        <HoverCardTrigger className="absolute bottom-[74%] left-[37%]">
          <div className="h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-primary lg:size-9 lg:border-[6.5px]"></div>
        </HoverCardTrigger>

        <HoverCardContent side="top" className="space-y-3">
          <h3 className="mb-2 font-bold">{products?.[10]?.name || ""}</h3>

          <div className="text-muted-foreground">
            Үнэ: {getPrice(products?.[0]?.unitPrice || 0)}
          </div>
          <Button asChild>
            <Link
              href={
                products?.[10] ? `/products/${products[10]._id}` : "/primart"
              }
            >
              дэлгүүр хэсэх
            </Link>
          </Button>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={300}>
        <HoverCardTrigger className="absolute bottom-[60%] left-[37%]">
          <div className="h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-primary lg:size-9 lg:border-[6.5px]"></div>
        </HoverCardTrigger>

        <HoverCardContent side="top" className="space-y-3">
          <h3 className="mb-2 font-bold">{products?.[6]?.name || ""}</h3>

          <div className="text-muted-foreground">
            Үнэ: {getPrice(products?.[6]?.unitPrice || 0)}
          </div>
          <Button asChild>
            <Link
              href={products?.[6] ? `/products/${products[6]._id}` : "/primart"}
            >
              дэлгүүр хэсэх
            </Link>
          </Button>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={300}>
        <HoverCardTrigger className="absolute bottom-[38%] right-[55%]">
          <div className="h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-primary lg:size-9 lg:border-[6.5px]"></div>
        </HoverCardTrigger>

        <HoverCardContent side="top" className="space-y-3">
          <h3 className="mb-2 font-bold">{products?.[7]?.name || ""}</h3>

          <div className="text-muted-foreground">
            Үнэ: {getPrice(products?.[7]?.unitPrice || 0)}
          </div>
          <Button asChild>
            <Link
              href={products?.[7] ? `/products/${products[7]._id}` : "/primart"}
            >
              дэлгүүр хэсэх
            </Link>
          </Button>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={300}>
        <HoverCardTrigger className="absolute bottom-[38%] right-[38%]">
          <div className="h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-primary lg:size-9 lg:border-[6.5px]"></div>
        </HoverCardTrigger>

        <HoverCardContent side="top" className="space-y-3">
          <h3 className="mb-2 font-bold">{products?.[8]?.name || ""}</h3>

          <div className="text-muted-foreground">
            Үнэ: {getPrice(products?.[8]?.unitPrice || 0)}
          </div>
          <Button asChild>
            <Link
              href={products?.[8] ? `/products/${products[8]._id}` : "/primart"}
            >
              дэлгүүр хэсэх
            </Link>
          </Button>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={300}>
        <HoverCardTrigger className="absolute bottom-[17%] right-[25%]">
          <div className="h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-primary lg:size-9 lg:border-[6.5px]"></div>
        </HoverCardTrigger>

        <HoverCardContent side="top" className="space-y-3">
          <h3 className="mb-2 font-bold">{products?.[9]?.name || ""}</h3>

          <div className="text-muted-foreground">
            Үнэ: {getPrice(products?.[9]?.unitPrice || 0)}
          </div>
          <Button asChild>
            <Link
              href={products?.[9] ? `/products/${products[9]._id}` : "/primart"}
            >
              дэлгүүр хэсэх
            </Link>
          </Button>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={300}>
        <HoverCardTrigger className="absolute bottom-[79%] right-[23%]">
          <div className="h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-primary lg:size-9 lg:border-[6.5px]"></div>
        </HoverCardTrigger>

        <HoverCardContent side="top" className="space-y-3">
          <h3 className="mb-2 font-bold">{products?.[0]?.name || ""}</h3>

          <div className="text-muted-foreground">
            Үнэ: {getPrice(products?.[0]?.unitPrice || 0)}
          </div>
          <Button asChild>
            <Link
              href={products?.[0] ? `/products/${products[0]._id}` : "/primart"}
            >
              дэлгүүр хэсэх
            </Link>
          </Button>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={300}>
        <HoverCardTrigger className="absolute bottom-[30%] right-[16%]">
          <div className="h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-primary lg:size-9 lg:border-[6.5px]"></div>
        </HoverCardTrigger>

        <HoverCardContent side="top" className="space-y-3">
          <h3 className="mb-2 font-bold">{products?.[2]?.name || ""}</h3>

          <div className="text-muted-foreground">
            Үнэ: {getPrice(products?.[2]?.unitPrice || 0)}
          </div>
          <Button asChild>
            <Link
              href={products?.[2] ? `/products/${products[2]._id}` : "/primart"}
            >
              дэлгүүр хэсэх
            </Link>
          </Button>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
