"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAtomValue } from "jotai";
import { initialLoadingOrderAtom } from "@/features/order/store/order";
import { cartLengthAtom } from "@/features/cart/store/cart";

import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/loading";
import CartEmpty from "@/features/cart/components/cart-empty";
import { Container } from "@/components/container";

import { ArrowLeftIcon, Loader2 } from "lucide-react";

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

const CheckoutLayout = ({ children }: CheckoutLayoutProps) => {
  const cartLength = useAtomValue(cartLengthAtom);
  const loadingOrder = useAtomValue(initialLoadingOrderAtom);
  const pathname = usePathname();

  if (loadingOrder)
    return (
      <>
        <div className="col-span-7 mb-10 flex items-center justify-center py-40 md:mb-0">
          <LoadingIcon />
        </div>
      </>
    );

  if (!cartLength && pathname !== "/verify")
    return (
      <div className="col-span-12 flex flex-col items-center justify-center pb-32 pt-24">
        <div className="h-48 w-48">
          <CartEmpty />
        </div>
        <h2 className="mt-8 text-xl font-bold sm:text-2xl">Сагс хоосон</h2>
        <Button variant="secondary" className="mt-4" asChild>
          <Link href={"/primart"}>
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            Дэлгүүр лүү буцах
          </Link>
        </Button>
      </div>
    );

  if (!cartLength && pathname === "/verify")
    return (
      <div className="flex w-full justify-center pb-40 pt-40">
        <Loader2 className="animate-spin text-green-400" size={60} />
      </div>
    );

  return <Container>{children}</Container>;
};

export default CheckoutLayout;
