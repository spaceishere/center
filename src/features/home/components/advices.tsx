"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { readFile } from "@/lib/utils";

import { SectionTitle } from "@/components/section-title";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";

import { User } from "lucide-react";

import { useAdvices } from "../api/useAdvices";

export const Advices = () => {
  const { advices } = useAdvices();

  const router = useRouter();

  const isMedium = useMediaQuery("(min-width: 768px)");
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const isExtraLarge = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="w-full space-y-[32px]" id="advices">
      <SectionTitle title={["Приус Центр", " зөвлөж байна"]} />

      <div className="grid w-full grid-cols-2 gap-x-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {advices
          .slice(0, isExtraLarge ? 5 : isLarge ? 4 : isMedium ? 3 : 2)
          .map((article) => (
            <div
              onClick={() => router.push(`/advices/${article._id}`)}
              className="col-span-1 flex cursor-pointer flex-col justify-between overflow-hidden rounded-[12px] border transition-opacity duration-300 hover:opacity-80"
              key={article._id}
            >
              <div className="w-full">
                <div className="relative aspect-[6/5] w-full">
                  <Image
                    src={readFile(article.image?.url)}
                    alt="article"
                    fill
                    className="object-cover object-center"
                    draggable={false}
                  />
                </div>

                <div className="flex-1 p-3 text-[14px] font-medium">
                  {article.title}
                </div>
              </div>

              <div className="mt-auto flex w-full items-center justify-between border-t border-gray-300 p-3">
                <div className="flex items-center gap-x-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-gray-100 sm:size-8">
                    <User className="size-3 text-gray-600 sm:size-4" />
                  </div>
                  <div className="text-[10px] sm:text-[12px]">
                    {/* <p>Ахлах инженер Д.Санжжав</p> */}
                    <p>{article.code}</p>
                  </div>
                </div>

                {/* <Badge className="hidden bg-[#EBFFE4] text-primary sm:flex">
                  Видео
                </Badge> */}
              </div>
            </div>
          ))}
      </div>

      <div className="grid w-full grid-cols-2 gap-x-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className="hidden md:block" />
        <div className="hidden xl:block" />
        <div className="col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1">
          <div className="xl: mx-auto w-1/2 md:w-full lg:w-1/2 xl:w-full">
            <Button variant={"outline"} className="w-full" asChild>
              <Link href={"/advices"}>Бүх зөвлөгөө</Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:block" />
      </div>
    </div>
  );
};
