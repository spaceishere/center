"use client";

import { useCatOpen } from "../store/useCatOpen";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ProductsSidebar } from "./products-sidebar";

interface CategorySheetProps {
  totalCount: number;
}

export const CategorySheet = ({ totalCount }: CategorySheetProps) => {
  const { isOpen, onOpen, onClose } = useCatOpen();

  const setOpen = (value: boolean) => {
    if (value) {
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(value) => setOpen(value)}>
      <SheetContent
        side={"left"}
        className="flex w-[280px] max-w-[280px] flex-col gap-0 overflow-y-auto p-0 pr-5 pt-5"
      >
        <ProductsSidebar totalCount={totalCount} className="w-full pl-5" />
      </SheetContent>
    </Sheet>
  );
};
