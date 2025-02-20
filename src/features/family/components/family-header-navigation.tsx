"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const FamilyHeaderNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mx-auto h-11 w-[345px] rounded-full bg-gray-100 p-1">
      <div className="relative grid h-full w-full grid-cols-3 rounded-full">
        <div
          className={cn(
            "relative z-10 flex h-full w-full cursor-pointer items-center justify-center rounded-full font-medium transition-colors duration-200 hover:opacity-80",
            pathname === "/family/history" && "text-white",
          )}
          onClick={() => router.push("/family/history")}
        >
          Түүх
        </div>
        <div
          className={cn(
            "relative z-10 flex h-full w-full cursor-pointer items-center justify-center rounded-full font-medium transition-colors duration-200 hover:opacity-80",
            pathname === "/family" && "text-white",
          )}
          onClick={() => router.push("/family")}
        >
          Гэр бүл
        </div>
        <div
          className={cn(
            "relative z-10 flex h-full w-full cursor-pointer items-center justify-center rounded-full font-medium transition-colors duration-200 hover:opacity-80",
            pathname === "/family/league" && "text-white",
          )}
          onClick={() => router.push("/family/league")}
        >
          Хамт олон
        </div>

        <div
          className={cn(
            "absolute left-0 top-0 z-0 h-full w-1/3 rounded-full bg-primary transition-all duration-500",
            pathname === "/family/history" && "left-0",
            pathname === "/family" && "left-1/3",
            pathname === "/family/league" && "left-2/3",
          )}
        />
      </div>
    </div>
  );
};
