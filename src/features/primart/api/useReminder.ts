import { gql, useQuery } from "@apollo/client";

export const useReminder = (productId: string) => {
  const { refetch, loading, data } = useQuery(query, {
    variables: { ids: [productId] },
  });

  return {
    loading,
    reminder: data?.poscProducts?.[0]?.remainder || 0,
    refetch,
  };
};

const query = gql`
  query poscProducts($ids: [String]) {
    poscProducts(ids: $ids) {
      remainder
    }
  }
`;
