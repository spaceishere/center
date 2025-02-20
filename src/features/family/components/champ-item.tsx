"use client";

import Image from "next/image";
import { readFile } from "@/lib/utils";

interface ChampItemProps {
  name: string;
  content: string;
  pro: string;
  image: string | undefined;
}

export const ChampItem = ({ name, content, pro, image }: ChampItemProps) => {
  return (
    <div className="h-[220px] w-[320px] min-w-[320px] space-y-7 rounded-lg border border-gray-200 p-5">
      <div className="flex items-center gap-x-4">
        <div className="flex items-center justify-center rounded-full bg-emerald-400 p-0.5">
          <Image src={readFile(image)} alt="champ" width={50} height={50} />
        </div>

        <div className="space-y-1">
          <p>{name}</p>
          <p className="text-muted-foreground">{pro}</p>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="text-[14px] leading-[22px] text-muted-foreground"
      />
    </div>
  );
};
