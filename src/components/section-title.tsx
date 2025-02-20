"use client";

import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: [string, string];
  className?: string;
}

export const SectionTitle = ({ title, className }: SectionTitleProps) => {
  return (
    <p
      className={cn(
        "text-center text-2xl font-semibold md:text-3xl lg:text-[36px]",
        className,
      )}
    >
      <span className="text-primary">{title[0]}</span> {title[1]}
    </p>
  );
};
