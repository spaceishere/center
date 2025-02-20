"use client";

import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { readFile } from "@/lib/utils";

import { useContents } from "../api/useContents";

import { ChevronLeft, ChevronRight } from "lucide-react";

export const OtherInfos = () => {
  const { contents } = useContents("ysMj-vvrWv76Y11l07pfH", 1000);

  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 400;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full space-y-6" id="advices">
      <p className="text-xl font-semibold">Бусад Мэдээ</p>

      <div className="relative w-full">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={scrollContainerRef}
          className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 flex w-full gap-x-5 overflow-x-auto px-4 pb-2"
        >
          {contents.map((article) => (
            <div
              onClick={() => router.push(`/infos/${article._id}`)}
              className="flex w-[calc((100%-80px)/5)] min-w-[200px] flex-shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-[12px] border transition-opacity duration-300 hover:opacity-80"
              key={article._id}
            >
              <div className="w-full">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={readFile(
                      article.attachments?.[0]?.url || article.image?.url,
                    )}
                    alt="article"
                    fill
                    className="object-cover object-center"
                    draggable={false}
                  />
                </div>

                <div className="flex-1 p-3">{article.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
