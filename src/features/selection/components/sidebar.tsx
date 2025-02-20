import { list } from "../constant";

import { Button } from "@/components/ui/button";

import { Sparkles } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="order-first col-span-1 grid gap-y-6 md:order-last md:col-span-2 lg:col-span-1">
      <p className="text-xl font-semibold">Сонгон шалгаруулалт</p>

      <div className="flex w-full max-w-[350px] flex-col gap-y-3">
        {list.map((chance, index) => (
          <Button className="justify-start" key={index} variant={"outline"}>
            {index + 1}. {chance}
          </Button>
        ))}
        <Button className="justify-start">
          <Sparkles className="mr-2 size-5" />
          Ажилд авах
        </Button>
      </div>
    </div>
  );
};
