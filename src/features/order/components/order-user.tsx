import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDetail } from "@/features/order/components/order-detail-context";

const OrderUser = () => {
  const { deliveryInfo, billType, registerNumber } = useDetail();
  const { lastName, firstName, phone, email, companyName } = deliveryInfo || {};

  return (
    <Card>
      <CardHeader className="md:py-4">
        <CardTitle className="text-lg font-semibold">
          Захиалагчийн мэдээлэл
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-wrap items-center justify-between gap-4 py-4 text-sm md:flex-nowrap md:gap-0 md:py-6">
        <div>
          <div className="text-black/60">Овог</div>
          <div className="font-medium">{lastName || "-"}</div>
        </div>
        <div>
          <div className="text-black/60">Нэр</div>
          <div className="font-medium">{firstName}</div>
        </div>
        <div>
          <div className="text-black/60">Утас</div>
          <div className="font-medium">{phone}</div>
        </div>
        <div>
          <div className="text-black/60">Цахим хаяг</div>
          <div className="font-medium">{email}</div>
        </div>
        <div>
          <div className="text-black/60">
            {billType === "3" ? "Байгуулга" : "Хувь хүн"}
          </div>
          <div className="font-medium">
            {billType === "3" ? `${companyName} (${registerNumber})` : "-"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderUser;
