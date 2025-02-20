"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { readFile } from "@/lib/utils";

import { useInfos } from "../api/useInfos";

import { SectionTitle } from "@/components/section-title";

export const Infos = ({ limit }: { limit?: number }) => {
  const { infos } = useInfos(limit);

  const router = useRouter();
  const pathname = usePathname();

  const isMedium = useMediaQuery("(min-width: 768px)");
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const isExtraLarge = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="w-full space-y-12" id="infos">
      <SectionTitle title={["Мэдээ", " мэдээлэл"]} />

      <div className="flex w-full flex-col items-end space-y-3">
        {!limit && pathname !== "/infos/all" && (
          <p
            onMouseEnter={() => router.prefetch("/infos/all")}
            onClick={() => router.push("/infos/all")}
            className="w-max cursor-pointer text-end text-primary underline hover:text-primary-dark transition-colors duration-200"
          >
            Бүх мэдээлэл үзэх
          </p>
        )}

        <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {infos
            .slice(
              0,
              limit ? limit : isExtraLarge ? 5 : isLarge ? 4 : isMedium ? 3 : 2
            )
            .map((article) => (
              <div
                onClick={() => router.push(`/infos/${article._id}`)}
                className="col-span-1 flex cursor-pointer flex-col justify-between overflow-hidden rounded-lg border border-gray-200 transition-all duration-300 hover:opacity-80 hover:shadow-md"
                key={article._id}
              >
                <div className="w-full">
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={readFile(
                        article.attachments?.[0]?.url || article.image?.url
                      )}
                      alt="article"
                      fill
                      className="object-cover object-center"
                      draggable={false}
                    />
                  </div>

                  <div className="flex-1 p-4 text-sm font-medium text-gray-800">
                    {article.title}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
