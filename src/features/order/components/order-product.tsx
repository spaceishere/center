import { OrderItem } from "@/features/order/types";

import { Price } from "@/components/price";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/image";

const OrderProduct = ({
  productImgUrl,
  productName,
  status,
  count,
  unitPrice,
}: OrderItem) => {
  const name = productName?.split("-")[1];
  const code = productName?.split("-")[0];

  return (
    <div className="flex gap-2 overflow-hidden border-b p-2 last-of-type:border-b-0 md:gap-0">
      <Image
        src={productImgUrl}
        alt=""
        height={200}
        width={200}
        className="h-20 w-20 flex-none overflow-hidden rounded md:h-32 md:w-32"
      />

      <div className="flex flex-1 flex-wrap justify-between gap-2 p-2 text-sm md:gap-0 md:p-6 md:text-base">
        <div>
          <div className="text-sm text-neutral-500">#{code}</div>
          <h3 className="mb-1 font-medium capitalize">{name || productName}</h3>
          <Badge>{status}</Badge>
        </div>
        <div>
          <div className="flex gap-4 pt-5">
            <Price amount={unitPrice + ""} />
            <Badge variant="secondary">x{count}</Badge>
            <Price amount={unitPrice * count + ""} className="font-semibold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
