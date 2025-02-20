"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Button } from "@/components/ui/button";
import { Product } from "./product";

import { TProduct } from "@/features/primart/types";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface BrandsContentProps {
  data: TProduct[];
  activeId?: string;
  categories: any[];
}

export const BrandsContent = ({
  data,
  activeId,
  categories,
}: BrandsContentProps) => {
  const isSmall = useMediaQuery("(min-width: 640px)");
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const isExtraLarge = useMediaQuery("(min-width: 1280px)");
  const isDoubleExtraLarge = useMediaQuery("(min-width: 1536px)");

  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <p className="w-full pb-3 text-center text-[40px] font-semibold sm:text-[50px]">
        Приус <span className="text-primary">брэнд</span>
      </p>

      <div className="flex w-full items-center justify-center">
        {categories?.map((category, index) => (
          <Button
            asChild
            className="h-[35px] w-auto rounded-full"
            key={category._id}
            variant={
              category._id === activeId
                ? "default"
                : !activeId && index === 0
                  ? "default"
                  : "ghost"
            }
          >
            <Link scroll={false} href={`${pathname}?activeId=${category._id}`}>
              {category.name}
            </Link>
          </Button>
        ))}
      </div>

      <Swiper
        slidesPerView={
          isDoubleExtraLarge
            ? 5
            : isExtraLarge
              ? 4
              : isLarge
                ? 3
                : isSmall
                  ? 2
                  : 1
        }
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        style={{
          padding: "0px 100px",
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={index}
            className={cn(
              "group cursor-pointer flex-col overflow-hidden rounded-[12px] border border-gray-200 transition-transform duration-200 hover:scale-110",
            )}
            onClick={() => router.push(`/products/${item._id}`)}
          >
            <Product product={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex w-full justify-center">
        <Button asChild variant={"outline"}>
          <Link
            href={`/primart${activeId ? `?catId=${activeId}` : `?catId=${categories?.[0]._id}`}`}
            // href={`/products${activeId ? `?catId=${activeId}` : `?catId=${brandCategories[0].id}`}`}
          >
            Бүх барааг харах
          </Link>
        </Button>
      </div>
    </div>
  );
};
