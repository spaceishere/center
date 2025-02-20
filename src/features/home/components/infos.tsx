"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { readFile } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

import { useInfos } from "../api/useInfos";

import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";

export const Infos = () => {
  const { infos } = useInfos();

  const router = useRouter();

  const isMedium = useMediaQuery("(min-width: 768px)");
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const isExtraLarge = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="w-full space-y-[32px]" id="infos">
      <SectionTitle title={["Мэдээ", " мэдээлэл"]} />

      <div className="grid w-full grid-cols-2 gap-x-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {infos
          .slice(0, isExtraLarge ? 5 : isLarge ? 4 : isMedium ? 3 : 2)
          .map((article) => (
            <div
              onClick={() => router.push(`/infos/${article._id}`)}
              className="col-span-1 flex cursor-pointer flex-col justify-between overflow-hidden rounded-[12px] border transition-opacity duration-300 hover:opacity-80"
              key={article._id}
            >
              <div className="w-full">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={readFile(article.image?.url)}
                    alt="article"
                    fill
                    className="object-cover object-center"
                    draggable={false}
                  />
                </div>

                <div className="w-full p-3">
                  <p className="line-clamp-3 text-[16px] font-medium">
                    {article.title}
                  </p>
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="content-text mb-3 line-clamp-5 overflow-hidden px-3 text-[12px] text-muted-foreground sm:text-[14px]"
              />
            </div>
          ))}
      </div>

      <div className="grid w-full grid-cols-2 gap-x-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className="hidden md:block" />
        <div className="hidden xl:block" />
        <div className="col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1">
          <div className="xl: mx-auto w-1/2 md:w-full lg:w-1/2 xl:w-full">
            <Button variant={"outline"} className="w-full" asChild>
              <Link href={"/infos"}>Бүх мэдээ</Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:block" />
      </div>
    </div>
  );
};
