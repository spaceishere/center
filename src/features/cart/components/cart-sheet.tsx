import { useAtom, useAtomValue } from "jotai";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { isCartOpenAtom } from "@/features/cart/store/cart";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import Link from "next/link";

import { cartItemAtom } from "@/features/cart/store/cart";
import CartItem from "./cart-item";
import CartTotal from "./cart-total";
import CartEmpty from "./cart-empty";

export const CartSheet = () => {
  const [openSheet, setOpenSheet] = useAtom(isCartOpenAtom);
  const cart = useAtomValue(cartItemAtom);

  return (
    <Sheet open={openSheet} onOpenChange={(op) => setOpenSheet(op)}>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex-row items-center justify-between space-y-0">
          <SheetTitle>Таны сагс</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size={"icon"} className="-mr-2">
              <XIcon className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>
        {cart.length > 0 ? (
          <>
            <div className="flex-1">
              {cart.map((cartItemAtom) => (
                <CartItem
                  key={`${cartItemAtom}`}
                  cartItemAtom={cartItemAtom}
                  setOpenSheet={setOpenSheet}
                />
              ))}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                <p>Хүргэлт</p>
                <p className="text-right">Нийт үнэ дээр нэмэгдсэн</p>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                <p>Нийт үнэ</p>
                <CartTotal />
              </div>
            </div>
            <Button size="lg" asChild onClick={() => setOpenSheet(false)}>
              <Link href="/cart">Худалдан авах</Link>
            </Button>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <div className="h-28 w-28">
              <CartEmpty />
            </div>
            <p className="font-semibold">Сагс хоосон байна</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
