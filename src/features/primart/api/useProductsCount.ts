import { gql, useQuery } from "@apollo/client";

export const useLazyProductsCount = (catId: string | undefined, q?: string) => {
  const { data, loading, refetch } = useQuery(query, {
    variables: {
      categoryId: catId,
      searchValue: q ? q : "",
      tag: "wfHldLjIhb7f7Hgw0of8q",
    },
    skip: !catId,
  });

  return {
    count: data?.poscProductsTotalCount as number,
    loading,
    refetch,
  };
};

const query = gql`
  query productsCount(
    $categoryId: String
    $type: String
    $searchValue: String
    $groupedSimilarity: String
    $isKiosk: Boolean
    $tag: String
  ) {
    poscProductsTotalCount(
      categoryId: $categoryId
      type: $type
      searchValue: $searchValue
      groupedSimilarity: $groupedSimilarity
      isKiosk: $isKiosk
      tag: $tag
    )
  }
`;

export const useCatProductsCount = (catId?: string, q?: string) => {
  const { data, loading } = useQuery(catCountQuery, {
    variables: { categoryId: catId, tag: "wfHldLjIhb7f7Hgw0of8q", q: q ?? "" },
    skip: !catId,
  });

  return {
    count: data?.poscProductsTotalCount as number,
    loading,
  };
};

const catCountQuery = gql`
  query productsCount(
    $categoryId: String
    $type: String
    $searchValue: String
    $groupedSimilarity: String
    $isKiosk: Boolean
    $tag: String
  ) {
    poscProductsTotalCount(
      categoryId: $categoryId
      type: $type
      searchValue: $searchValue
      groupedSimilarity: $groupedSimilarity
      isKiosk: $isKiosk
      tag: $tag
    )
  }
`;
