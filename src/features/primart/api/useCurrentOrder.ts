import { useCurrentUser } from "@/hooks/use-current-user";
import { gql, useQuery } from "@apollo/client";

export const useCurrentOrder = () => {
  const { currentUser } = useCurrentUser();

  const { data, refetch, loading } = useQuery(query, {
    variables: {
      customerId: currentUser?.erxesCustomerId,
      statuses: [
        "new",
        "doing",
        "done",
        "complete",
        "reDoing",
        "pending",
        "return",
      ],
      saleStatus: "cart",
      perPage: 1,
      sortField: "createdAt",
      sortDirection: -1,
    },
    skip: !currentUser?.erxesCustomerId,
  });

  return {
    orderItems:
      data?.fullOrders?.[0]?.items.map((item: any) => ({
        id: item?.productId,
        count: item?.count,
      })) || [],
    refetch,
    loading,
  };
};

const query = gql`
  query CurrentOrder(
    $customerId: String
    $saleStatus: String
    $perPage: Int
    $sortField: String
    $sortDirection: Int
    $statuses: [String]
  ) {
    fullOrders(
      customerId: $customerId
      saleStatus: $saleStatus
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
      statuses: $statuses
    ) {
      items {
        productId
        count
      }
    }
  }
`;
