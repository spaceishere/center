"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

import { SectionTitle } from "./section-title";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export const ContentsSkeleton = ({
  limit,
  buttonLabel,
  titles,
}: {
  limit?: number;
  buttonLabel?: string;
  titles: [string, string];
}) => {
  const isMedium = useMediaQuery("(min-width: 768px)");
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const isExtraLarge = useMediaQuery("(min-width: 1280px)");

  const [hyd, setHyd] = useState(false);

  useEffect(() => {
    setHyd(true);
  }, []);

  if (!hyd) return;

  return (
    <div className="w-full space-y-[50px]">
      <SectionTitle title={titles} />

      <div className="grid w-full grid-cols-2 gap-x-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {new Array(5)
          .fill("")
          .slice(
            0,
            limit ? 5 : isExtraLarge ? 5 : isLarge ? 4 : isMedium ? 3 : 2,
          )
          .map((_, index) => (
            <Skeleton
              className="col-span-1 flex w-full flex-col overflow-hidden rounded-[12px] bg-gray-100"
              key={index}
            >
              <Skeleton className="aspect-[3/2] w-full bg-gray-300" />

              <div className="p-3">
                <Skeleton className="mb-12 h-[30px] w-[100px] bg-gray-300" />

                <Skeleton className="flex w-full items-center justify-between p-3">
                  <div className="flex items-center gap-x-2">
                    <Skeleton className="size-6 rounded-full bg-gray-300 sm:size-8" />
                    <Skeleton className="h-8 w-20 bg-gray-300 sm:h-10 sm:w-[100px] md:w-20 lg:w-[100px]" />
                  </div>

                  <Skeleton className="h-8 w-10 bg-gray-300" />
                </Skeleton>
              </div>
            </Skeleton>
          ))}
      </div>

      {buttonLabel && (
        <div className="mx-auto w-[250px] md:w-[339px]">
          <Button disabled={true} className="w-full bg-primary">
            Бүх зөвлөгөө
          </Button>
        </div>
      )}
    </div>
  );
};

export const ContentDetailSkeleton = () => {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8">
      <Skeleton className="h-10 w-3/4 max-w-2xl" />

      <div className="flex flex-wrap items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-40" />
      </div>

      <Skeleton className="aspect-video w-full rounded-lg" />

      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-4/5" />
      </div>

      <OtherContentsSkeleton />
    </div>
  );
};

export const OtherContentsSkeleton = () => {
  const isMedium = useMediaQuery("(min-width: 768px)");
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const isExtraLarge = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="w-full space-y-[50px]">
      <div className="grid w-full grid-cols-2 gap-x-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {new Array(5)
          .fill("")
          .slice(0, isExtraLarge ? 5 : isLarge ? 4 : isMedium ? 3 : 2)
          .map((_, index) => (
            <Skeleton
              className="col-span-1 flex w-full flex-col overflow-hidden rounded-[12px] bg-gray-100"
              key={index}
            >
              <Skeleton className="aspect-[3/2] w-full bg-gray-300" />

              <div className="p-3">
                <Skeleton className="mb-12 h-[30px] w-[100px] bg-gray-300" />

                <Skeleton className="flex w-full items-center justify-between p-3">
                  <div className="flex items-center gap-x-2">
                    <Skeleton className="size-6 rounded-full bg-gray-300 sm:size-8" />
                    <Skeleton className="h-8 w-20 bg-gray-300 sm:h-10 sm:w-[100px] md:w-20 lg:w-[100px]" />
                  </div>

                  <Skeleton className="h-8 w-10 bg-gray-300" />
                </Skeleton>
              </div>
            </Skeleton>
          ))}
      </div>
    </div>
  );
};
