import { useAtomValue } from "jotai";
import { deliveryItemIdAtom } from "@/features/auth/store/auth";
import { getDeliveryProduct } from "@/features/order/store/order";
import { format } from "date-fns";
import { useDetail } from "@/features/order/components/order-detail-context";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Price } from "@/components/price";

const OrderGeneral = () => {
  const { number, createdAt, totalAmount, items } = useDetail();

  const deliveryProductId = useAtomValue(deliveryItemIdAtom);
  const deliveryProduct = getDeliveryProduct(items, deliveryProductId);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 md:space-y-2 md:py-3">
        <div>
          <div className="text-nowrap text-sm font-medium text-black/60">
            Захиалгын дугаар
          </div>
          <div className="text-base font-semibold md:text-lg md:font-bold">
            {number}
          </div>
        </div>
        <div className="text-right">
          <div className="text-nowrap text-sm font-medium text-black/60">
            Захиалга хийсэн огноо
          </div>
          <div className="text-base font-semibold md:text-lg md:font-bold">
            {format(createdAt, "yyyy/MM/dd hh:mm")}
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="py-3 text-sm md:py-4 md:text-base">
        <div className="flex items-center justify-between">
          <span>Барааны дүн</span>
          <Price
            amount={totalAmount - (deliveryProduct?.unitPrice || 0) + ""}
          />
        </div>
        <div className="flex items-center justify-between">
          <span>Хүргэлтийн төлбөр</span>
          <Price amount={(deliveryProduct?.unitPrice || 0).toString()} />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="justify-between text-nowrap py-3 text-base font-bold md:py-4 md:text-lg">
        <div>Нийт төлөх дүн</div>
        <Price amount={totalAmount + ""} />
      </CardFooter>
    </Card>
  );
};

export default OrderGeneral;
