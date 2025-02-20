"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCarModal } from "@/features/profile/store/useCarModal";

import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";

import { Plus } from "lucide-react";

export const MyCarsHeader = ({ cats }: { cats: any[] }) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const catId = searchParams.get("catId") || undefined;

  const { onOpen } = useCarModal();

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-400">Таны машин</p>
        <Button
          variant={"secondary"}
          className="flex items-center justify-center gap-x-2 text-[#108F03]"
          onClick={() => onOpen("create")}
        >
          <Plus className="size-5" />
          <p className="font-medium">Машин нэмэх</p>
        </Button>
      </div>

      <Select
        value={catId}
        onValueChange={(item) => {
          if (item !== "stop") {
            router.replace(`${pathname}?catId=${item}`);
          } else {
            router.replace(`${pathname}`);
          }
          router.refresh();
        }}
      >
        <SelectTrigger
          defaultValue={cats?.[0]._id}
          value={catId}
          className="w-full"
        >
          <SelectValue placeholder="Select Car mark" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"stop"}>Болих</SelectItem>
          {cats?.map((cat: any) => (
            <SelectItem key={cat._id} value={cat._id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
