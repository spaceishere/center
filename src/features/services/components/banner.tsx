"use client";

import { toast } from "sonner";

import { PhoneCall } from "lucide-react";
import { TbClockEdit } from "react-icons/tb";

export const Banner = () => {
  return (
    <div className="absolute -top-[100px] z-20 w-full cursor-pointer">
      <div className="mx-auto grid h-[80px] w-[550px] grid-cols-2 rounded-full bg-black/70 p-2 xl:w-[650px]">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-white font-semibold text-primary">
          <TbClockEdit className="mr-2 size-5" />
          <p>Цаг захиалга</p>
        </div>
        <div
          className="flex h-full w-full items-center justify-center rounded-full font-semibold text-white"
          onClick={() => toast.info("Энэ үйлчилгээ удахгүй ажилж эхэлнэ")}
        >
          <PhoneCall className="mr-2 size-5" />
          <p>Дуудлагын засвар дуудах</p>
        </div>
      </div>
    </div>
  );
};
