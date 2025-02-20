"use client";

import Image from "next/image";
import { readFile } from "@/lib/utils";

import { useBranches } from "../api/useBranches";

import { Container } from "@/components/container";
import { useMemo } from "react";

interface BranchDetailProps {
  id: string;
}

export const BranchDetail = ({ id }: BranchDetailProps) => {
  const { branch } = useBranches(id);

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
    <Container className="max-w-[1300px] space-y-8 pt-8">
      <p className="bg-white text-2xl font-semibold">Салбар : {branch.title}</p>

      <div className="grid grid-cols-1 gap-x-7 gap-y-5 lg:grid-cols-2">
        <div className="space-y-3">
          <p>
            <span className="font-semibold">Хаяг:</span> {branch.address}
          </p>

          <div className="space-y-3">
            <p className="font-medium">Цагийн хуваарь:</p>

            <div className="space-y-2 pl-3">
              {workhours.map((day) => (
                <p key={day.label}>
                  <span className="pr-1 font-medium text-gray-700">
                    {day.label}:
                  </span>{" "}
                  {day.hours}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-lg border-[0.2px] shadow">
          <Image
            src={
              branch.image?.url
                ? readFile(branch.image?.url, "1000")
                : "/assets/image-placeholder.png"
            }
            className="object-cover object-center"
            alt="branch"
            fill
          />
        </div>
      </div>
    </Container>
  );
};
