import Image from "next/image";
import { readFile } from "@/lib/utils";

import { getBanners } from "../api/getBanners";

import { Skeleton } from "@/components/ui/skeleton";
import { MobileBannerSlider } from "./mobile-banner-slider";

export const PrimartBanner = async () => {
  const banners = await getBanners();

  return (
    <>
      <div className="hidden grid-cols-2 gap-x-6 lg:grid">
        <div className="relative h-full w-full">
          <Image
            src={readFile(banners[0], "2500")}
            alt="banner 1"
            fill
            className="rounded-lg object-cover object-center"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative col-span-1 aspect-[4/3]">
            <Image
              src={readFile(banners[1], "2500")}
              alt="banner 1"
              fill
              className="rounded-lg object-cover object-center"
            />
          </div>
          <div className="relative col-span-1 aspect-[4/3]">
            <Image
              src={readFile(banners[2], "2500")}
              alt="banner 1"
              fill
              className="rounded-lg object-cover object-center"
            />
          </div>
          <div className="relative col-span-1 aspect-[4/3]">
            <Image
              src={readFile(banners[3], "2500")}
              alt="banner 1"
              fill
              className="rounded-lg object-cover object-center"
            />
          </div>
          <div className="relative col-span-1 aspect-[4/3]">
            <Image
              src={readFile(banners[4], "2500")}
              alt="banner 1"
              fill
              className="rounded-lg object-cover object-center"
            />
          </div>
        </div>
      </div>
      <MobileBannerSlider urls={banners} />
    </>
  );
};

export const PrimartBannerSkeleton = () => {
  return <Skeleton className="aspect-video w-full" />;
};
