"use client";

import Image from "next/image";
import { readFile } from "@/lib/utils";

import { useWhyAttends } from "../api/useWhyAttends";

import { Skeleton } from "@/components/ui/skeleton";
import { SectionTitle } from "@/components/section-title";

export const WhyAttend = () => {
  const { whyAttends } = useWhyAttends();

  return (
    <div className="w-full space-y-8" id="why-attend">
      <SectionTitle title={["Яагаад биднийг ", "сонгох вэ ?"]} />

      <div className="w-full snap-x snap-mandatory overflow-x-auto">
        <div className="flex w-max items-center gap-x-3 lg:flex lg:w-full">
          {whyAttends.map((item) => (
            <div
              className="nap-start relative aspect-[3/2] w-[340px] flex-1 snap-always overflow-hidden rounded-xl sm:w-[400px] lg:aspect-[9/10] lg:w-auto xl:aspect-[3/2] 2xl:aspect-[2/1]"
              key={item._id}
            >
              <div className="xl:-6 absolute left-0 top-0 z-[1] flex h-full w-full flex-col bg-black/70 p-6 lg:p-[18px] xl:p-6">
                <p className="line-clamp-1 text-[18px] font-semibold text-white lg:text-base xl:text-[18px]">
                  {item.title}
                </p>

                <div
                  dangerouslySetInnerHTML={{ __html: item.content }}
                  className="mt-2 text-white"
                />
              </div>

              <Image
                src={readFile(item?.image?.url)}
                alt="why attend image"
                className="object-cover object-center"
                fill
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const WhyAttendSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      <p className="text-center text-3xl font-semibold md:text-4xl">
        <span className="text-primary">Яагаад биднийг </span>сонгох вэ ?
      </p>

      <div className="w-full snap-x snap-mandatory overflow-x-auto">
        <div className="flex w-max grid-cols-4 gap-5 space-x-4 lg:grid lg:w-full">
          {new Array(4).fill("").map((_, index) => (
            <Skeleton
              className="relative col-span-1 flex aspect-[2/1] h-full w-[340px] snap-start snap-always flex-col justify-between overflow-hidden rounded-xl bg-gray-100 p-6 sm:w-[400px] lg:w-auto"
              key={index}
            >
              <Skeleton className="h-[20px] w-1/3 bg-gray-300" />

              <Skeleton className="h-[40px] w-3/4 bg-gray-300" />
            </Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
};
