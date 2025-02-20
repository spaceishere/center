"use client";

import { cn } from "@/lib/utils";

interface ScoresProps {
  scores: {
    changeScore: number;
    createdAt: Date;
  }[];
}

export const Scores = ({ scores }: ScoresProps) => {
  return (
    <div className="w-full space-y-2">
      {scores.map((score, index) => (
        <div
          key={index}
          className="flex w-full flex-col items-center justify-between gap-x-4 gap-y-1 rounded-[8px] bg-gray-100 p-3 sm:flex-row"
        >
          <div className="flex w-full items-center gap-x-6 text-[14px]">
            <p className="">
              {score.createdAt.toString().replace("T", " ").slice(0, 19)}
            </p>
            <div className="space-y-1">
              <p>{score.changeScore > 0 ? "Нэмэлт" : "Гаралт"}</p>
            </div>
          </div>

          <p
            className={cn(
              "w-full text-end text-[14px]",
              score.changeScore > 0 ? "text-primary" : "text-destructive",
            )}
          >
            {score.changeScore > 0
              ? `+${score.changeScore} point`
              : `${score.changeScore} point`}
          </p>
        </div>
      ))}
    </div>
  );
};
