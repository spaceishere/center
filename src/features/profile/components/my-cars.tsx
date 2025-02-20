"use client";

import Image from "next/image";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCar } from "@/features/profile/api/useCar";
import { useCarModal } from "@/features/profile/store/useCarModal";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisVertical, List, Trash } from "lucide-react";
import { uploadedCarImagesCode } from "../constant";

interface MyCarsProps {
  cars: {
    id: string;
    number: string;
    catId: string;
    category: { code?: string };
    colorCode?: string;
  }[];
}

export const MyCars = ({ cars }: MyCarsProps) => {
  if (cars.length === 0) {
    return (
      <div className="flex w-full items-center justify-center rounded-2xl border border-dashed py-10">
        <p className="px-10 text-center text-muted-foreground">
          Энэ төрөлийн машин таньд байхгүй байна
        </p>
      </div>
    );
  }
  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {cars.map((car) => (
        <Car data={car} key={car.id} />
      ))}
    </div>
  );
};

const Car = ({
  data,
}: {
  data: {
    id: string;
    number: string;
    catId: string;
    category: { code?: string };
    colorCode?: string;
  };
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { carDelete } = useCar();

  const { onOpen } = useCarModal();

  const onDelete = () => {
    startTransition(async () => {
      try {
        await carDelete({ variables: { carIds: [data.id] } });
        toast.success("Машин амжилттай устлаа");
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  const splitStr = data?.category?.code?.split(" ") || [];
  const validCode = splitStr?.length > 1 ? splitStr[1] : "";

  const isValidCode = uploadedCarImagesCode?.includes(validCode);

  const carColorCode = data?.colorCode;

  const url = isValidCode
    ? {
        uri:
          "https://erxes.priuscenter.mn/gateway" +
          "/read-file?key=priuscenter/&width=600" +
          validCode +
          "_" +
          carColorCode?.replace("#", "") +
          ".png",
      }
    : {
        uri: "https://erxes.priuscenter.mn/gateway/read-file?key=priuscenter/pr30_ffffff.png&width=600",
      };

  return (
    <div className="relative w-full space-y-2 rounded-[10px] border">
      <div className="w-full px-2 pt-3">
        <div className="relative aspect-video w-full">
          <Image
            src={url.uri ?? "/assets/profile/car.svg"}
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

      <DropdownMenu>
        <DropdownMenuTrigger className="absolute right-2 top-0 z-[2] flex size-8 cursor-pointer items-center justify-center rounded-[8px] bg-gray-100 transition duration-200 hover:bg-gray-100/90">
          <EllipsisVertical className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          <DropdownMenuItem
            className="flex w-full cursor-pointer items-center justify-start gap-x-2"
            onClick={() => onOpen("edit", data)}
            disabled={isPending}
          >
            <List className="size-4" />
            <p>Машины мэдээлэл</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex w-full cursor-pointer items-center justify-start gap-x-2 text-destructive"
            onClick={onDelete}
            disabled={isPending}
          >
            <Trash className="size-4" />
            <p>Машин устах</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
