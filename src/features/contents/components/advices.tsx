"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { readFile } from "@/lib/utils";

import { useContents } from "../api/useContents";

import { SectionTitle } from "@/components/section-title";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const Advices = ({ limit }: { limit?: number }) => {
  const { contents } = useContents("G4XLRhzClxZovqMVXYb9H", limit);

  const router = useRouter();
  const pathname = usePathname();

  const isMedium = useMediaQuery("(min-width: 768px)");
  const isLarge = useMediaQuery("(min-width: 1024px)");

  const isExtraLarge = useMediaQuery("(min-width: 1280px)");

  const [hyd, setHyd] = useState(false);

  useEffect(() => {
    setHyd(true);
  }, []);

  if (!hyd) return;

  return (
    <div className="w-full space-y-[30px]" id="advices">
      <SectionTitle title={["Таны", " машинд"]} />

      <div className="flex w-full flex-col items-end space-y-3">
        {!limit && pathname !== "/advices/all" && (
          <p
            onMouseEnter={() => router.prefetch("/advices/all")}
            onClick={() => router.push("/advices/all")}
            className="w-max cursor-pointer text-end text-primary underline"
          >
            Бүх зөвлөгөөг үзэх
          </p>
        )}
        <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {contents
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
                      src={
                        readFile(
                          article.attachments?.[0]?.url || article.image?.url,
                        ) || "/fallback-image.jpg"
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
                        const match = cleanText.match(
                          /^(.*?)([А-Я]\.)\s+(\S+)/,
                        );

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
