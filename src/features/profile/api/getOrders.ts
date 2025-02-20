"use server";

import { getClient } from "@/gql/apollo-client";
import { getCurrentUser } from "@/lib/actions";
import { TCustomer } from "@/types";
import { TOrder } from "@/features/order/types";
import { ORDER_STATUSES } from "@/features/order/constant";
import { queries } from "@/gql/order";

export const getOrders = async (
  status?: string,
): Promise<{
  user: TCustomer | null;
  orders: (Omit<TOrder, "items"> & {
    items: { productName: string; productImgUrl: string }[];
  })[];
}> => {
  const user = await getCurrentUser();

  const { data: orderData } = await getClient().query({
    query: queries.fullOrders,
    variables: {
      customerId: user?.erxesCustomerId,
      statuses: status ? [status] : ORDER_STATUSES.ALL,
      saleStatus: "cart",
      sortField: "createdAt",
      sortDirection: -1,
      perPage: 1000,
      page: 1,
    },
  });

  return {
    user,
    orders: orderData.fullOrders,
  };
};
