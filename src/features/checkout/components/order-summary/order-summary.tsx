import CartCount from "@/features/cart/components/cart-count";
import CartTotal from "@/features/cart/components/cart-total";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DeliveryFee from "./delivery-fee";

const OrderSummary = ({
  className,
  children,
  content,
}: React.PropsWithChildren & {
  className?: string;
  content?: React.ReactNode;
}) => {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 md:py-4">
        <CardTitle className="md:text-lg">Төлбөрийн мэдээлэл</CardTitle>
        <div className="font-semibold">
          (Бүтээгдэхүүн: <CartCount />)
        </div>
      </CardHeader>
      <CardContent className="space-y-2 py-0 md:py-0">
        {!!content && (
          <div>
            <Separator />
            <div className="space-y-1 py-3">{content}</div>
            <Separator />
          </div>
        )}
        <DeliveryFee />
      </CardContent>
      <CardFooter className="flex-col gap-4 md:pb-6 md:pt-3">
        <Separator />
        <div className="flex w-full justify-between text-lg font-bold md:text-xl">
          <p>Нийт төлөх дүн</p>
          <CartTotal />
        </div>
        <Separator />
        {children}
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
