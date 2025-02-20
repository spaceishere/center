import { ORDER_STATUSES } from "@/features/order/constant";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import CancelOrder from "./cancel-order";
import BuyButton from "./buy-button";
import GetEbarimt from "./get-ebarimt";
import OrderStatus from "./order-status";
import { useDetail } from "@/features/order/components/order-detail-context";

const OrderHeader = () => {
  const { status, paidDate } = useDetail();

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-1 md:gap-0 md:py-5">
        <h3 className="text-nowrap text-base font-semibold md:text-xl">
          Захиалгын мэдээлэл
        </h3>
        <div className="w-full text-right text-sm font-medium md:w-auto" />
      </CardHeader>
      <Separator />
      <CardContent className="px-2">
        <h4 className="my-5 text-center text-lg font-medium md:mt-0 md:text-xl">
          <OrderStatus />
        </h4>
        {status === ORDER_STATUSES.NEW && !paidDate && (
          <Alert
            variant="warning"
            className="text-center text-black md:font-medium"
          >
            Төлбөр төлөгдсөний дараа таны захиалга баталгаажихыг анхаарна уу!
          </Alert>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="justify-between gap-2 pt-4 md:py-4">
        <CancelOrder />
        {!paidDate ? <BuyButton /> : <GetEbarimt />}
      </CardFooter>
    </Card>
  );
};

export default OrderHeader;
