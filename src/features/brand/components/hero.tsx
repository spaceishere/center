"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroImage } from "./hero-image";
import { useBrandCategories } from "../api/useBrandCategories";
import { CategoryPreviewImage } from "./category-preview-image";

export const Hero = ({
  activeId,
  pId,
}: {
  activeId?: string;
  pId?: string;
}) => {
  const { categories } = useBrandCategories();

  if (categories.length === 0) return null;

  const selectedCat =
    categories.find((cat) => cat?._id === pId) || categories?.[0];

  return (
    <div className="grid w-full gap-x-14 gap-y-5 pb-20 pt-14 md:grid-cols-[6fr,7fr]">
      <div className="col-span-1 flex h-full flex-wrap items-start gap-x-5 gap-y-6 lg:justify-center">
        <div className="grid grid-cols-3 gap-x-8 gap-y-5 sm:gap-x-10 lg:order-first lg:grid-flow-col lg:grid-cols-none lg:grid-rows-3 lg:gap-x-5">
          {categories.map((cat) => (
            <CategoryPreviewImage
              data={cat}
              key={cat._id}
              activeId={activeId}
              pId={pId}
            />
          ))}
        </div>

        <HeroImage imageSrc={selectedCat?.imageSrc} />
      </div>

      <div className="col-span-1 space-y-5 pb-10 md:py-[60px]">
        <p className="text-2xl font-semibold text-primary"></p>
        {selectedCat?.name || ""}
        <p className="text-xl">{selectedCat?.description}</p>

        <Button asChild>
          <Link href={"/primart"}>Примарт</Link>
        </Button>
      </div>
    </div>
  );
};

export const HeroSkeleton = () => {
  return (
    <div className="grid w-full gap-x-14 gap-y-5 md:grid-cols-9">
      <div className="col-span-1 flex h-full items-center md:col-span-4">
        <Skeleton className="aspect-[8/5] w-full bg-gray-100" />
      </div>

      <div className="col-span-1 space-y-3 pb-10 md:col-span-5 md:py-[60px]">
        <Skeleton className="h-8 w-[170px]" />
        <Skeleton className="h-7 w-[280px]" />
        <Skeleton className="h-4 w-[340px]" />

        <Skeleton className="h-14 w-[200px]" />
        <Skeleton className="h-14 w-[200px]" />

        <Skeleton className="h-10 w-[120px]" />
      </div>
    </div>
  );
};
