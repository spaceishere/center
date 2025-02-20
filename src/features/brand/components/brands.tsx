import Link from "next/link";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BrandsContent } from "./brands-content";
import { getProducts } from "@/features/primart/api/getProducts";
import { getBrandCategories } from "../api/getBrandCategories";

export const Brands = async ({ activeId }: { activeId?: string }) => {
  const { categories } = await getBrandCategories();

  const { products } = await getProducts({
    page: 1,
    perPage: 8,
    categoryId: activeId ? activeId : categories?.[0]?.id,
  });

  return (
    <BrandsContent
      data={products || []}
      activeId={activeId}
      categories={categories}
    />
  );
};

export const BrandsSkeleton = () => {
  return (
    <div className="space-y-6">
      <p className="w-full pb-3 text-center text-[45px] font-semibold sm:text-[60px]">
        Приус <span className="text-primary">брэнд</span>
      </p>

      <div className="flex w-full items-center justify-center">
        <Button className="h-[35px] w-[75px] rounded-full">Vic</Button>
        <Button className="h-[35px] w-[75px] rounded-full" variant={"ghost"}>
          Prior
        </Button>
        <Button className="h-[35px] w-[75px] rounded-full" variant={"ghost"}>
          Sakura
        </Button>
      </div>

      <div className="grid w-full grid-cols-2 gap-x-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {new Array(5).fill("").map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex-col overflow-hidden rounded-[12px] border border-gray-200",
              index === 0 && "flex",
              index === 1 && "flex",
              index === 2 && "hidden sm:flex",
              index === 3 && "hidden lg:flex",
              index === 4 && "hidden xl:flex",
            )}
          >
            <Skeleton className="aspect-[16/11] w-full" />
            <div className="flex w-full flex-col items-center p-4">
              <Skeleton className="mb-1 h-6 w-[140px]" />
              <Skeleton className="mb-2 h-4 w-[100px]" />
              <Skeleton className="mb-3 h-8 w-[180px]" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center">
        <Button asChild variant={"outline"}>
          <Link href={"/primart"}>Бүх барааг харах</Link>
        </Button>
      </div>
    </div>
  );
};
