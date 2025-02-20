"use client";

import { format } from "date-fns";

import { useBranch } from "../api/useBranch";

import { Button } from "@/components/ui/button";
import { useService } from "@/features/services/store/useService";

import { CalendarIcon, Clock } from "lucide-react";
import Image from "next/image";
import { readFile } from "@/lib/utils";
import { useMemo } from "react";

interface ServicesFieldsProps {
  isPending: boolean;
  onSubmit: () => void;
}

export const ServicesFields = ({
  isPending,
  onSubmit,
}: ServicesFieldsProps) => {
  const { branch } = useBranch();

  const { time, date } = useService();

  const workhours = useMemo(() => {
    if (!branch?.workhours) return [];

    let days: { label: string; hours: string; lunchHours: string }[] = [];

    for (const day in branch.workhours) {
      let labelInMongolia = "";

      switch (day) {
        case "Monday":
          labelInMongolia = "Даваа";
          break;
        case "Tuesday":
          labelInMongolia = "Мягмар";
          break;
        case "Wednesday":
          labelInMongolia = "Лхагва";
          break;
        case "Thursday":
          labelInMongolia = "Пүрэв";
          break;
        case "Friday":
          labelInMongolia = "Баасан";
          break;
        case "Saturday":
          labelInMongolia = "Хагасайн";
          break;
        case "Sunday":
          labelInMongolia = "Бүтэнсайн";
          break;
      }

      days.push({
        label: labelInMongolia,
        hours: `${branch.workhours[day as keyof typeof branch.workhours]?.startFrom || "00:00"} - ${branch.workhours[day as keyof typeof branch.workhours]?.endTo || "00:00"}`,
        lunchHours: `${branch.workhours[day as keyof typeof branch.workhours]?.lunchStartFrom || "00:00"} - ${branch.workhours[day as keyof typeof branch.workhours]?.lunchEndTo || "00:00"}`,
      });
    }

    return days;
  }, [branch]);

  return (
    <div className="col-span-1 w-full lg:col-span-2">
      <div className="grid w-full grid-cols-1 flex-col gap-x-[30px] gap-y-3 lg:grid-cols-2">
        <div className="w-full space-y-3">
          <p className="text-lg font-semibold text-primary">Хэзээ</p>

          <div className="flex h-[45px] w-full items-center rounded-md border pl-3">
            <CalendarIcon className="mr-2 size-4 text-muted-foreground" />
            <p className="text-[14px] text-muted-foreground">
              {date ? format(date, "PPP") : <span>Өдөр сонгох</span>}
            </p>
          </div>
        </div>

        <div className="w-full space-y-3">
          <p className="text-lg font-semibold text-primary">Цаг</p>

          <div className="flex h-[45px] w-full items-center rounded-md border pl-3">
            <Clock className="mr-2 size-4 text-muted-foreground" />
            <p className="text-[14px] text-muted-foreground">
              {time
                ? JSON.parse(time).start + "-" + JSON.parse(time).end
                : "60 минут"}
            </p>
          </div>
        </div>

        {branch && (
          <div className="col-span-1 space-y-3 lg:col-span-2">
            <p className="text-lg font-semibold text-primary">Хаана</p>

            <div className="flex flex-col gap-y-4 rounded-[16px] border p-4 sm:flex-row sm:items-center sm:gap-x-4 sm:gap-y-0">
              <div className="w-full sm:w-[190px]">
                <div className="relative aspect-[1.3/1] w-full">
                  <Image
                    src={
                      branch.image?.url
                        ? readFile(branch.image?.url, "1000")
                        : "/assets/image-placeholder.png"
                    }
                    alt="branch"
                    fill
                    className="rounded-lg object-cover object-center"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-lg font-medium">{branch.title}</p>
                <p className="text-gray-700">
                  <span className="pr-1 font-medium text-black">Хаяг:</span>
                  {branch.address}
                </p>
                {workhours.length > 0 && (
                  <p className="text-gray-700">
                    <span className="pr-1 font-medium text-black">
                      Цагийн хуваарь:
                    </span>
                    {workhours[0].hours}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="col-span-1 flex w-full justify-end pt-5 lg:col-span-2">
          <Button
            size={"lg"}
            className="h-[50px] w-[200px]"
            disabled={isPending}
            onClick={onSubmit}
            type="button"
          >
            Баталгаажуулах
          </Button>
        </div>
      </div>
    </div>
  );
};
