"use client";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const Container = ({
  children,
  className,
  containerClassName,
}: ContainerProps) => {
  return (
    <div className={cn("w-full", containerClassName)}>
      <div
        className={cn(
          "mx-auto w-full max-w-[1600px] flex-1 px-2.5 pb-[100px] pt-5 md:px-5 lg:px-24",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
