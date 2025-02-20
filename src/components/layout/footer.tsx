"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { Container } from "../container";

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  AppStore,
  PlayStore,
} from "./icons";

export const Footer = () => {
  const routes = useFooterRoutes();

  return (
    <div className="mt-auto w-full space-y-1 rounded-t-[45px] border-t pt-5">
      <Container className="pb-12 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-7 md:grid-cols-3 lg:flex lg:justify-between">
        {routes.map((col, index) => (
          <ColFooter col={col} key={index} />
        ))}
        {/* social links and app links */}
        <div className="col-span-2 grid h-fit gap-x-8 gap-y-6 sm:col-span-1 md:col-span-3 md:grid-cols-2 lg:col-span-1 lg:grid-cols-1">
          <div className="w-full space-y-3">
            <p className="text-[22px] font-medium">Сошиал хаяг</p>
            <div className="flex items-center gap-2">
              {[
                {
                  icon: <Facebook />,
                  href: "https://www.facebook.com/priuscenter.mn",
                },
                {
                  icon: <Instagram />,
                  href: "https://www.instagram.com/priuscenter.mn",
                },
              ].map(
                (
                  { icon, href }: { icon: React.ReactNode; href: string },
                  index: number,
                ) => (
                  <Link
                    href={href}
                    key={index}
                    target="_blank"
                    className="flex h-10 w-10 items-center justify-center rounded-md border transition duration-200 hover:bg-gray-100"
                  >
                    {icon}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="w-full space-y-3">
            <p className="text-[22px] font-medium">Хэрэглэгчийн апп татах</p>
            <div className="flex w-full gap-x-3">
              <a href="https://apps.apple.com/mn/app/prius-center-mongolia/id1659586614">
                <AppStore />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.priuscenter.mn&pcampaignid=web_share">
                <PlayStore />
              </a>
            </div>
          </div>
        </div>
      </Container>

      <div className="flex w-full items-center justify-center border-t border-gray-500/30 py-4 lg:py-6 lg:pb-5">
        <p className="text-[14px] lg:text-base">
          Prius Center @ {new Date().getFullYear()}. All rights reserved
        </p>
      </div>
    </div>
  );
};

const ColFooter = ({
  col,
}: {
  col: {
    label: string;
    routes: { href: string; label: string; isActive: boolean }[];
  };
}) => {
  return (
    <div className="col-span-1 space-y-2">
      <p className="font-medium">{col.label}</p>

      <ul className="space-y-[6px]">
        {col.routes.map((route) => (
          <Link href={route.href} key={route.href}>
            <p
              className={cn(
                "py-1 text-[14px] text-gray-600 transition-colors duration-200 hover:text-primary lg:text-base",
                route.isActive && "text-primary",
              )}
            >
              {route.label}
            </p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export const useFooterRoutes = () => {
  const pathname = usePathname();

  const usefulRoutes = useMemo(
    () => ({
      label: "Таньд тустай",
      routes: [
        {
          href: "/advices",
          label: "Зөвлөгөө",
          isActive: pathname.startsWith("/advices"),
        },
        {
          href: "/#faq",
          label: "Түгээмэл асуулт хариулт",
          isActive: false,
        },
        {
          href: "/family/history",
          label: "Түүх",
          isActive: pathname === "/family/history",
        },
      ],
    }),
    [pathname],
  );

  const resourcesRoutes = useMemo(
    () => ({
      label: "Хүний нөөц",
      routes: [
        {
          href: "/family",
          label: "Манай хамт олон",
          isActive: pathname === "/primart",
        },
        {
          href: "/career",
          label: "Нээлттэй ажлын байр",
          isActive: pathname === "/career",
        },
        {
          href: "/selection",
          label: "Сонгон шалгаруулалт",
          isActive: pathname === "/selection",
        },
      ],
    }),
    [pathname],
  );

  const helpfulRoutes = useMemo(
    () => ({
      label: "Хэрэгцээт холбоосууд",
      routes: [
        {
          href: "/services",
          label: "Засвар үйлчилгээ",
          isActive: pathname === "/services",
        },
        {
          href: "/infos",
          label: "Мэдээ мэдээлэл",
          isActive: pathname.startsWith("/infos"),
        },
        {
          href: "/primart",
          label: "Примарт",
          isActive: pathname === "/primart",
        },
        {
          href: "/privacy",
          label: "Нууцлалын бодлого",
          isActive: pathname === "/privacy",
        },
      ],
    }),
    [pathname],
  );

  return [usefulRoutes, resourcesRoutes, helpfulRoutes];
};
