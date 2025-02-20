import { useAtomValue } from "jotai";
import { deliveryItemIdAtom } from "@/features/auth/store/auth";
import { filterDeliveryProduct } from "@/features/order/store/order";
import { useDetail } from "@/features/order/components/order-detail-context";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OrderProduct from "./order-product";

const OrderProducts = () => {
  const { items } = useDetail();

  const deliveryProductId = useAtomValue(deliveryItemIdAtom);

  return (
    <Card>
      <CardHeader className="md:py-4">
        <CardTitle className="text-lg font-semibold">Бүтээгдэхүүнүүд</CardTitle>
      </CardHeader>
      <Separator />
      {filterDeliveryProduct(items, deliveryProductId).map((item) => (
        <OrderProduct {...item} key={item._id} />
      ))}
    </Card>
  );
};

export default OrderProducts;
