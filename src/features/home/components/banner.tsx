"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { AlarmClockPlus } from "lucide-react";

export const Banner = () => {
  const router = useRouter();

  const onClick = () => router.push("/services");

  return (
    <div
      className="relative w-full overflow-hidden rounded-[16px] bg-gray-50"
      id="banner"
    >
      <div className="absolute -left-[70px] -top-[70px] size-[160px] rounded-full bg-primary blur-3xl sm:size-[180px] md:size-[200px] xl:size-[270px]" />
      <div className="absolute -bottom-[80px] -right-[80px] size-[140px] rounded-full bg-primary blur-3xl lg:size-[150px] xl:size-[200px]" />

      <div className="flex w-full flex-col items-center gap-y-8 py-6">
        <Image
          src={"/assets/home/banner-avatars.png"}
          width={120}
          height={56}
          alt="team"
        />

        <div>
          <p className="px-4 text-center text-xl font-semibold sm:text-2xl md:text-3xl">
            Танд тусламж хэрэгтэй байна уу ?
          </p>
          <p className="px-3 text-center text-xs text-muted-foreground sm:text-base">
            Can’t find the answer you’re looking for? Please chat to our
            friendly team.
          </p>
        </div>

        <Button className="gap-x-3" onClick={onClick}>
          <AlarmClockPlus />
          Цаг захиалах
        </Button>
      </div>
    </div>
  );
};
