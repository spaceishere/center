"use server";

import { getClient } from "@/gql/apollo-client";
import { gql } from "@apollo/client";

export const getProductsCount = async (variables: any): Promise<number> => {
  const { data } = await getClient().query({
    query,
    variables,
  });

  return (data?.poscProductsTotalCount as number) || 0;
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
