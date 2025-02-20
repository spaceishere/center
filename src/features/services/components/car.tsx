import Image from "next/image";
import { cn } from "@/lib/utils";
import qs from "query-string";

import { Button } from "@/components/ui/button";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { uploadedCarImagesCode } from "@/features/profile/constant";

export const Car = ({
  data,
  searchParams,
}: {
  data: {
    id: string;
    number: string;
    catId: string;
    category: { code?: string };
    colorCode?: string;
  };
  searchParams: {
    catId?: string;
    carId?: string;
  };
}) => {
  const router = useRouter();

  const splitStr = data?.category?.code?.split(" ") || [];
  const validCode = splitStr?.length > 1 ? splitStr[1] : "";

  const isValidCode = uploadedCarImagesCode?.includes(validCode);

  const carColorCode = data?.colorCode;

  const url = isValidCode
    ? {
        uri:
          "https://erxes.priuscenter.mn/gateway" +
          "/read-file?key=priuscenter/" +
          validCode +
          "_" +
          (carColorCode !== ""
            ? carColorCode?.replace("#", "")
            : "ffffff" + ".png"),
      }
    : {
        uri: "https://erxes.priuscenter.mn/gateway/read-file?key=priuscenter/pr30_ffffff.png&width=600",
      };

  const onSelect = () => {
    const urlParams = { ...searchParams, carId: data.id };

    const url = qs.stringifyUrl({ url: "/services", query: urlParams });

    router.replace(url);
  };

  return (
    <div
      className={cn(
        "relative w-full cursor-pointer space-y-2 rounded-[10px] border bg-white",

        data.id === searchParams?.carId && "bg-primary/10",
      )}
      onClick={onSelect}
    >
      <div className="w-full px-2 pt-3">
        <div className="relative aspect-video w-full">
          {data.id === searchParams?.carId && (
            <Check className="absolute right-3 size-5 text-primary" />
          )}
          <Image
            src={url.uri}
            fill
            draggable={false}
            alt="car"
            className="object-contain object-center"
          />
        </div>
      </div>

      <Button className="w-full rounded-t-[20px] hover:bg-primary">
        {data.number}
      </Button>
    </div>
  );
};
