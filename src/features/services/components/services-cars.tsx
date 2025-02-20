"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car } from "./car";
import { AddCar } from "./add-car";

import { TCustomer } from "@/types";

interface ServicesCarsProps {
  currentUser: TCustomer | null;
  carCats: any;
  cars: {
    id: string;
    number: string;
    catId: string;
  }[];
  searchParams: {
    catId?: string;
    carId?: string;
  };
}

export const ServicesCars = ({
  currentUser,
  carCats,
  cars,
  searchParams,
}: ServicesCarsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  if (currentUser) {
    return (
      <div className="flex w-full flex-col gap-y-5">
        <div className="w-full space-y-3">
          <p className="text-lg font-semibold text-primary">Таны машин</p>

          <Select
            value={searchParams?.catId}
            onValueChange={(item) => {
              if (item !== "stop") {
                router.replace(`${pathname}?catId=${item}`);
              } else {
                router.replace(pathname);
              }

              router.refresh();
            }}
          >
            <SelectTrigger
              defaultValue={carCats?.[0]._id}
              value={searchParams?.catId}
              className="h-[45px] w-full"
            >
              <SelectValue placeholder="Select Car mark" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value={"stop"}>Болих</SelectItem>
              {carCats?.map((cat: any) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
          {cars.map((car: any, index) => (
            <Car searchParams={searchParams} data={car} key={index} />
          ))}

          <AddCar />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-[200px] w-full items-center justify-center rounded-lg border-[2px] border-dashed border-gray-500 bg-gray-100/40">
        <p className="text-lg font-semibold text-gray-400">
          Та эхлээд нэвтэрч орно уу.
        </p>
      </div>
    );
  }
};
