"use client";

import { cn, readFile } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { revalidate } from "../api/revalidate";

interface CategoryPreviewImageProps {
  data: {
    _id: string;
    name: string;
    imageSrc: string | null;
    description: string;
  };
  activeId?: string;
  pId?: string;
}

export const CategoryPreviewImage = ({
  data,
  activeId,
}: CategoryPreviewImageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = () => {
    router.replace(
      `/brand?${activeId ? `activeId=${activeId}&` : ""}${`pId=${data._id}`}`,
    );

    router.refresh();

    revalidate();
  };

  return (
    <div
      className={cn(
        "aspect-square w-20 cursor-pointer border border-gray-300 p-1 transition duration-200 hover:bg-gray-100 lg:w-28 xl:w-32 2xl:w-36",
        searchParams.get("pId") === data._id && "bg-gray-100",
      )}
      key={data._id}
      onClick={onClick}
    >
      <div className="relative size-full">
        <Image
          src={
            data?.imageSrc
              ? readFile(data?.imageSrc)
              : "/assets/image-placeholder.png"
          }
          alt="product detail image"
          fill
        />
      </div>
    </div>
  );
};
