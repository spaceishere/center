"use client";

import Image from "next/image";
import { readFile } from "@/lib/utils";
import { useCul } from "@/features/home/api/useCulture";

export const Culture = () => {
  const { faqs } = useCul();
  const visibleFaqs = faqs.slice(0, 6);

  return (
    <div className="w-full space-y-[40px]" id="faq">
      <div className="grid grid-cols-1 gap-5 gap-y-[30px] sm:gap-x-8 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-[50px]">
        {visibleFaqs.map((item, index) => (
          <div key={item._id} className="flex flex-col space-y-4">
            <div className="relative aspect-square w-full">
              {item.image?.url && (
                <Image
                  src={readFile(item.image.url)}
                  alt="article"
                  fill
                  className="object-cover object-center"
                  draggable={false}
                />
              )}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: item.content }}
              className="content-text font-normal text-[#667085]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
