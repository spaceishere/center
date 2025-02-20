import { redirect } from "next/navigation";

import { getOrders } from "@/features/profile/api/getOrders";

import { OrderHistory } from "@/features/profile/components/order-history";
import { getMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getMetadata("Примарт түүх");
}

const PrimartHistoryPage = async ({
  searchParams,
}: {
  searchParams: { status?: string };
}) => {
  const status = searchParams.status;

  const { user, orders } = await getOrders(status);

  if (!user) {
    redirect("/");
  }

  return (
    <div className="w-full space-y-4 rounded-[16px] border p-4">
      <OrderHistory orders={orders} />
    </div>
  );
};

export default PrimartHistoryPage;
