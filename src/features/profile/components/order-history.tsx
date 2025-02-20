import Link from "next/link";
import { cn, posReadFile } from "@/lib/utils";
import { format } from "date-fns";
import { getOrderStatus } from "@/features/order/constant";

import { Price } from "@/components/price";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { TOrder } from "@/features/order/types";

export const OrderHistory = ({
  orders,
}: {
  orders: (Omit<TOrder, "items"> & {
    items: { productName: string; productImgUrl: string }[];
  })[];
}) => {
  return (
    <div className="w-full space-y-3">
      {orders.length === 0 ? (
        <div className="flex w-full justify-center py-5">
          Примартийн түүх алга байна
        </div>
      ) : (
        orders.map(
          ({ _id, paidDate, items, totalAmount, createdAt, status }) => (
            <Button
              variant="outline"
              className="h-auto w-full flex-wrap justify-between gap-3 px-4 py-4 shadow-none md:h-24 md:flex-nowrap md:gap-6 md:px-6 md:py-0"
              size={"lg"}
              asChild
              key={_id}
            >
              <Link href={`/order/${_id}`}>
                <div className="flex flex-1 items-start md:items-center">
                  <div className="w-5/12 space-y-0.5 text-left">
                    <div className="text-black/60">Захиалга хийсэн:</div>
                    <div className="text-black/60">
                      {format(createdAt, "yyyy/MM/dd hh:mm")}
                    </div>
                  </div>
                  <div className="w-7/12 space-y-0.5 text-right md:text-left">
                    <div className="text-wrap">
                      {getOrderStatus(status || "", paidDate)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row-reverse justify-end">
                  {items.map((item, index) => (
                    <Avatar
                      className={cn("h-12 w-12 border-2", index > 0 && "-mr-3")}
                      key={item.productName}
                    >
                      <AvatarImage
                        src={
                          item.productImgUrl
                            ? posReadFile(item.productImgUrl)
                            : "/assets/image-placeholder.png"
                        }
                      />
                      <AvatarFallback>
                        {(item.productName || "").toUpperCase()[0]}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-right md:mr-4 md:w-2/12">
                  <div className="text-black/60">Захиалгын дүн</div>
                  <Price className="text-base" amount={totalAmount + ""} />
                </div>
              </Link>
            </Button>
          ),
        )
      )}
    </div>
  );
};
