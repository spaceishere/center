import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDetail } from "@/features/order/components/order-detail-context";
import branches from "@/gql/branch/queries";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { TBranch } from "@/types";

const OrderAddress = () => {
  const { deliveryInfo, branchId } = useDetail();
  const { phone, city, district, street, detail, email } = deliveryInfo || {};

  const { data, loading } = useQuery(branches, {
    variables: {
      withoutUserFilter: true,
    },
    skip: !branchId,
  });

  const branch = useMemo(() => {
    return data?.branches?.find((item: any) => item._id === branchId) as
      | TBranch
      | undefined;
  }, [data, branchId]);

  return (
    <Card>
      <CardHeader className="md:py-4">
        <CardTitle className="text-lg font-semibold">
          Хүргэлтийн мэдээлэл
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-wrap items-start gap-4 py-4 text-sm md:flex-nowrap md:justify-between">
        <div>
          <div className="text-foreground/60">
            {branchId ? "Очиж авах" : "Хүргэлтийн мэдээлэл"}
          </div>
          {!branchId && (
            <div className="font-medium">
              {city}, {district} дүүрэг, {street}, {detail}
            </div>
          )}

          {branchId && !loading && data && (
            <>
              <div className="font-medium">{branch?.title}</div>
              <p className="text-muted-foreground">{branch?.address}</p>
            </>
          )}
        </div>

        <div>
          <div className="text-foreground/60">Утас</div>
          <div className="font-medium">{phone}</div>
        </div>
        <div>
          <div className="text-foreground/60">Цахим хаяг</div>
          <div className="font-medium">{email}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderAddress;
