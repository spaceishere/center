"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { readFile } from "@/lib/utils";

import { useContents } from "../api/useContents";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { ChevronLeft, ChevronRight } from "lucide-react";

export const OtherAdvices = () => {
  const { contents } = useContents("G4XLRhzClxZovqMVXYb9H", 20);

  const router = useRouter();
  const [hyd, setHyd] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHyd(true);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 400;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!hyd) return;

  return (
    <div className="w-full space-y-6" id="advices">
      <p className="text-xl font-semibold">Бусад зөвлөгөө</p>

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
              onClick={() => router.push(`/advices/${article._id}`)}
              className="flex w-[calc((100%-80px)/5)] min-w-[200px] flex-shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-[12px] border transition-opacity duration-300 hover:opacity-80"
              key={article._id}
            >
              <div className="w-full">
                <div className="relative aspect-[6/5] w-full">
                  <Image
                    src={
                      readFile(article.attachments?.[0]?.url) ||
                      article.image?.url ||
                      "/fallback-image.jpg"
                    }
                    alt="article"
                    fill
                    className="object-cover object-center"
                    draggable={false}
                  />
                </div>

                <div className="flex-1 p-3">{article.title}</div>
              </div>

              <div className="mt-auto flex w-full items-center justify-between border-t border-gray-300 p-3">
                <div className="flex items-center gap-x-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-gray-100 sm:size-8">
                    {/* <User className="size-3 text-gray-600 sm:size-4" /> */}
                    <Avatar>
                      <AvatarImage src={readFile(article.image?.url)} />
                    </Avatar>
                  </div>
                  <div className="text-[10px] sm:text-[12px]">
                    {(() => {
                      const cleanText = article.content
                        .split("<br>")[0]
                        .replace(/<[^>]*>/g, "")
                        .trim();
                      const match = cleanText.match(/^(.*?)([А-Я]\.)\s+(\S+)/);

                      if (match) {
                        const position = match[1].trim();
                        const abbreviatedSurname = match[2];
                        const fullName = match[3];

                        return (
                          <>
                            <p className="text-[10px] font-semibold sm:text-[12px]">{`${abbreviatedSurname} ${fullName}`}</p>
                            <p className="text-[10px] sm:text-[12px]">
                              {position}
                            </p>
                          </>
                        );
                      } else {
                        return <p>{cleanText}</p>;
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
