"use client";

import { useImage } from "@/features/home/api/useImage";
import Image from "next/image";

export const List = () => {
  const { faqs } = useImage();
  const article = faqs[0];

  return (
    <div>
      {article?.image?.url && (
        <Image
          src="/assets/history.png"
          alt="article"
          width={1500}
          height={600}
          className="object-cover"
          draggable={false}
          quality={100}
        />
      )}
    </div>
  );
};
