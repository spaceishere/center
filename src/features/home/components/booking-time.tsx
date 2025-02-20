"use client";

import { useRouter } from "next/navigation";

import { RiCustomerService2Line } from "react-icons/ri";
import {
  Building2,
  Calendar,
  ChevronDown,
  Clock,
  PhoneCall,
} from "lucide-react";
import { TbClockEdit } from "react-icons/tb";

export const BookingTime = () => {
  const router = useRouter();

  const onClick = () => router.push("/services");

  return (
    <div
      className="relative hidden h-[150px] w-full pb-5 lg:block"
      id="booking-time-trigger"
    >
      <div
        onClick={onClick}
        className="absolute -top-[100px] z-20 w-full cursor-pointer"
      >
        <div className="mx-auto grid h-[80px] w-[550px] grid-cols-2 rounded-full bg-black/70 p-2 xl:w-[650px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white font-semibold text-primary">
            <TbClockEdit className="mr-2 size-5" />
            <p>Цаг захиалгаa</p>
          </div>
          <div className="flex h-full w-full items-center justify-center rounded-full font-semibold text-white">
            <PhoneCall className="mr-2 size-5" />
            <p>Дуудлагын засвар дуудах</p>
          </div>
        </div>
      </div>

      <div
        className="group absolute bottom-[60px] z-[10] grid h-full w-full cursor-pointer grid-cols-4 gap-x-4 rounded-[8px] bg-white px-8 pb-6 pt-[66px] shadow transition-colors duration-200 hover:bg-gray-50"
        onClick={onClick}
      >
        <div className="menu-item-container">
          <div className="flex items-center">
            <RiCustomerService2Line className="mr-1.5 size-6 text-neutral-600" />
            <p className="font-semibold text-gray-400">Үйлчилгээ</p>
          </div>

          <ChevronDown className="size-6 text-[#4B5563]" />
        </div>
        <div className="menu-item-container">
          <div className="flex items-center">
            <Building2 className="mr-1.5 size-6 text-neutral-600" />
            <p className="font-semibold text-gray-400">Салбар</p>
          </div>

          <ChevronDown className="size-6 text-[#4B5563]" />
        </div>
        <div className="menu-item-container">
          <div className="flex items-center">
            <Calendar className="mr-1.5 size-6 text-neutral-600" />
            <p className="font-semibold text-gray-400">Хугацаа</p>
          </div>

          <ChevronDown className="size-6 text-[#4B5563]" />
        </div>

        <div className="flex h-full w-full items-center justify-center rounded-md bg-primary text-lg font-semibold text-white transition-colors duration-200 group-hover:bg-primary/90">
          <Clock className="mr-2 h-5 w-5" />
          <p>Цаг захиалах</p>
        </div>
      </div>
    </div>
  );
};
