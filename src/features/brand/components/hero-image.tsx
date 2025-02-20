"use client";

import Image from "next/image";

import { readFile } from "@/lib/utils";

interface HeroImageProps {
  imageSrc: string | null;
}

export const HeroImage = ({ imageSrc }: HeroImageProps) => {
  return (
    <div className="relative aspect-[1/1] w-full lg:w-auto lg:flex-1">
      <Image
        src={imageSrc ? readFile(imageSrc) : "/assets/image-placeholder.png"}
        alt="product detail image"
        className="rounded-lg object-cover object-center"
        fill
      />
    </div>
  );
};
