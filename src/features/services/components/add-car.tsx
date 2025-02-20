"use client";

import { useCarModal } from "@/features/profile/store/useCarModal";

import { Button } from "@/components/ui/button";
import { CirclePlus, Plus } from "lucide-react";

export const AddCar = () => {
  const { onOpen } = useCarModal();

  return (
    <div
      className="relative w-full space-y-2 rounded-[10px] border"
      onClick={() => onOpen("create")}
    >
      <div className="w-full px-2 pt-3">
        <div className="relative flex aspect-video w-full items-center justify-center">
          <CirclePlus className="size-8 text-primary" />
        </div>
      </div>
      <Button className="w-full gap-x-2 rounded-t-[20px] hover:bg-primary">
        <Plus className="size-4 text-white" /> Машин нэмэх
      </Button>
    </div>
  );
};
