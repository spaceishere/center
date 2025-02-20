"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAtomValue, useSetAtom, atom, useAtom } from "jotai";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useLogout } from "@/features/auth/api/auth";

import { cn, readFile } from "@/lib/utils";
import {
  cartLengthAtom,
  isBranchOpenAtom,
  isCartOpenAtom,
} from "@/features/cart/store/cart";
import { isOpenAtom } from "@/features/auth/store/auth";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu, User2 } from "lucide-react";
import { TBranch } from "@/types";
import { getScore } from "@/features/profile/api/getScore";

// Sidebar store
export const isSidebarOpenAtom = atom<boolean>(false);
export const isIosAtom = atom<boolean>(false);

export const Navbar = ({ branches }: { branches: TBranch[] }) => {
  const routes = useNavbarRoutes();

  const length = useAtomValue(cartLengthAtom);
  const setIsCartOpenAtom = useSetAtom(isCartOpenAtom);
  const setIsSidebarOpen = useSetAtom(isSidebarOpenAtom);
  const [isIos, setIsIos] = useAtom(isIosAtom);

  const onOpen = () => setIsCartOpenAtom(true);
  const onOpenSidebar = () => setIsSidebarOpen(true);

  useEffect(() => {
    const getDevice = async () => {
      const { data } = await fetch("/api/device").then((res) => res.json());
      setIsIos(data?.ios || false);
    };

    getDevice();
  }, [setIsIos]);

  return (
    <div className="">
      <div className="fixed inset-x-0 left-0 top-0 z-30 h-[140px] divide-y bg-white shadow">
        <div className="flex h-[70px] w-full items-center justify-between px-5 py-[15px] md:px-8">
          <div className="flex h-full items-center">
            <Link href={"/"} className="relative mr-[30px] aspect-[4/1] h-full">
              <Image
                fill
                src={"/assets/logo.svg"}
                alt="Logo"
                className="object-contain object-center"
                draggable={true}
              />
            </Link>

            <div className="hidden items-center lg:flex">
              {routes.top.map((route, index) => (
                <NavbarItem key={index} {...route} />
              ))}
            </div>
          </div>

          <MobileNavbarActions
            onOpen={onOpen}
            onOpenSidebar={onOpenSidebar}
            length={length}
          />

          <div className="hidden h-full items-center gap-x-3 lg:flex">
            <Button
              variant={"outline"}
              className="relative flex h-9 w-9 items-center justify-center p-0"
              onClick={onOpen}
            >
              <div className="relative h-5 w-5">
                <Image
                  src={"/icons/shopping-cart.svg"}
                  alt="download icon"
                  fill
                  className="object-contain object-center"
                />
              </div>
              <div className="absolute -right-3.5 -top-3.5">
                <Badge>{length}</Badge>
              </div>
            </Button>
          </div>
        </div>

        <NavbarBottom />
      </div>

      <Branches branches={branches} />
    </div>
  );
};

const Branches = ({ branches }: { branches: TBranch[] }) => {
  const router = useRouter();
  const [isOpenBranch, setBranch] = useAtom(isBranchOpenAtom);
  const [branchStatus, setBranchStatus] = useState<Record<string, boolean>>({});
  const branchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkBranchStatus = () => {
      if (!branches || !Array.isArray(branches)) return;

      const newStatus: Record<string, boolean> = {};
      branches.forEach((branch) => {
        const times = extractTime(branch.address ?? "") || {
          open: "9:00",
          close: "22:00",
        };
        newStatus[branch._id] = checkOpenStatus(`${times.open}-${times.close}`);
      });
      setBranchStatus(newStatus);
    };

    checkBranchStatus();
    const interval = setInterval(checkBranchStatus, 60000);
    return () => clearInterval(interval);
  }, [branches, setBranchStatus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        branchRef.current &&
        !branchRef.current.contains(event.target as Node)
      ) {
        setBranch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setBranch]);

  const checkOpenStatus = (timeRange: string) => {
    const [openTime, closeTime] = timeRange.split("-");
    const [openHour, openMinute] = openTime.split(":").map(Number);
    const [closeHour, closeMinute] = closeTime.split(":").map(Number);

    const now = new Date();
    const ulaanbaatarTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Ulaanbaatar" }),
    );
    const currentHour = ulaanbaatarTime.getHours();
    const currentMinute = ulaanbaatarTime.getMinutes();

    const currentMinutes = currentHour * 60 + currentMinute;
    const openMinutes = openHour * 60 + openMinute;
    const closeMinutes = closeHour * 60 + closeMinute;

    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  };

  const extractTime = (address: string) => {
    const timeRegex = /(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/;
    const match = address.match(timeRegex);

    if (match) {
      return {
        open: match[1],
        close: match[2],
      };
    }

    return null;
  };
  const onClick = (id: string) => {
    router.push(`/branches/${id}`);
    setBranch(false);
  };

  if (!isOpenBranch) return null;

  if (!branches || branches.length === 0) return null;

  return (
    <div
      ref={branchRef}
      className="fixed left-0 top-[82px] z-[35] flex h-fit w-full flex-wrap gap-x-2 gap-y-3 bg-white py-[15px] shadow-md"
    >
      {branches.map((branch) => (
        <div
          className="flex cursor-pointer items-center gap-x-2 px-3"
          key={branch._id}
          onClick={() => onClick(branch._id)}
        >
          <div
            className={`relative h-[50px] min-h-[50px] w-[50px] min-w-[50px] rounded-full border ${branchStatus[branch._id] && "border-emerald-600"}`}
          >
            <Image
              src={
                branch?.image?.url
                  ? readFile(branch?.image?.url)
                  : "/assets/image-placeholder.png"
              }
              alt="branch image"
              fill
              className="rounded-full object-cover object-center"
            />
            <div
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white ${branchStatus[branch._id] && "bg-emerald-500"}`}
            ></div>
          </div>

          <div className="space-y-1">
            <p className="text-[12px] font-medium">{branch.title}</p>
            <div className="text-[12px] text-muted-foreground">
              {(() => {
                const times = extractTime(branch.address ?? "") || {
                  open: "9:00",
                  close: "22:00",
                };
                const isOpen = branchStatus[branch._id] ?? false;
                return `(${isOpen ? "Нээлттэй" : "Хаалттай"})`;
              })()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Branches;

const NavbarBottom = () => {
  const router = useRouter();
  const routes = useNavbarRoutes();
  const [totalScore, setTotalScore] = useState(0);

  const { logout, loading } = useLogout();

  const { currentUser } = useCurrentUser();
  const setIsAuthOpen = useSetAtom(isOpenAtom);

  const onOpen = () => setIsAuthOpen(true);

  const onLogout = async () => {
    if (!currentUser || loading) return;
    await logout();
  };

  const onClickRoute = (href: string) => router.push(href);

  useEffect(() => {
    const getTotalScore = async () => {
      const { score } = await getScore();

      setTotalScore(score);
    };

    getTotalScore();
  }, []);

  return (
    <div className="flex h-[60px] w-full items-center justify-between gap-x-4 overflow-hidden px-2 md:px-8">
      <div className="flex h-full items-center overflow-x-auto scroll-one:w-[256px] scroll-two:w-[326px] scroll-three:w-[396px] scroll-four:w-[466px] sm:w-fit">
        {routes.bottom.map((route) => (
          <NavbarItem isBottom key={route.label} {...route} />
        ))}
      </div>

      <div className="flex w-[88px] items-center justify-center md:w-auto">
        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-x-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                <User2 className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="line-clamp-1 hidden text-[14px] md:block">
                  {currentUser.firstName} {currentUser.lastName}
                </p>

                <span className="hidden items-center text-primary md:flex">
                  <Image
                    src={"/assets/profile/coin.svg"}
                    alt="coin"
                    width={20}
                    height={20}
                  />{" "}
                  {totalScore}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[235px]"
              alignOffset={-3}
            >
              <DropdownMenuItem
                onClick={() => onClickRoute("/profile")}
                className="cursor-pointer py-[10px] pl-3"
              >
                Хувийн мэдээлэл
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer py-[10px] pl-3"
                onClick={() => onClickRoute("/hybrid")}
              >
                Хайбрид оноо
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer py-[10px] pl-3"
                onClick={() => onClickRoute("/service-history")}
              >
                Засвар үйлчилгээний түүх
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer py-[10px] pl-3"
                onClick={() => onClickRoute("/primart-history")}
              >
                Примарт түүх
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer py-[10px] pl-3 text-red-500"
                onClick={onLogout}
              >
                Гарах
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-x-4">
            <p className="text hidden text-muted-foreground lg:block">
              Нэвтэрч ороод хувийн мэдээлэлтэйгээ танилцаарай.
            </p>
            <Button onClick={onOpen}>Нэвтрэх</Button>
          </div>
        )}
      </div>
    </div>
  );
};

const NavbarItem = ({
  isActive,
  label,
  href,
  isBottom,
  onClick,
}: {
  isActive: boolean;
  label: string;
  href?: string;
  isBottom?: boolean;
  onClick?: () => void;
}) => {
  const router = useRouter();

  const onClickRoute = () => {
    if (href) {
      router.push(href);
      return;
    }
    if (onClick) {
      onClick();
      return;
    }
  };

  return (
    <p
      className={cn(
        "flex cursor-pointer items-center gap-x-1 px-3 text-[14px] font-medium text-gray-500 transition-colors duration-300 hover:text-primary sm:text-base 2xl:text-[18px]",
        isActive && "text-primary",
        isBottom && "font-normal",
      )}
      onClick={onClickRoute}
    >
      {label.split(" ").map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </p>
  );
};

const MobileNavbarActions = ({
  onOpen,
  onOpenSidebar,
  length,
}: {
  onOpen: () => void;
  onOpenSidebar: () => void;
  length: number;
}) => {
  return (
    <div className="flex items-center gap-x-5 lg:hidden">
      <Button
        variant={"outline"}
        className="relative flex h-9 w-9 items-center justify-center p-0"
        onClick={onOpen}
      >
        <div className="relative h-5 w-5">
          <Image
            src={"/icons/shopping-cart.svg"}
            alt="download icon"
            fill
            className="object-contain object-center"
          />
        </div>
        <div className="absolute -right-3.5 -top-3.5">
          <Badge>{length}</Badge>
        </div>
      </Button>

      <Menu
        className="h-8 w-8 cursor-pointer stroke-[1.5px] transition-colors duration-200 hover:text-gray-400 lg:hidden"
        onClick={onOpenSidebar}
      />
    </div>
  );
};

export const MobileSidebarSheet = () => {
  const { top, bottom } = useNavbarRoutes();

  const [isOpen, setIsOpen] = useAtom(isSidebarOpenAtom);
  const isIos = useAtomValue(isIosAtom);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[280px] sm:w-[320px]">
        <SheetHeader className="text-lg font-medium">Мэню</SheetHeader>

        <div className="space-y-3 py-5">
          {top.map((route, index) => (
            <SheetClose key={route.href || index} asChild>
              <Button
                variant={route.isActive ? "default" : "outline"}
                asChild={route.href ? true : false}
                className="w-full"
                onClick={() => {
                  if (!route.href && route.onClick) {
                    route.onClick();
                  }
                }}
              >
                {route.href ? (
                  <Link href={route.href}>
                    <p className="text-[14px]">{route.label}</p>
                  </Link>
                ) : (
                  <p className="text-[14px]">{route.label}</p>
                )}
              </Button>
            </SheetClose>
          ))}
        </div>

        <Separator className="my-2" />

        <div className="space-y-3 py-5">
          {bottom.map((route) => (
            <SheetClose key={route.href} asChild>
              <Button
                variant={route.isActive ? "default" : "outline"}
                asChild
                className="w-full"
              >
                <Link href={route.href}>
                  <p>{route.label}</p>
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        <Separator className="mb-8 mt-2" />

        <div className="w-full space-y-4 lg:hidden">
          <p>Aпп татах</p>
          <Button asChild className="w-full bg-black hover:bg-black/70">
            <Link href={isIos ? appleStore : googleStore} target="_blank">
              <Image
                src={"/icons/download-white.svg"}
                alt="Download svg"
                width={20}
                height={20}
                className="object-contain object-center"
              />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const useNavbarRoutes = () => {
  const pathname = usePathname();
  const [isOpenBranch] = useAtom(isBranchOpenAtom);
  const openBranch = useSetAtom(isBranchOpenAtom);

  const top = useMemo(
    () => [
      {
        href: "/",
        label: "Нүүр хуудас",
        isActive: pathname === "/",
      },
      {
        href: "/family/history",
        label: "Ногоон гэр бүл",
        isActive: pathname.startsWith("/family"),
      },
      {
        href: "/infos",
        label: "Мэдээ мэдээлэл",
        isActive: pathname.startsWith("/infos"),
      },
      {
        label: "Салбар",
        isActive: pathname.startsWith("/branches") || isOpenBranch,
        onClick: () => openBranch((prev) => !prev),
      },
    ],
    [pathname, openBranch, isOpenBranch],
  );

  const bottom = useMemo(
    () => [
      {
        href: "/primart",
        label: "Примарт",
        isActive: pathname === "/primart",
      },
      {
        href: "/services/options",
        label: "Засвар үйлчилгээ",
        isActive: pathname.startsWith("/services"),
      },
      {
        href: "/brand",
        label: "Брэнд",
        isActive: pathname === "/brand",
      },
      {
        href: "/advices",
        label: "Зөвлөгөө",
        isActive: pathname.startsWith("/advices"),
      },
    ],
    [pathname],
  );

  return {
    top,
    bottom,
  };
};

const appleStore =
  "https://apps.apple.com/mn/app/prius-center-mongolia/id1659586614";
const googleStore =
  "https://play.google.com/store/apps/details?id=com.priuscenter.mn&pcampaignid=web_share";
