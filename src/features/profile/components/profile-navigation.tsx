"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ChevronRight } from "lucide-react";

export const ProfileNavigation = () => {
  const routes = useProfileRoutes();

  return (
    <div className="h-fit w-full space-y-4 rounded-md border p-4">
      <p className="font-medium text-muted-foreground">Миний мэдээлэл</p>

      <div className="flex w-full flex-col gap-y-0.5">
        {routes.map((route) => (
          <Link
            aria-disabled={route.isActive}
            href={route.href}
            key={route.href}
            className={cn(
              "flex items-center justify-between rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50",
              route.isActive && "bg-primary text-white hover:bg-primary",
            )}
          >
            {route.label}
            <ChevronRight className="size-4" />
          </Link>
        ))}
      </div>
    </div>
  );
};

const useProfileRoutes = () => {
  const pathname = usePathname();

  return useMemo(
    () => [
      {
        href: "/profile",
        label: "Миний машин",
        isActive: pathname === "/profile",
      },
      {
        href: "/hybrid",
        label: "Хайбрид оноо",
        isActive: pathname.startsWith("/hybrid"),
      },
      {
        href: "/service-history",
        label: "Засвар үйлчилгээний түүх",
        isActive: pathname.startsWith("/service-history"),
      },
      {
        href: "/primart-history",
        label: "Примарт түүх",
        isActive: pathname === "/primart-history",
      },
    ],
    [pathname],
  );
};
